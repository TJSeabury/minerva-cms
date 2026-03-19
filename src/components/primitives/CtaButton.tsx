import React from "react";
import { z } from "zod";
import type {
  PrimitiveDefinition,
  PrimitiveEditorProps,
  PrimitiveViewProps,
} from "../../lib/primitive-factory.js";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";

export type CtaVariant = "primary" | "secondary";

export type CtaButtonValue = {
  label: string;
  url: string;
  variant: CtaVariant;
};

export type CtaButtonFieldConfig = {
  className?: string;
};

function variantToClasses(variant: CtaVariant) {
  switch (variant) {
    case "secondary":
      return "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
    case "primary":
    default:
      return "border border-slate-900 bg-slate-900 text-white hover:bg-slate-800";
  }
}

const CtaButtonView: React.FC<
  PrimitiveViewProps<CtaButtonValue, CtaButtonFieldConfig>
> = ({ value, className }) => {
  const label = value?.label ?? "";
  const url = value?.url ?? "";
  const variant = value?.variant ?? "primary";
  const hasCta = Boolean(label) && Boolean(url);

  if (!hasCta) {
    return (
      <div
        className={`rounded-md border-2 border-dashed border-slate-200 bg-white px-3 py-4 text-slate-500 ${
          className ?? ""
        }`.trim()}
      >
        No CTA
      </div>
    );
  }

  return (
    <a
      href={url}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium ${variantToClasses(
        variant
      )} ${className ?? ""}`.trim()}
    >
      {label}
    </a>
  );
};

const CtaButtonEditor: React.FC<
  PrimitiveEditorProps<CtaButtonValue, CtaButtonFieldConfig>
> = ({ value, onChange }) => {
  const next = value ?? { label: "", url: "", variant: "primary" as const };

  return (
    <div className="space-y-3">
      <input
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        value={next.label}
        placeholder="Button label"
        onChange={(e) => onChange({ ...next, label: e.target.value })}
      />
      <input
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        value={next.url}
        placeholder="Button URL"
        onChange={(e) => onChange({ ...next, url: e.target.value })}
      />
      <select
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        value={next.variant}
        onChange={(e) =>
          onChange({ ...next, variant: e.target.value as CtaVariant })
        }
      >
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
      </select>
    </div>
  );
};

const CtaSchema = z.object({
  label: z.string(),
  url: z.string(),
  variant: z.enum(["primary", "secondary"]),
});

export const CtaButtonPrimitive: PrimitiveDefinition<
  CtaButtonValue,
  CtaButtonFieldConfig
> = createPrimitive({
  type: "CtaButton",
  validation: defaultZod(CtaSchema, {
    label: "",
    url: "",
    variant: "primary",
  }),
  view: CtaButtonView,
  editor: CtaButtonEditor,
});

export function CtaButton(
  props: PrimitiveViewProps<CtaButtonValue, CtaButtonFieldConfig>
) {
  return <CtaButtonPrimitive.view {...props} />;
}
