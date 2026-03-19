import fs from "node:fs";
import path from "node:path";
import { analyzeTemplates } from "../src/lib/analyzer.js";
import { generateFiles } from "../src/lib/codegen.js";
const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");
async function main() {
    const pagesDir = path.join(srcDir, "pages");
    if (!fs.existsSync(pagesDir)) {
        throw new Error(`Missing pages directory: ${pagesDir}`);
    }
    const extractedPages = await analyzeTemplates({ pagesDir });
    // Avoid silent success.
    if (!extractedPages.length) {
        console.warn("generate: no primitive usage found. Make sure templates use <Text name=\"...\" /> etc.");
    }
    generateFiles({
        extractedPages,
        outDir: srcDir,
    });
    console.log(`generate: wrote ${extractedPages.length} page schema(s) to src/schemas/generated.ts`);
}
main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
