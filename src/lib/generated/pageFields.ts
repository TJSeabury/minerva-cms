import type { PrimitiveName } from "../primitives";

export const pageFields = {
  "home": [
  {
    "fieldName": "heroHeadline",
    "primitiveType": "Text",
    "config": {
      "as": "h1",
      "className": "text-4xl font-bold tracking-tight md:text-5xl"
    }
  },
  {
    "fieldName": "heroBody",
    "primitiveType": "RichText",
    "config": {
      "className": "max-w-prose text-slate-700"
    }
  },
  {
    "fieldName": "heroCta",
    "primitiveType": "CtaButton",
    "config": {
      "className": "min-w-[160px]"
    }
  },
  {
    "fieldName": "heroImage",
    "primitiveType": "Image",
    "config": {
      "className": "max-h-[360px] w-full object-cover"
    }
  },
  {
    "fieldName": "featuresTitle",
    "primitiveType": "Text",
    "config": {
      "as": "h2",
      "className": "text-3xl font-semibold tracking-tight"
    }
  },
  {
    "fieldName": "statsLabel",
    "primitiveType": "Text",
    "config": {
      "as": "h3",
      "className": "text-lg font-medium text-slate-900"
    }
  },
  {
    "fieldName": "statsValue",
    "primitiveType": "Number",
    "config": {
      "className": "text-5xl font-bold tracking-tight text-slate-900"
    }
  },
  {
    "fieldName": "closingHeadline",
    "primitiveType": "Text",
    "config": {
      "as": "h3",
      "className": "text-2xl font-semibold tracking-tight text-slate-900"
    }
  },
  {
    "fieldName": "closingBody",
    "primitiveType": "RichText",
    "config": {
      "className": "text-slate-700"
    }
  }
],
  "index": [
  {
    "fieldName": "headline",
    "primitiveType": "Text",
    "config": {
      "as": "h1",
      "className": "text-4xl font-bold tracking-tight"
    }
  },
  {
    "fieldName": "subhead",
    "primitiveType": "Text",
    "config": {
      "as": "p",
      "className": "text-slate-700 max-w-prose"
    }
  }
]
} as const satisfies Record<string, readonly {
  fieldName: string;
  primitiveType: PrimitiveName;
  config: Record<string, unknown>;
}[]>;

export type PageId = keyof typeof pageFields;
