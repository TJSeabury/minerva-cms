import React, { useEffect, useMemo, useRef, useState } from "react";
import { getPrimitive } from "../../lib/primitives";

type PageField = {
  fieldName: string;
  primitiveType: string;
  config: Record<string, unknown>;
};

export default function PageEditor(props: {
  pageId: string;
  fields: readonly PageField[];
  initialData: Record<string, unknown>;
}) {
  const { pageId, fields, initialData } = props;

  const [values, setValues] = useState<Record<string, unknown>>(initialData);
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<{
    kind: "idle" | "saving" | "saved" | "error";
    message?: string;
  }>({
    kind: "idle",
  });

  useEffect(() => {
    setValues(initialData);
  }, [initialData]);

  const primitiveEditors = useMemo(() => {
    return fields.map((f) => {
      const prim = getPrimitive(f.primitiveType as any);
      return { field: f, editor: prim.editor };
    });
  }, [fields]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit: {pageId}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Admin UI is generated from the template’s primitive field
          declarations.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="space-y-5">
          {primitiveEditors.map(({ field, editor: Editor }) => {
            const fieldValue = (values as any)[field.fieldName];
            const onChange = (next: any) => {
              setValues((prev) => ({ ...prev, [field.fieldName]: next }));
              setStatus({ kind: "idle" });
            };

            return (
              <div key={field.fieldName}>
                <div className="mb-2 text-sm font-medium text-slate-700">
                  {field.fieldName}
                </div>
                <Editor
                  name={field.fieldName}
                  value={fieldValue}
                  onChange={onChange}
                  {...(field.config as any)}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            placeholder="Admin password"
            className="w-full max-w-[260px] rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          />

          <button
            className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-60"
            disabled={status.kind === "saving"}
            onClick={async () => {
              try {
                const providedPassword = (
                  passwordRef.current?.value ?? password
                ).trim();
                if (!providedPassword) {
                  setStatus({
                    kind: "error",
                    message: "Enter the admin password.",
                  });
                  return;
                }

                setStatus({ kind: "saving" });
                const res = await fetch(`/api/admin/${pageId}`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    // MVP auth placeholder (default is "password").
                    "x-admin-password": providedPassword,
                  },
                  body: JSON.stringify(values),
                });
                if (!res.ok) {
                  const data = await res.json().catch(() => null);
                  if (res.status === 401) {
                    setStatus({
                      kind: "error",
                      message: data?.error ?? "Unauthorized (wrong password).",
                    });
                    return;
                  }
                  setStatus({
                    kind: "error",
                    message: data?.errors?.length
                      ? `Validation failed (${data.errors.length} issues)`
                      : data?.error ?? "Failed to save",
                  });
                  return;
                }
                const saved = (await res.json().catch(() => null)) as Record<
                  string,
                  unknown
                > | null;
                if (saved) setValues(saved);
                setStatus({ kind: "saved", message: "Saved." });
              } catch (e: any) {
                setStatus({
                  kind: "error",
                  message: e?.message ?? "Failed to save",
                });
              }
            }}
          >
            {status.kind === "saving" ? "Saving..." : "Save"}
          </button>

          {status.kind === "saved" && (
            <div className="text-sm text-emerald-700">{status.message}</div>
          )}
          {status.kind === "error" && (
            <div className="text-sm text-rose-700">{status.message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
