import React from "react";
import { z } from "zod";
import type {
  PrimitiveDefinition,
  PrimitiveEditorProps,
  PrimitiveViewProps,
} from "../../lib/primitive-factory.js";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";

export type ImageValue = {
  url: string;
  alt: string;
};

export type ImageFieldConfig = {
  className?: string;
};

const ImageView: React.FC<PrimitiveViewProps<ImageValue, ImageFieldConfig>> = ({
  value,
  className,
}) => {
  const url = value?.url ?? "";
  const alt = value?.alt ?? "";
  const hasImage = Boolean(url);

  if (!hasImage) {
    return (
      <div
        className={`flex min-h-[120px] items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white text-slate-500 ${
          className ?? ""
        }`.trim()}
      >
        No image
      </div>
    );
  }

  return (
    <img
      className={`h-auto max-w-full rounded-md ${className ?? ""}`.trim()}
      src={url}
      alt={alt || "Image"}
      loading="lazy"
    />
  );
};

const ImageEditor: React.FC<
  PrimitiveEditorProps<ImageValue, ImageFieldConfig>
> = ({ value, onChange }) => {
  const next = value ?? { url: "", alt: "" };

  return (
    <div className="space-y-3">
      <input
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        value={next.url}
        placeholder="Image URL"
        onChange={(e) => onChange({ ...next, url: e.target.value })}
      />
      <input
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        value={next.alt}
        placeholder="Alt text"
        onChange={(e) => onChange({ ...next, alt: e.target.value })}
      />
    </div>
  );
};

const ImageSchema = z.object({
  url: z.string(),
  alt: z.string().optional().default(""),
});

export const ImagePrimitive: PrimitiveDefinition<ImageValue, ImageFieldConfig> =
  createPrimitive({
    type: "Image",
    validation: defaultZod(ImageSchema, { url: "", alt: "" }),
    view: ImageView,
    editor: ImageEditor,
  });

export function Image(props: PrimitiveViewProps<ImageValue, ImageFieldConfig>) {
  return <ImagePrimitive.view {...props} />;
}
