import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";
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
        return (_jsx("div", { className: `rounded-md border-2 border-dashed border-slate-200 bg-white px-3 py-4 text-slate-500 ${className ?? ""}`.trim(), children: "No CTA" }));
    }
    return (_jsx("a", { href: url, className: `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium ${variantToClasses(variant)} ${className ?? ""}`.trim(), children: label }));
};
const CtaButtonEditor = ({ value, onChange }) => {
    const next = value ?? { label: "", url: "", variant: "primary" };
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("input", { className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", value: next.label, placeholder: "Button label", onChange: (e) => onChange({ ...next, label: e.target.value }) }), _jsx("input", { className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", value: next.url, placeholder: "Button URL", onChange: (e) => onChange({ ...next, url: e.target.value }) }), _jsxs("select", { className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", value: next.variant, onChange: (e) => onChange({ ...next, variant: e.target.value }), children: [_jsx("option", { value: "primary", children: "Primary" }), _jsx("option", { value: "secondary", children: "Secondary" })] })] }));
};
const CtaSchema = z.object({
    label: z.string(),
    url: z.string(),
    variant: z.enum(["primary", "secondary"]),
});
export const CtaButtonPrimitive = createPrimitive({
    type: "CtaButton",
    validation: defaultZod(CtaSchema, {
        label: "",
        url: "",
        variant: "primary",
    }),
    view: CtaButtonView,
    editor: CtaButtonEditor,
});
export function CtaButton(props) {
    return _jsx(CtaButtonPrimitive.view, { ...props });
}
