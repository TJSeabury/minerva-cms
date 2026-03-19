import { ZodError } from 'zod';
import { p as pageSchemas, g as getPageContent, s as savePageContent } from './content_BchFARTd.mjs';

const DEFAULT_PASSWORD = "password";
function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
}
function isAdminPasswordValid(provided) {
  if (!provided) return false;
  return provided === getAdminPassword();
}

const prerender = false;
const GET = async ({ params }) => {
  const slug = params.slug;
  if (!slug || !(slug in pageSchemas)) {
    return new Response(JSON.stringify({ error: "Unknown page" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  const content = await getPageContent(slug);
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};
const POST = async ({ params, request }) => {
  const providedPassword = request.headers.get("x-admin-password");
  if (!isAdminPasswordValid(providedPassword)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const slug = params.slug;
  if (!slug || !(slug in pageSchemas)) {
    return new Response(JSON.stringify({ error: "Unknown page" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const saved = await savePageContent(slug, body);
    return new Response(JSON.stringify(saved), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify({ errors: err.issues }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Failed to save" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
