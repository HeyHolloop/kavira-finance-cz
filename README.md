# editorial-astro-template

Squelette technique Astro (vente de liens). **Pas une DA.**

Le chrome du clone est un placeholder. Un site réel **réécrit** header/footer/hero/CSS depuis le Stitch.

Page article : slots DOM figés (`data-slot`), ordre `fil → kicker → titre → meta → cover → corps → suite`. Peau (classes/CSS) à inventer. Après `astro build` : `npm run check:article`.

- Identité : `src/data/site-identity.json` (`locale`, `ui_strings`, auteur = marque « La rédaction »)
- Articles : `src/content/articles/` — collection `articles`. Frontmatter Nuclear : `title`, `metaTitle`, `excerpt`, `image` (obligatoire), `category`, `categorySlug`, `date`, `schemaJson`
- Rubriques : `/category/{slug}/`
- Home : hero, rubriques, plus lus (`featured`), outils, rédaction, derniers (max 15)
- Outline : 1 H1 ; titres de listes/cartes en `<p>`
- Auteur JSON-LD : Organization (jamais Person)
- Indexabilité : trailing slash, robots dynamique (identité + AI bots + Disallow légal/contact, **pas** de noindex légal), sitemap-index + lastmod, `.htaccess` HTTPS/www/slash + ErrorDocument 404
- Dates futures et drafts exclus des URLs
- Covers : `CoverImage.astro` (WebP si fichier jumeau)
- Deploy : FTPS + `astro check`
- Pas de Keystatic, pas Vercel, pas Paluel
