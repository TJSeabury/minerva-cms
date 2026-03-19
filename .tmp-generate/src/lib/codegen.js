import fs from "node:fs";
import path from "node:path";
function stableStringify(value) {
    return JSON.stringify(value, null, 2);
}
export function generateFiles(options) {
    const { extractedPages } = options;
    const schemasDir = path.join(options.outDir, "schemas");
    const typesDir = path.join(options.outDir, "types");
    const generatedLibDir = path.join(options.outDir, "lib/generated");
    fs.mkdirSync(schemasDir, { recursive: true });
    fs.mkdirSync(typesDir, { recursive: true });
    fs.mkdirSync(generatedLibDir, { recursive: true });
    // -------------------------
    // Zod schema + defaults
    // -------------------------
    const schemaEntries = extractedPages
        .map((page) => {
        const fieldEntries = page.fields
            .map((f) => {
            return `    ${stableStringify(f.fieldName)}: getPrimitive(${stableStringify(f.primitiveType)}).validation as z.ZodTypeAny`;
        })
            .join(",\n");
        return `  ${stableStringify(page.pageId)}: z.object({\n${fieldEntries}\n  })`;
    })
        .join(",\n");
    const schemasTs = `import { z } from "zod";
import { getPrimitive } from "../lib/primitives";

export const pageSchemas = {
${schemaEntries}
} as const;

export type PageId = keyof typeof pageSchemas;

export type PageContentBySlug = {
  [K in PageId]: z.infer<(typeof pageSchemas)[K]>
};

export function getPageSchema<TPage extends PageId>(pageId: TPage) {
  return pageSchemas[pageId];
}

export function getPageDefaults<TPage extends PageId>(pageId: TPage) {
  // parse({}) ensures Zod defaults are applied.
  return pageSchemas[pageId].parse({} as unknown);
}
`;
    fs.writeFileSync(path.join(schemasDir, "generated.ts"), schemasTs, "utf8");
    // -------------------------
    // Field map for admin
    // -------------------------
    const pageFieldsEntries = extractedPages
        .map((page) => {
        const fields = page.fields.map((f) => ({
            fieldName: f.fieldName,
            primitiveType: f.primitiveType,
            config: f.config,
        }));
        return `  ${stableStringify(page.pageId)}: ${stableStringify(fields)}`;
    })
        .join(",\n");
    const pageFieldsTs = `import type { PrimitiveName } from "../primitives";

export const pageFields = {
${pageFieldsEntries}
} as const satisfies Record<string, readonly {
  fieldName: string;
  primitiveType: PrimitiveName;
  config: Record<string, unknown>;
}[]>;

export type PageId = keyof typeof pageFields;
`;
    fs.writeFileSync(path.join(generatedLibDir, "pageFields.ts"), pageFieldsTs, "utf8");
    // -------------------------
    // Types re-export
    // -------------------------
    const typesDts = `export type PageId = import("../schemas/generated").PageId;
export type PageContentBySlug = import("../schemas/generated").PageContentBySlug;

export type PageContent<TPage extends PageId> = PageContentBySlug[TPage];
`;
    fs.writeFileSync(path.join(typesDir, "generated.d.ts"), typesDts, "utf8");
}
