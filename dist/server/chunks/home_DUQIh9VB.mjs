import { c as createComponent } from './astro-component_BqdibWb-.mjs';
import { o as renderComponent, r as renderTemplate, m as maybeRenderHead } from './server_BFqXFhtk.mjs';
import { $ as $$BaseLayout } from './BaseLayout_3uw3ea2e.mjs';
import { g as getPageContent, T as Text, R as RichText, C as CtaButton, I as Image, N as Number } from './content_BchFARTd.mjs';

const prerender = false;
const $$Home = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Home;
  const content = await getPageContent("home");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-16"> <section class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white"> <div class="grid gap-10 px-6 py-10 md:grid-cols-2 md:px-10"> <div class="space-y-6"> <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"> <span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
Built from template-declared primitives
</div> ${renderComponent($$result2, "Text", Text, { "name": "heroHeadline", "as": "h1", "value": content.heroHeadline, "className": "text-4xl font-bold tracking-tight md:text-5xl" })} ${renderComponent($$result2, "RichText", RichText, { "name": "heroBody", "value": content.heroBody, "className": "max-w-prose text-slate-700" })} <div class="flex flex-wrap items-center gap-3"> ${renderComponent($$result2, "CtaButton", CtaButton, { "name": "heroCta", "value": content.heroCta, "className": "min-w-[160px]" })} <a href="#features" class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50">
See features
</a> </div> </div> <div class="flex items-center justify-center"> ${renderComponent($$result2, "Image", Image, { "name": "heroImage", "value": content.heroImage, "className": "max-h-[360px] w-full object-cover" })} </div> </div> </section> <section id="features" class="space-y-6"> <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"> ${renderComponent($$result2, "Text", Text, { "name": "featuresTitle", "as": "h2", "value": content.featuresTitle, "className": "text-3xl font-semibold tracking-tight" })} <p class="max-w-prose text-slate-600">
Designers can author pixel-perfect Astro + React templates while
          non-technical stakeholders edit content safely through the generated
          admin UI.
</p> </div> <div class="grid gap-4 md:grid-cols-3"> <div class="rounded-xl border border-slate-200 bg-white p-5"> <div class="text-sm font-semibold text-slate-900">
Schema from the template
</div> <p class="mt-2 text-sm text-slate-600">
Change a primitive field in a template and regenerate.
</p> </div> <div class="rounded-xl border border-slate-200 bg-white p-5"> <div class="text-sm font-semibold text-slate-900">
Editor without drift
</div> <p class="mt-2 text-sm text-slate-600">
Admin UI is derived 1:1 from the template’s field declarations.
</p> </div> <div class="rounded-xl border border-slate-200 bg-white p-5"> <div class="text-sm font-semibold text-slate-900">
Validated storage
</div> <p class="mt-2 text-sm text-slate-600">
Saves to file-based JSON with Zod validation.
</p> </div> </div> </section> <section class="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-10"> <div class="grid gap-8 md:grid-cols-2 md:items-center"> <div class="space-y-4"> ${renderComponent($$result2, "Text", Text, { "name": "statsLabel", "as": "h3", "value": content.statsLabel, "className": "text-lg font-medium text-slate-900" })} <div class="flex items-baseline gap-3"> ${renderComponent($$result2, "Number", Number, { "name": "statsValue", "value": content.statsValue, "className": "text-5xl font-bold tracking-tight text-slate-900" })} <span class="text-slate-600">rows generated from templates</span> </div> </div> <div class="space-y-2"> ${renderComponent($$result2, "Text", Text, { "name": "closingHeadline", "as": "h3", "value": content.closingHeadline, "className": "text-2xl font-semibold tracking-tight text-slate-900" })} ${renderComponent($$result2, "RichText", RichText, { "name": "closingBody", "value": content.closingBody, "className": "text-slate-700" })} </div> </div> </section> </div> ` })}`;
}, "/home/tyler/projects/uidd-experiment/src/pages/home.astro", void 0);

const $$file = "/home/tyler/projects/uidd-experiment/src/pages/home.astro";
const $$url = "/home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Home,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
