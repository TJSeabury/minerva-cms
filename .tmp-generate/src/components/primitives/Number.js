import { jsx as _jsx } from "react/jsx-runtime";
import { z } from "zod";
import { createPrimitive, defaultZod } from "../../lib/primitive-factory.js";
const NumberView = ({ value, className }) => {
    const showPlaceholder = value === undefined || value === null || globalThis.Number.isNaN(value);
    const content = value;
    return (_jsx("div", { className: className, children: showPlaceholder ? _jsx("span", { className: "text-slate-400", children: "\u2014" }) : content }));
};
const NumberEditor = ({ value, onChange }) => {
    return (_jsx("input", { className: "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20", type: "number", value: value ?? "", onChange: (e) => {
            const raw = e.target.value;
            if (raw === "")
                return onChange(null);
            const n = globalThis.Number(raw);
            onChange(globalThis.Number.isFinite(n) ? n : null);
        } }));
};
const NumberSchema = z.number().finite().nullable().default(null);
export const NumberPrimitive = createPrimitive({
    type: "Number",
    validation: defaultZod(NumberSchema, null),
    view: NumberView,
    editor: NumberEditor,
});
export function Number(props) {
    return _jsx(NumberPrimitive.view, { ...props });
}
