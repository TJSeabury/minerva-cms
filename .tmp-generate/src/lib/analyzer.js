import fs from "node:fs";
import path from "node:path";
import { Project, SyntaxKind } from "ts-morph";
import { primitiveRegistry } from "./primitives.js";
import { parse as parseAstro } from "@astrojs/compiler";
function parseStringLiteral(valueText) {
    // Handles: "foo", 'foo', { "foo" }, {'foo'}
    const trimmed = valueText.trim();
    const m1 = trimmed.match(/^"(.*)"$/);
    if (m1)
        return m1[1];
    const m2 = trimmed.match(/^'(.*)'$/);
    if (m2)
        return m2[1];
    const m3 = trimmed.match(/^\{\s*"(.*)"\s*\}$/);
    if (m3)
        return m3[1];
    const m4 = trimmed.match(/^\{\s*'(.*)'\s*\}$/);
    if (m4)
        return m4[1];
    return undefined;
}
function derivePageId(filePath, pagesRoot) {
    const rel = path.relative(pagesRoot, filePath).replaceAll(path.sep, "/");
    if (rel.startsWith(".."))
        return null;
    if (rel.startsWith("admin/"))
        return null;
    if (!rel.endsWith(".astro") && !rel.endsWith(".tsx"))
        return null;
    const withoutExt = rel.replace(/\.(astro|tsx)$/, "");
    if (withoutExt.endsWith("/index")) {
        return withoutExt.slice(0, -"/index".length) || "index";
    }
    if (withoutExt === "index")
        return "index";
    return withoutExt;
}
function listFilesRecursive(rootDir, exts) {
    const results = [];
    const walk = (dir) => {
        for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
            const p = path.join(dir, ent.name);
            if (ent.isDirectory())
                walk(p);
            else if (exts.includes(path.extname(ent.name)))
                results.push(p);
        }
    };
    if (!fs.existsSync(rootDir))
        return results;
    walk(rootDir);
    return results;
}
export async function analyzeTemplates(options) {
    const primitiveNames = Object.keys(primitiveRegistry);
    const primitiveSet = new Set(primitiveNames);
    const astroPaths = listFilesRecursive(options.pagesDir, [".astro"]).filter((p) => !p.includes("/admin/"));
    const tsxPaths = listFilesRecursive(options.pagesDir, [".tsx"]).filter((p) => !p.includes("/admin/"));
    // 1) Use ts-morph for TSX/React template usage.
    const project = new Project({
        tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
        useInMemoryFileSystem: false,
    });
    if (tsxPaths.length)
        project.addSourceFilesAtPaths(tsxPaths);
    const extractedByPage = new Map();
    for (const sourceFile of project.getSourceFiles()) {
        const filePath = sourceFile.getFilePath();
        const pageId = derivePageId(filePath, options.pagesDir);
        if (!pageId)
            continue;
        const fields = [];
        const nodes = sourceFile.getDescendants().filter((n) => {
            const k = n.getKind();
            return k === SyntaxKind.JsxSelfClosingElement || k === SyntaxKind.JsxElement;
        });
        for (const node of nodes) {
            const el = node.asKind(SyntaxKind.JsxSelfClosingElement) ?? node;
            const opening = el.getOpeningElement?.();
            const tagNameNode = opening?.getTagNameNode?.();
            const tagName = tagNameNode?.getText?.();
            if (!tagName || !primitiveNames.includes(tagName))
                continue;
            const primitiveType = tagName;
            const attrs = opening.getAttributes?.() ?? [];
            let fieldName;
            const config = {};
            const skipKeys = new Set(["name", "value"]);
            for (const a of attrs) {
                const attrName = a.getName?.();
                if (!attrName)
                    continue;
                if (skipKeys.has(attrName))
                    continue;
                const initializer = a.getInitializer?.();
                if (attrName === "name") {
                    if (!initializer)
                        continue;
                    if (initializer.getKind?.() === SyntaxKind.StringLiteral) {
                        fieldName = initializer.getLiteralText?.();
                    }
                    else if (initializer.getKind?.() === SyntaxKind.JsxExpression) {
                        const expr = initializer.getExpression?.();
                        if (expr && expr.getKind?.() === SyntaxKind.StringLiteral) {
                            fieldName = expr.getLiteralText?.();
                        }
                    }
                    continue;
                }
                if (initializer) {
                    if (initializer.getKind?.() === SyntaxKind.StringLiteral) {
                        config[attrName] = initializer.getLiteralText?.();
                    }
                    // Ignore non-string config values for MVP.
                }
            }
            if (!fieldName)
                continue;
            fields.push({ fieldName, primitiveType, config });
        }
        if (fields.length)
            extractedByPage.set(pageId, (extractedByPage.get(pageId) ?? []).concat(fields));
    }
    // 2) Parse Astro files (real AST) to find <Primitive .../> usage.
    for (const astroPath of astroPaths) {
        const pageId = derivePageId(astroPath, options.pagesDir);
        if (!pageId)
            continue;
        const content = fs.readFileSync(astroPath, "utf8");
        const fields = [];
        const seen = new Map();
        const skipKeys = new Set(["name", "value"]);
        function parseAttrAsString(attr) {
            // AttributeNode shape from @astrojs/compiler:
            // { type: 'attribute', kind: 'quoted' | 'expression' | ..., name: string, value: string }
            if (!attr || typeof attr !== "object")
                return undefined;
            if (attr.kind === "quoted")
                return attr.value;
            if (attr.kind === "expression")
                return parseStringLiteral(attr.value);
            return undefined;
        }
        const tryExtractFromComponent = (node) => {
            const componentName = node?.name;
            if (!componentName || !primitiveSet.has(componentName))
                return;
            const primitiveType = componentName;
            const attrs = node.attributes ?? [];
            let fieldName;
            const config = {};
            for (const attr of attrs) {
                if (attr?.name === "name") {
                    fieldName = parseAttrAsString(attr);
                    continue;
                }
                if (skipKeys.has(attr?.name))
                    continue;
                const parsed = parseAttrAsString(attr);
                if (parsed !== undefined)
                    config[attr.name] = parsed;
            }
            if (!fieldName)
                return;
            const prev = seen.get(fieldName);
            if (prev && prev !== primitiveType) {
                throw new Error(`Field "${fieldName}" used with multiple primitives: ${prev} and ${primitiveType}`);
            }
            seen.set(fieldName, primitiveType);
            fields.push({ fieldName, primitiveType, config });
        };
        const walk = (node) => {
            if (!node || typeof node !== "object")
                return;
            if (node.type === "component") {
                tryExtractFromComponent(node);
            }
            const children = node.children;
            if (Array.isArray(children)) {
                for (const child of children)
                    walk(child);
            }
        };
        const astroParsed = await parseAstro(content);
        walk(astroParsed.ast);
        if (fields.length) {
            extractedByPage.set(pageId, (extractedByPage.get(pageId) ?? []).concat(fields));
        }
    }
    const pages = [];
    for (const [pageId, fields] of extractedByPage.entries()) {
        pages.push({ pageId, fields });
    }
    // Deterministic ordering
    pages.sort((a, b) => a.pageId.localeCompare(b.pageId));
    return pages;
}
