# Page SEO Guide — Nasaq

A checklist and reference for adding SEO to any page on [nasaq.app](https://nasaq.app). This project is a bilingual (English / Arabic) Next.js 15 marketing site for Nasaq, a web development agency in Egypt.

**Stack:** Next.js App Router · `next-intl` · Cloudflare Workers (`@opennextjs/cloudflare`)

**Public routes:**

| Page         | URL pattern                   | Indexed        |
| ------------ | ----------------------------- | -------------- |
| Home         | `/{locale}`                   | Yes            |
| Get Started  | `/{locale}/get-started`       | Yes            |
| Confirmation | `/{locale}/confirmation/{id}` | No (`noindex`) |

---

## 1. Metadata (`generateMetadata`)

Every indexed `page.tsx` must export `generateMetadata`. Use `buildPageMetadata` from `@/shared/lib/seo/buildPageMetadata` so canonical URLs, hreflang, and OG tags stay consistent.

```ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/shared/lib/seo/buildPageMetadata";
import type { Locale } from "@/shared/lib/seo/urls";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.apply" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: "get-started", // path after /{locale}/
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((kw) => kw.trim()),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    ogAlt: t("ogAlt"),
    twitterTitle: t("twitterTitle"),
    twitterDescription: t("twitterDescription"),
  });
}
```

### Checklist

1. `title` is under 60 characters and includes **Nasaq** + page topic.
2. `description` is under 160 characters and ends in a complete sentence.
3. `keywords` are comma-separated and relevant to the page.
4. `pathAfterLocale` matches the URL segment after the locale (e.g. `get-started`, or `""` for home).
5. All metadata strings exist in both `messages/en.json` and `messages/ar.json` under `Meta.<pageKey>`.
6. Canonical and `og:url` are locale-aware (handled automatically by `buildPageMetadata`).

### Transactional pages (noindex)

Confirmation and other private pages must pass `robots`:

```ts
return buildPageMetadata({
  // ...
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
});
```

Also add the path to `src/app/robots.ts` `disallow` list.

---

## 2. JSON-LD Structured Data

Import schema factories and render `<JsonLd>` in the **server** `page.tsx` (not in client components).

```tsx
import {
  JsonLd,
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  breadcrumbSchema,
} from "@/shared/components/seo";
```

Render before the page component:

```tsx
<JsonLd
  data={[
    organizationSchema(),
    webSiteSchema(locale),
    webPageSchema({
      locale,
      name: "Get Started",
      pathAfterLocale: "get-started",
    }),
    breadcrumbSchema({
      locale,
      items: [
        { name: "Home" },
        { name: "Get Started", pathAfterLocale: "get-started" },
      ],
    }),
  ]}
/>
```

### Which schemas to include

| Schema                              | When       | File                                                       |
| ----------------------------------- | ---------- | ---------------------------------------------------------- |
| `organizationSchema()`              | Every page | `src/shared/components/seo/schemas/organization.ts`        |
| `webSiteSchema(locale)`             | Every page | `src/shared/components/seo/schemas/webSite.ts`             |
| `webPageSchema(...)`                | Every page | `src/shared/components/seo/schemas/webPage.ts`             |
| `breadcrumbSchema(...)`             | Every page | `src/shared/components/seo/schemas/webPage.ts`             |
| `professionalServiceSchema(locale)` | Home only  | `src/shared/components/seo/schemas/professionalService.ts` |

### Home page example

See `src/app/[locale]/page.tsx` — includes `professionalServiceSchema` for local business rich results.

### Breadcrumb rules

- First item is always `{ name: "Home" }` (resolves to `/{locale}`).
- Last item is the current page; include `pathAfterLocale` for non-home pages.
- Use translated labels from `getTranslations` for non-English breadcrumb names.

---

## 3. Semantic HTML

### Page-level landmarks

Handled in `src/app/[locale]/layout.tsx`:

| Element                    | Location     | Notes                        |
| -------------------------- | ------------ | ---------------------------- |
| `<html lang dir>`          | `layout.tsx` | `lang` and `dir` on `<html>` |
| Skip link                  | `layout.tsx` | Targets `#main-content`      |
| `<header>`                 | `layout.tsx` | Wraps `<Nav />`              |
| `<main id="main-content">` | `layout.tsx` | Single `<main>` per page     |
| `<footer>`                 | `Footer.tsx` | Site-wide footer             |
| `<nav aria-label>`         | `Nav.tsx`    | `Nav.ariaLabel` i18n key     |

### Section elements

Every visually distinct content block with its own heading must be a `<section>`, not a `<div>`.

**With a visible heading** — use `aria-labelledby`:

```tsx
<section aria-labelledby="services-heading" id="services">
  <h2 id="services-heading">{t("sectionTitle")}</h2>
  ...
</section>
```

**Without a single heading** — use `aria-label`:

```tsx
<section aria-label={t("sectionAriaLabel")}>...</section>
```

### Heading hierarchy

| Rule                        | Details                                       |
| --------------------------- | --------------------------------------------- |
| Exactly one `<h1>` per page | Hero title (home) or form title (get-started) |
| Section titles use `<h2>`   | Portfolio, Services, Process, About           |
| Sub-items use `<h3>`        | Cards, feature titles, FAQ items              |
| Never skip levels           | No `<h1>` → `<h3>` without an `<h2>`          |

---

## 4. Accessibility Attributes (also affect SEO)

### Decorative SVGs

Icons next to text, background shapes, and social icons inside labeled links:

```tsx
<svg aria-hidden width="20" height="20" ... />
```

### Images

Every `<Image>` must have a descriptive `alt` prop. Localize when the image conveys page-specific meaning:

```tsx
<Image alt="Nasaq for digital solutions" src="/logo-white.png" ... />
```

- Describe what the image shows, not file type.
- Keep under ~125 characters.
- Decorative images: `alt=""` with `aria-hidden`.

### Navigation

- `<nav>` must have `aria-label={t("ariaLabel")}`.
- Active section links should reflect current state where applicable.

### Social links in footer

- `aria-label` on the `<a>`.
- `aria-hidden` on the SVG inside.

---

## 5. Skip-to-Content Link

Wired in `src/app/[locale]/layout.tsx`. The `<main>` element has `id="main-content"`.

Translation key: `Layout.skipToMainContent` in both locale files.

---

## 6. HTML Document Attributes

Handled in `src/app/[locale]/layout.tsx`:

- `metadataBase` is set to `BASE_URL` from `src/shared/lib/constants.ts`.
- `lang` and `dir` are set on `<html>`.
- `appleWebApp.title` is set to `"Nasaq"`.

`BASE_URL` defaults to `https://nasaq.app` and is overridden per environment via env vars.

---

## 7. hreflang & x-default

Handled automatically by `buildPageMetadata`. It outputs:

- `hreflang="en-US"` → `/{en}/{path}`
- `hreflang="ar-EG"` → `/{ar}/{path}`
- `hreflang="x-default"` → `/{en}/{path}`

No per-page action needed beyond passing the correct `pathAfterLocale`.

---

## 8. i18n Message Keys (SEO-specific)

For each new page, add keys to both `messages/en.json` and `messages/ar.json`:

| Key pattern                      | Namespace      | Usage                           |
| -------------------------------- | -------------- | ------------------------------- |
| `Meta.<page>.title`              | `Meta`         | `<title>` and JSON-LD page name |
| `Meta.<page>.description`        | `Meta`         | Meta description                |
| `Meta.<page>.keywords`           | `Meta`         | Comma-separated keywords        |
| `Meta.<page>.ogTitle`            | `Meta`         | Open Graph title                |
| `Meta.<page>.ogDescription`      | `Meta`         | Open Graph description          |
| `Meta.<page>.ogAlt`              | `Meta`         | OG image alt text               |
| `Meta.<page>.twitterTitle`       | `Meta`         | Twitter card title              |
| `Meta.<page>.twitterDescription` | `Meta`         | Twitter card description        |
| `*ImageAlt`                      | Page namespace | `alt` on `<Image>`              |
| `*AriaLabel`                     | Page namespace | `aria-label` on meaningful SVGs |
| `sectionAriaLabel`               | Page namespace | `aria-label` on `<section>`     |
| `Nav.ariaLabel`                  | `Nav`          | `aria-label` on main navigation |

---

## 9. robots.txt & sitemap.xml

| File        | Path                          |
| ----------- | ----------------------------- |
| robots.txt  | `src/app/robots.ts`           |
| sitemap.xml | `src/app/sitemap.ts`          |

When adding a new **indexed** page:

1. Add `generateMetadata` with the correct `pathAfterLocale`.
2. Add the URL(s) to `src/app/sitemap.ts` for both `en` and `ar`.
3. Confirm the page is not in `robots.ts` `disallow`.

Confirmation pages are blocked via `disallow: ["/en/confirmation/", "/ar/confirmation/"]` and `noindex` metadata.

Middleware (`src/middleware.ts`) excludes static files and API routes from locale redirects; `robots.txt` and `sitemap.xml` are served at the root.

---

## 10. Performance Hints

### Hero / above-the-fold images

```tsx
<Image
    alt="..."
    fetchPriority="high"
    loading="eager"
    ...
/>
```

### Below-the-fold images

```tsx
<Image alt="..." loading="lazy" ... />
```

### OG images

Place shared OG images in `public/og/`. Current default: `/og/home.png` (1200×630).

---

## Quick Reference: Full Page Setup

When creating a new indexed page at `src/app/[locale]/<route>/page.tsx`:

1. **i18n keys** — Add `Meta.<pageKey>.*` to `messages/en.json` and `messages/ar.json`.
2. **`generateMetadata`** — Use `buildPageMetadata` with the correct `pathAfterLocale`.
3. **JSON-LD** — Render `<JsonLd>` with organization, website, webpage, and breadcrumb schemas.
4. **Semantic HTML** — Use `<section>` with `aria-labelledby` or `aria-label`.
5. **Heading hierarchy** — One `<h1>`, sections use `<h2>`, sub-items use `<h3>`.
6. **Images** — Localized or descriptive `alt` text; hero images use `fetchPriority="high"`.
7. **Sitemap** — Add `/{en}/route` and `/{ar}/route` to `sitemap.ts`.
8. **Private pages** — Add `robots: { index: false }` and a `disallow` rule.

### File map

| Concern           | Path                                      |
| ----------------- | ----------------------------------------- |
| Metadata builder  | `src/shared/lib/seo/buildPageMetadata.ts` |
| URL helpers       | `src/shared/lib/seo/urls.ts`              |
| JSON-LD component | `src/shared/components/seo/JsonLd.tsx`    |
| Schema factories  | `src/shared/components/seo/schemas/`      |
| Root layout       | `src/app/[locale]/layout.tsx`             |
| Site constants    | `src/shared/lib/constants.ts`             |
| EN copy           | `messages/en.json`                        |
| AR copy           | `messages/ar.json`                        |
