import React from "react";
import { z } from "zod";
import type {
  PrimitiveDefinition,
  PrimitiveEditorProps,
  PrimitiveViewProps,
} from "../../lib/primitive-factory.js";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";

export type NumberFieldConfig = {
  className?: string;
};

export type NumberValue = number | null;

const NumberView: React.FC<
  PrimitiveViewProps<NumberValue, NumberFieldConfig>
> = ({ value, className }) => {
  const showPlaceholder =
    value === undefined || value === null || globalThis.Number.isNaN(value);
  const content = value;

  return (
    <div className={className}>
      {showPlaceholder ? <span className="text-slate-400">—</span> : content}
    </div>
  );
};

const NumberEditor: React.FC<
  PrimitiveEditorProps<NumberValue, NumberFieldConfig>
> = ({ value, onChange }) => {
  return (
    <input
      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
      type="number"
      value={value ?? ""}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === "") return onChange(null);
        const n = globalThis.Number(raw);
        onChange(globalThis.Number.isFinite(n) ? n : null);
      }}
    />
  );
};

const NumberSchema = z.number().finite().nullable().default(null);

export const NumberPrimitive: PrimitiveDefinition<
  NumberValue,
  NumberFieldConfig
> = createPrimitive({
  type: "Number",
  validation: defaultZod(NumberSchema, null),
  view: NumberView,
  editor: NumberEditor,
});

export function Number(
  props: PrimitiveViewProps<NumberValue, NumberFieldConfig>
) {
  return <NumberPrimitive.view {...props} />;
}
