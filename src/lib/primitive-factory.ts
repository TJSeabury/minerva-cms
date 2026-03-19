import type { ZodType } from "zod";
import React from "react";

export type PrimitiveViewProps<TValue, TFieldConfig> = {
  /**
   * Field name as declared in the template. Analyzer/codegen will use this.
   */
  name: string;
  /**
   * Value to render (provided by the page content layer).
   */
  value?: TValue;
} & TFieldConfig;

export type PrimitiveEditorProps<TValue, TFieldConfig> = {
  name: string;
  value?: TValue;
  onChange: (next: TValue) => void;
  errors?: string[];
} & TFieldConfig;

export type PrimitiveDefinition<TValue, TFieldConfig extends Record<string, unknown> = {}> = {
  /**
   * Primitive type identifier used by the analyzer/codegen.
   */
  type: string;
  validation: ZodType<TValue>;
  /**
   * How the primitive should appear on the public site.
   */
  view: React.ComponentType<PrimitiveViewProps<TValue, TFieldConfig>>;
  /**
   * How the primitive should appear in the admin editor.
   */
  editor: React.ComponentType<PrimitiveEditorProps<TValue, TFieldConfig>>;
};

export function createPrimitive<TValue, TFieldConfig extends Record<string, unknown> = {}>(
  def: PrimitiveDefinition<TValue, TFieldConfig>
): PrimitiveDefinition<TValue, TFieldConfig> {
  return def;
}

// Small helper: Zod defaults often need the literal value type inferred.
export function defaultZod<T>(schema: ZodType<T>, defaultValue: T) {
  // Zod's `default()` overloads can be too strict for generic `T` (especially around
  // optional/undefined types). For our template-driven MVP primitives, this is safe.
  return (schema as any).default(defaultValue);
}

