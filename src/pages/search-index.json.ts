import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { liveArticles } from "../lib/live";
import { categoryLabel } from "../config";

export const GET: APIRoute = async () => {
  const posts = liveArticles(await getCollection("articles"));
  const index = posts.map((p) => ({
    t: p.data.title,
    u: `/${p.slug}/`,
    e: p.data.excerpt,
    r: categoryLabel(p.data.categorySlug || p.data.category),
    d: p.data.date.toISOString().slice(0, 10),
  }));
  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
