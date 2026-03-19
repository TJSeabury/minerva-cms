import React from "react";
import { z } from "zod";
import type {
  PrimitiveDefinition,
  PrimitiveEditorProps,
  PrimitiveViewProps,
} from "../../lib/primitive-factory.js";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";

export type RichTextValue = string;

export type RichTextFieldConfig = {
  placeholder?: string;
  className?: string;
};

const RichTextView: React.FC<
  PrimitiveViewProps<RichTextValue, RichTextFieldConfig>
> = ({ value, placeholder, className }) => {
  const content = value ?? "";
  const showPlaceholder = !content && placeholder;

  return (
    <div
      className={`whitespace-pre-wrap ${className ?? ""}`.trim()}
      aria-label="Rich text"
    >
      {showPlaceholder ? (
        <span className="text-slate-400">{placeholder}</span>
      ) : (
        content
      )}
    </div>
  );
};

const RichTextEditor: React.FC<
  PrimitiveEditorProps<RichTextValue, RichTextFieldConfig>
> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const RichTextPrimitive: PrimitiveDefinition<
  RichTextValue,
  RichTextFieldConfig
> = createPrimitive({
  type: "RichText",
  validation: defaultZod(z.string(), ""),
  view: RichTextView,
  editor: RichTextEditor,
});

export function RichText(
  props: PrimitiveViewProps<RichTextValue, RichTextFieldConfig>
) {
  return <RichTextPrimitive.view {...props} />;
}
