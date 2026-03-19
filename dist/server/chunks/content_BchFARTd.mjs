import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';

function createPrimitive(def) {
  return def;
}
function defaultZod(schema, defaultValue) {
  return schema.default(defaultValue);
}

const TextView = ({
  value,
  as = "p",
  placeholder,
  className
}) => {
  const Tag = as;
  const content = value ?? "";
  const showPlaceholder = !content && placeholder;
  return /* @__PURE__ */ jsx(Tag, { className, children: showPlaceholder ? /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: placeholder }) : content });
};
const TextEditor = ({ value, onChange, placeholder, className }) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: `w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${className ?? ""}`,
      value: value ?? "",
      placeholder,
      onChange: (e) => onChange(e.target.value),
      type: "text"
    }
  );
};
const TextPrimitive = createPrimitive({
  type: "Text",
  validation: defaultZod(z.string(), ""),
  view: TextView,
  editor: TextEditor
});
function Text(props) {
  return /* @__PURE__ */ jsx(TextPrimitive.view, { ...props });
}

const RichTextView = ({ value, placeholder, className }) => {
  const content = value ?? "";
  const showPlaceholder = !content && placeholder;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `whitespace-pre-wrap ${className ?? ""}`.trim(),
      "aria-label": "Rich text",
      children: showPlaceholder ? /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: placeholder }) : content
    }
  );
};
const RichTextEditor = ({ value, onChange, placeholder }) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: "min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
      value: value ?? "",
      placeholder,
      onChange: (e) => onChange(e.target.value)
    }
  );
};
const RichTextPrimitive = createPrimitive({
  type: "RichText",
  validation: defaultZod(z.string(), ""),
  view: RichTextView,
  editor: RichTextEditor
});
function RichText(props) {
  return /* @__PURE__ */ jsx(RichTextPrimitive.view, { ...props });
}

