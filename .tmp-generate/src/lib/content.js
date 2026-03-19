import fs from "node:fs";
import path from "node:path";
import { pageSchemas } from "../schemas/generated";
const contentDir = path.join(process.cwd(), "src", "content", "pages");
function getSlugPath(slug) {
    return path.join(contentDir, `${slug}.json`);
}
export async function listPageSlugs() {
    if (!fs.existsSync(contentDir))
        return [];
    const entries = await fs.promises.readdir(contentDir, { withFileTypes: true });
    return entries
        .filter((e) => e.isFile() && e.name.endsWith(".json"))
        .map((e) => e.name.replace(/\.json$/, ""))
        .filter((slug) => slug in pageSchemas);
}
export async function getPageContent(slug) {
    const schema = pageSchemas[slug];
    const filePath = getSlugPath(slug);
    try {
        const raw = await fs.promises.readFile(filePath, "utf8");
        const parsed = JSON.parse(raw);
        return schema.parse(parsed);
    }
    catch (err) {
        // If content file doesn't exist (first run), use Zod defaults.
        if (err?.code === "ENOENT") {
            return schema.parse({});
        }
        throw err;
    }
}
export async function savePageContent(slug, data) {
    const schema = pageSchemas[slug];
    const validated = schema.parse(data);
    await fs.promises.mkdir(contentDir, { recursive: true });
    await fs.promises.writeFile(getSlugPath(slug), JSON.stringify(validated, null, 2), "utf8");
    return validated;
}
// Helper for later admin UI: validate without persisting.
export function validatePageContent(slug, data) {
    const schema = pageSchemas[slug];
    return schema.parse(data);
}
