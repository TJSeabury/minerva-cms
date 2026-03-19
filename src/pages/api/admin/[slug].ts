import { ZodError } from "zod";
import type { APIRoute } from "astro";
import { getPageContent, savePageContent } from "../../../lib/content";
import { pageSchemas, type PageId } from "../../../schemas/generated";
import { isAdminPasswordValid } from "../../../lib/adminAuth";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug as PageId;
  if (!slug || !(slug in pageSchemas)) {
    return new Response(JSON.stringify({ error: "Unknown page" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  const content = await getPageContent(slug);
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  const providedPassword = request.headers.get("x-admin-password");
  if (!isAdminPasswordValid(providedPassword)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const slug = params.slug as PageId;
  if (!slug || !(slug in pageSchemas)) {
    return new Response(JSON.stringify({ error: "Unknown page" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  const schema = pageSchemas[slug];
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const saved = await savePageContent(slug, body as any);
    return new Response(JSON.stringify(saved), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify({ errors: err.issues }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Failed to save" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

