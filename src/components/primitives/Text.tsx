import React from "react";
import { z } from "zod";
import type {
  PrimitiveDefinition,
  PrimitiveEditorProps,
  PrimitiveViewProps,
} from "../../lib/primitive-factory.js";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";

export type TextValue = string;

export type TextFieldConfig = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  placeholder?: string;
  className?: string;
};

const TextView: React.FC<PrimitiveViewProps<TextValue, TextFieldConfig>> = ({
  value,
  as = "p",
  placeholder,
  className,
}) => {
  const Tag = as;
  const content = value ?? "";
  const showPlaceholder = !content && placeholder;

  return (
    <Tag className={className}>
      {showPlaceholder ? (
        <span className="text-slate-400">{placeholder}</span>
      ) : (
        content
      )}
    </Tag>
  );
};

const TextEditor: React.FC<
  PrimitiveEditorProps<TextValue, TextFieldConfig>
> = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${
        className ?? ""
      }`}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      type="text"
    />
  );
};

export const TextPrimitive: PrimitiveDefinition<TextValue, TextFieldConfig> =
  createPrimitive({
    type: "Text",
    validation: defaultZod(z.string(), ""),
    view: TextView,
    editor: TextEditor,
  });

export function Text(props: PrimitiveViewProps<TextValue, TextFieldConfig>) {
  return <TextPrimitive.view {...props} />;
}
