import { jsx as _jsx } from "react/jsx-runtime";
import { z } from "zod";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";
const TextView = ({ value, as = "p", placeholder, className, }) => {
    const Tag = as;
    const content = value ?? "";
    const showPlaceholder = !content && placeholder;
    return (_jsx(Tag, { className: className, children: showPlaceholder ? (_jsx("span", { className: "text-slate-400", children: placeholder })) : (content) }));
};
const TextEditor = ({ value, onChange, placeholder, className }) => {
    return (_jsx("input", { className: `w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${className ?? ""}`, value: value ?? "", placeholder: placeholder, onChange: (e) => onChange(e.target.value), type: "text" }));
};
export const TextPrimitive = createPrimitive({
    type: "Text",
    validation: defaultZod(z.string(), ""),
    view: TextView,
    editor: TextEditor,
});
export function Text(props) {
    return _jsx(TextPrimitive.view, { ...props });
}
