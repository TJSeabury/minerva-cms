import { jsx as _jsx } from "react/jsx-runtime";
import { z } from "zod";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";
const RichTextView = ({ value, placeholder, className }) => {
    const content = value ?? "";
    const showPlaceholder = !content && placeholder;
    return (_jsx("div", { className: `whitespace-pre-wrap ${className ?? ""}`.trim(), "aria-label": "Rich text", children: showPlaceholder ? (_jsx("span", { className: "text-slate-400", children: placeholder })) : (content) }));
};
const RichTextEditor = ({ value, onChange, placeholder }) => {
    return (_jsx("textarea", { className: "min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", value: value ?? "", placeholder: placeholder, onChange: (e) => onChange(e.target.value) }));
};
export const RichTextPrimitive = createPrimitive({
    type: "RichText",
    validation: defaultZod(z.string(), ""),
    view: RichTextView,
    editor: RichTextEditor,
});
export function RichText(props) {
    return _jsx(RichTextPrimitive.view, { ...props });
}