const ImageView = ({
  value,
  className
}) => {
  const url = value?.url ?? "";
  const alt = value?.alt ?? "";
  const hasImage = Boolean(url);
  if (!hasImage) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex min-h-[120px] items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white text-slate-500 ${className ?? ""}`.trim(),
        children: "No image"
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: `h-auto max-w-full rounded-md ${className ?? ""}`.trim(),
      src: url,
      alt: alt || "Image",
      loading: "lazy"
    }
  );
};
const ImageEditor = ({ value, onChange }) => {
  const next = value ?? { url: "", alt: "" };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
        value: next.url,
        placeholder: "Image URL",
        onChange: (e) => onChange({ ...next, url: e.target.value })
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
        value: next.alt,
        placeholder: "Alt text",
        onChange: (e) => onChange({ ...next, alt: e.target.value })
      }
    )
  ] });
};
const ImageSchema = z.object({
  url: z.string(),
  alt: z.string().optional().default("")
});
const ImagePrimitive = createPrimitive({
  type: "Image",
  validation: defaultZod(ImageSchema, { url: "", alt: "" }),
  view: ImageView,
  editor: ImageEditor
});
function Image(props) {
  return /* @__PURE__ */ jsx(ImagePrimitive.view, { ...props });
}

function variantToClasses(variant) {
  switch (variant) {
    case "secondary":
      return "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
    case "primary":
    default:
      return "border border-slate-900 bg-slate-900 text-white hover:bg-slate-800";
  }
}
const CtaButtonView = ({ value, className }) => {
  const label = value?.label ?? "";
  const url = value?.url ?? "";
  const variant = value?.variant ?? "primary";
  const hasCta = Boolean(label) && Boolean(url);
  if (!hasCta) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `rounded-md border-2 border-dashed border-slate-200 bg-white px-3 py-4 text-slate-500 ${className ?? ""}`.trim(),
        children: "No CTA"
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: url,
      className: `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium ${variantToClasses(
        variant
      )} ${className ?? ""}`.trim(),
      children: label
    }
  );
};
const CtaButtonEditor = ({ value, onChange }) => {
  const next = value ?? { label: "", url: "", variant: "primary" };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
        value: next.label,
        placeholder: "Button label",
        onChange: (e) => onChange({ ...next, label: e.target.value })
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
        value: next.url,
        placeholder: "Button URL",
        onChange: (e) => onChange({ ...next, url: e.target.value })
      }
    ),
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
        value: next.variant,
        onChange: (e) => onChange({ ...next, variant: e.target.value }),
        children: [
          /* @__PURE__ */ jsx("option", { value: "primary", children: "Primary" }),
          /* @__PURE__ */ jsx("option", { value: "secondary", children: "Secondary" })
        ]
      }
    )
  ] });
};
const CtaSchema = z.object({
  label: z.string(),
  url: z.string(),
  variant: z.enum(["primary", "secondary"])
});
const CtaButtonPrimitive = createPrimitive({
  type: "CtaButton",
  validation: defaultZod(CtaSchema, {
    label: "",
    url: "",
    variant: "primary"
  }),
  view: CtaButtonView,
  editor: CtaButtonEditor
});
function CtaButton(props) {
  return /* @__PURE__ */ jsx(CtaButtonPrimitive.view, { ...props });
}

const NumberView = ({ value, className }) => {
  const showPlaceholder = value === void 0 || value === null || globalThis.Number.isNaN(value);
  const content = value;
  return /* @__PURE__ */ jsx("div", { className, children: showPlaceholder ? /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "—" }) : content });
};
const NumberEditor = ({ value, onChange }) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
      type: "number",
      value: value ?? "",
      onChange: (e) => {
        const raw = e.target.value;
        if (raw === "") return onChange(null);
        const n = globalThis.Number(raw);
        onChange(globalThis.Number.isFinite(n) ? n : null);
      }
    }
  );
};
const NumberSchema = z.number().finite().nullable().default(null);
const NumberPrimitive = createPrimitive({
  type: "Number",
  validation: defaultZod(NumberSchema, null),
  view: NumberView,
  editor: NumberEditor
});
function Number(props) {
  return /* @__PURE__ */ jsx(NumberPrimitive.view, { ...props });
}

const primitiveRegistry = {
  Text: TextPrimitive,
  RichText: RichTextPrimitive,
  Image: ImagePrimitive,
  CtaButton: CtaButtonPrimitive,
  Number: NumberPrimitive
};
function getPrimitive(name) {
  return primitiveRegistry[name];
}

const pageSchemas = {
  "home": z.object({
    "heroHeadline": getPrimitive("Text").validation,
    "heroBody": getPrimitive("RichText").validation,
    "heroCta": getPrimitive("CtaButton").validation,
    "heroImage": getPrimitive("Image").validation,
    "featuresTitle": getPrimitive("Text").validation,
    "statsLabel": getPrimitive("Text").validation,
    "statsValue": getPrimitive("Number").validation,
    "closingHeadline": getPrimitive("Text").validation,
    "closingBody": getPrimitive("RichText").validation
  }),
  "index": z.object({
    "headline": getPrimitive("Text").validation,
    "subhead": getPrimitive("Text").validation
  })
};

const contentDir = path.join(process.cwd(), "src", "content", "pages");
function getSlugPath(slug) {
  return path.join(contentDir, `${slug}.json`);
}
async function getPageContent(slug) {
  const schema = pageSchemas[slug];
  const filePath = getSlugPath(slug);
  try {
    const raw = await fs.promises.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return schema.parse(parsed);
  } catch (err) {
    if (err?.code === "ENOENT") {
      return schema.parse({});
    }
    throw err;
  }
}
async function savePageContent(slug, data) {
  const schema = pageSchemas[slug];
  const validated = schema.parse(data);
  await fs.promises.mkdir(contentDir, { recursive: true });
  await fs.promises.writeFile(getSlugPath(slug), JSON.stringify(validated, null, 2), "utf8");
  return validated;
}

export { CtaButton as C, Image as I, Number as N, RichText as R, Text as T, getPageContent as g, pageSchemas as p, savePageContent as s };
