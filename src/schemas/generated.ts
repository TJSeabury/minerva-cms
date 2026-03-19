import { z } from "zod";
import { getPrimitive } from "../lib/primitives";

export const pageSchemas = {
  "home": z.object({
    "heroHeadline": getPrimitive("Text").validation as z.ZodTypeAny,
    "heroBody": getPrimitive("RichText").validation as z.ZodTypeAny,
    "heroCta": getPrimitive("CtaButton").validation as z.ZodTypeAny,
    "heroImage": getPrimitive("Image").validation as z.ZodTypeAny,
    "featuresTitle": getPrimitive("Text").validation as z.ZodTypeAny,
    "statsLabel": getPrimitive("Text").validation as z.ZodTypeAny,
    "statsValue": getPrimitive("Number").validation as z.ZodTypeAny,
    "closingHeadline": getPrimitive("Text").validation as z.ZodTypeAny,
    "closingBody": getPrimitive("RichText").validation as z.ZodTypeAny
  }),
  "index": z.object({
    "headline": getPrimitive("Text").validation as z.ZodTypeAny,
    "subhead": getPrimitive("Text").validation as z.ZodTypeAny
  })
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
