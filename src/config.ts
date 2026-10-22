import identity from "./data/site-identity.json";
import { pathsFor } from "./lib/paths.mjs";

export const SITE_TITLE = identity.site_title;
export const SITE_URL = identity.site_url.replace(/\/$/, "");
export const SITE_DESCRIPTION = identity.site_description;

const id = identity as typeof identity & {
  ui_strings?: Record<string, string>;
  persona?: { name?: string; role?: string; avatar?: string; bio?: string };
  home?: Record<string, unknown>;
  facts?: { claim: string; valeur: string; autorite: string; url: string; date: string }[];
  aboutBody?: string;
  legalBody?: string;
  privacyBody?: string;
};

const uiDefaults: Record<string, string> = {
  readMore: "Otevřít podrobný rozbor",
  publishedBy: "Zpracovala",
  alsoRead: "Související praktické postupy",
  aboutAuthor: "O redakci",
  latestArticles: "Poslední zpracovaná témata",
  mostReadArticles: "Nejčastěji řešené otázky",
  recentArticles: "Nedávno aktualizované přehledy",
  home: "Přehled témat",
  about: "Metodika a zdroje redakce",
  contact: "Napsat do redakce",
  categories: "Rubriky",
  legalNotice: "Právní doložka a odpovědnost",
  privacyPolicy: "Zásady nakládání s údaji",
  discover: "Zobrazit všechny přehledy",
  newContentComing: "Další rozbory a kalkulace připravujeme.",
  breadcrumbAria: "Navigační stopa",
  masthead: identity.site_title,
  skipToContent: "Přejít k obsahu",
};

function buildUi(raw: Record<string, string> | undefined): Record<string, string> {
  const ui: Record<string, string> = {};
  for (const key of Object.keys(uiDefaults)) {
    ui[key] = raw?.[key] || uiDefaults[key];
  }
  return ui;
}

const idPaths = (identity as typeof identity & { paths?: { about?: string; legal?: string; privacy?: string } }).paths;

export const SITE_PATHS = pathsFor(identity.locale, idPaths);

export const SITE_CONFIG = {
  locale: identity.locale,
  contact_email: identity.contact_email,
  legal: identity.legal,
  ui: buildUi(id.ui_strings),
  author: {
    name: identity.author?.name || id.persona?.name || identity.site_title,
    role: identity.author?.role || id.persona?.role || "Redakce",
    avatar: identity.author?.avatar || id.persona?.avatar || "",
    bio: identity.author?.bio || id.persona?.bio || "",
  },
  hero: identity.hero,
  tools: identity.tools,
  home: id.home ?? {},
  facts: id.facts ?? [],
  aboutBody: id.aboutBody ?? "",
  legalBody: id.legalBody ?? "",
  privacyBody: id.privacyBody ?? "",
};

export const CATEGORIES: {
  label: string;
  slug: string;
  description: string;
  hero_title?: string;
  seo_intro?: string;
}[] = identity.categories || [];

export function categoryLabel(slugOrLabel: string): string {
  const hit = CATEGORIES.find((c) => c.slug === slugOrLabel || c.label === slugOrLabel);
  return hit?.label || slugOrLabel;
}
