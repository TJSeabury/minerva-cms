import { c as createComponent } from './astro-component_BqdibWb-.mjs';
import { o as renderComponent, r as renderTemplate } from './server_BFqXFhtk.mjs';
import { $ as $$BaseLayout } from './BaseLayout_3uw3ea2e.mjs';
import { g as getPageContent } from './content_BchFARTd.mjs';

const pageFields = {
  "home": [
    {
      "fieldName": "heroHeadline",
      "primitiveType": "Text",
      "config": {
        "as": "h1",
        "className": "text-4xl font-bold tracking-tight md:text-5xl"
      }
    },
    {
      "fieldName": "heroBody",
      "primitiveType": "RichText",
      "config": {
        "className": "max-w-prose text-slate-700"
      }
    },
    {
      "fieldName": "heroCta",
      "primitiveType": "CtaButton",
      "config": {
        "className": "min-w-[160px]"
      }
    },
    {
      "fieldName": "heroImage",
      "primitiveType": "Image",
      "config": {
        "className": "max-h-[360px] w-full object-cover"
      }
    },
    {
      "fieldName": "featuresTitle",
      "primitiveType": "Text",
      "config": {
        "as": "h2",
        "className": "text-3xl font-semibold tracking-tight"
      }
    },
    {
      "fieldName": "statsLabel",
      "primitiveType": "Text",
      "config": {
        "as": "h3",
        "className": "text-lg font-medium text-slate-900"
      }
    },
    {
      "fieldName": "statsValue",
      "primitiveType": "Number",
      "config": {
        "className": "text-5xl font-bold tracking-tight text-slate-900"
      }
    },
    {
      "fieldName": "closingHeadline",
      "primitiveType": "Text",
      "config": {
        "as": "h3",
        "className": "text-2xl font-semibold tracking-tight text-slate-900"
      }
    },
    {
      "fieldName": "closingBody",
      "primitiveType": "RichText",
      "config": {
        "className": "text-slate-700"
      }
    }
  ],
  "index": [
    {
      "fieldName": "headline",
      "primitiveType": "Text",
      "config": {
        "as": "h1",
        "className": "text-4xl font-bold tracking-tight"
      }
    },
    {
      "fieldName": "subhead",
      "primitiveType": "Text",
      "config": {
        "as": "p",
        "className": "text-slate-700 max-w-prose"
      }
    }
  ]
};

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const slug = Astro2.params.slug;
  const fields = pageFields[slug];
  if (!slug || !fields) {
    return Astro2.redirect("/admin");
  }
  const initialData = await getPageContent(slug);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Admin: ${slug}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageEditor", null, { "client:only": true, "pageId": slug, "fields": fields, "initialData": initialData, "client:component-hydration": "only", "client:component-path": "/home/tyler/projects/uidd-experiment/src/components/admin/PageEditor", "client:component-export": "default" })} ` })}`;
}, "/home/tyler/projects/uidd-experiment/src/pages/admin/[slug].astro", void 0);

const $$file = "/home/tyler/projects/uidd-experiment/src/pages/admin/[slug].astro";
const $$url = "/admin/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
