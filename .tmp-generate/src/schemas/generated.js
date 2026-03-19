import { z } from "zod";
import { getPrimitive } from "../lib/primitives";
export const pageSchemas = {
    "index": z.object({
        "headline": getPrimitive("Text").validation,
        "subhead": getPrimitive("Text").validation
    })
};
export function getPageSchema(pageId) {
    return pageSchemas[pageId];
}
export function getPageDefaults(pageId) {
    // parse({}) ensures Zod defaults are applied.
    return pageSchemas[pageId].parse({});
}
