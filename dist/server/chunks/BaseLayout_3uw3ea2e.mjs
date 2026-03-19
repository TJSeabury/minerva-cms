import { c as createComponent } from './astro-component_BqdibWb-.mjs';
import { p as renderHead, q as renderSlot, r as renderTemplate } from './server_BFqXFhtk.mjs';

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "UIDD Experiment" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body> <header class="border-b border-slate-200"> <div class="mx-auto max-w-5xl px-4 py-4"> <a href="/" class="font-semibold text-slate-900">UIDD</a> </div> </header> <main class="mx-auto max-w-5xl px-4 py-10"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/tyler/projects/uidd-experiment/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
