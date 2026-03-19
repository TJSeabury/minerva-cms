import { c as createComponent } from './astro-component_BqdibWb-.mjs';
import { o as renderComponent, r as renderTemplate, m as maybeRenderHead } from './server_BFqXFhtk.mjs';
import { $ as $$BaseLayout } from './BaseLayout_3uw3ea2e.mjs';
import { ArrowRight } from 'lucide-react';
import { g as getPageContent, T as Text } from './content_BchFARTd.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getPageContent("index");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "UIDD Experiment" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="space-y-4"> ${renderComponent($$result2, "Text", Text, { "name": "headline", "as": "h1", "value": content.headline, "className": "text-4xl font-bold tracking-tight" })} ${renderComponent($$result2, "Text", Text, { "name": "subhead", "as": "p", "value": content.subhead, "className": "text-slate-700 max-w-prose" })} <div class="pt-2"> <a href="/admin" class="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
Open Admin
${renderComponent($$result2, "ArrowRight", ArrowRight, { "class": "h-4 w-4" })} </a> </div> </section> ` })}`;
}, "/home/tyler/projects/uidd-experiment/src/pages/index.astro", void 0);

const $$file = "/home/tyler/projects/uidd-experiment/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
