import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";
const ImageView = ({ value, className, }) => {
    const url = value?.url ?? "";
    const alt = value?.alt ?? "";
    const hasImage = Boolean(url);
    if (!hasImage) {
        return (_jsx("div", { className: `flex min-h-[120px] items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white text-slate-500 ${className ?? ""}`.trim(), children: "No image" }));
    }
    return (_jsx("img", { className: `h-auto max-w-full rounded-md ${className ?? ""}`.trim(), src: url, alt: alt || "Image", loading: "lazy" }));
};
const ImageEditor = ({ value, onChange }) => {
    const next = value ?? { url: "", alt: "" };
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("input", { className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", value: next.url, placeholder: "Image URL", onChange: (e) => onChange({ ...next, url: e.target.value }) }), _jsx("input", { className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", value: next.alt, placeholder: "Alt text", onChange: (e) => onChange({ ...next, alt: e.target.value }) })] }));
};
const ImageSchema = z.object({
    url: z.string(),
    alt: z.string().optional().default(""),
});
export const ImagePrimitive = createPrimitive({
    type: "Image",
    validation: defaultZod(ImageSchema, { url: "", alt: "" }),
    view: ImageView,
    editor: ImageEditor,
});
export function Image(props) {
    return _jsx(ImagePrimitive.view, { ...props });
}
