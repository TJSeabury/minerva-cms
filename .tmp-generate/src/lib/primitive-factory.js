export function createPrimitive(def) {
    return def;
}
// Small helper: Zod defaults often need the literal value type inferred.
export function defaultZod(schema, defaultValue) {
    // Zod's `default()` overloads can be too strict for generic `T` (especially around
    // optional/undefined types). For our template-driven MVP primitives, this is safe.
    return schema.default(defaultValue);
}
