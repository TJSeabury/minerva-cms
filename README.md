# uidd-experiment

Astro + React starter that uses a **template-first** approach for content editing.

## Key idea

Templates declare content fields directly via primitive components like:

```tsx
<Text name="headline" as="h1" value={content.headline} />
```

At build/dev time, a generator scans `src/pages/**/*.astro` (and `.tsx` where applicable) for usages of registered primitives and codegens:

- `src/schemas/generated.ts` (Zod schemas)
- `src/lib/generated/pageFields.ts` (field list for the admin UI)

## Dev / Build

```bash
pnpm install
pnpm run generate
pnpm run dev
pnpm run build
```

## Admin

Edit pages at:

- `/admin` (page list)
- `/admin/[slug]` (auto-generated form)

Persistence is currently file-based JSON under `src/content/pages/[slug].json`.

## Auth (MVP placeholder)

Saves require an `x-admin-password` header. The UI prompts for the password.

Default password is `password` (override with `ADMIN_PASSWORD` env var).

## Adding new primitives

1. Implement a new primitive in `src/components/primitives/*.tsx`.
2. Export it from `src/components/primitives/index.ts`.
3. Register it in `src/lib/primitives.ts` with a unique `type` string.
4. Use it in `src/pages/*.astro` with a `name="..."` attribute.
5. Run `pnpm run generate`.
