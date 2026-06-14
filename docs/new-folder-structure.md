# Nasaq — Project Folder Structure Conventions

Conventions for organizing the Nasaq Next.js app (Next 15, next-intl, Firebase bookings). **This project uses Option B (role folders)** for all component colocation.

---

## Top-level layout

```
nasaq/
├── messages/         ← i18n JSON: en.json, ar.json
├── public/           ← static assets (og/, projects/, favicons)
└── src/
    ├── features/     ← all domain/page-specific code
    ├── shared/       ← code used by 2+ features
    ├── app/          ← Next.js routing only
    ├── i18n/         ← next-intl routing + request config
    └── middleware.ts
```

During migration, legacy paths (`src/components/`, `src/hooks/`, `src/lib/`) move into `features/` or `shared/` as described below.

---

## Naming conventions

**Component folders and component names use PascalCase.** Numeric prefixes use two digits (`00`–`99`).

```
✅ 00.HomePage/
✅ 01.Landing/
✅ 02.Portfolio/
✅ 02.Portfolio._PortfolioItem/
✅ 02.Portfolio._PortfolioItem.Overlay/
✅ 00.GetStartedPage.FormHeader/
✅ 00.GetStartedPage.FormProgressBar/
✅ 01.Confirmation/

❌ 1.Landing/
❌ 02.Portfolio.PortfolioItem/          ← use _PortfolioItem when shared by Portfolio subs
❌ 02._PortfolioItem/                   ← main-scoped shared needs parent name
❌ _PortfolioItem/                      ← use only for feature-wide shared (2+ top-level sections)
❌ portfolio/
❌ 02.portfolio._PortfolioItem/
```

**Inside every component folder (Option B — this project):** keep `ComponentName.tsx`, `ComponentName.module.css`, and `types.ts` at the folder root. Put I/O and logic under `lib/`, optional client state under `context/`, and optional `svg/` for component-owned icons.

This applies everywhere — `features/`, `shared/`, `app/`. No exceptions.

### Prefix drop on folder leaf segments

When a dotted folder chain lists ancestor segments plus the component name, **shorten only the last segment** in the **folder name** if any earlier segment in that chain is a **prefix** of the full React `ComponentName`.

* **Folder** — drop the redundant prefix from the leaf segment only.
* **React file and export** — always keep the full name (`FormProgressBar.tsx`, `export { FormProgressBar }`).
* **Check order** — walk ancestors from immediate parent back to the top-level section `{NN}`; use the **longest** matching prefix.

```
Full name: FormProgressBar
Folder:    00.GetStartedPage.FormProgressBar   ← GetStartedPage is not a prefix; no drop

Full name: PortfolioItem
Folder:    02.Portfolio._PortfolioItem         ← Portfolio is a prefix of PortfolioItem → could shorten to .Item/
             but _PortfolioItem is clearer; prefix drop is optional when underscore segment is clearer
```

Do **not** shorten component names in TSX, `index.ts` exports, or i18n keys — **folders only**.

---

## app/ — routing only

`app/` contains ONLY Next.js route files. No components, no lib, no helpers, no hooks.

Allowed files per route segment (routing surface only):

* `page.tsx` — re-exports `default` and `generateMetadata` from the feature (and `generateStaticParams` when needed)
* `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` — segment UI boundaries when required
* `route.ts` — API routes (`src/app/api/booking/post/route.ts`, `src/app/api/booking/get/route.ts`)
* `types.ts` — **route params only**: `*PageParams`, `*PageFC`, `*GenerateMetadata` wired to Next.js types
* `globals.css`, `sitemap.ts`, `robots.txt`, `manifest.json` — app-level assets that belong at the locale root

Not allowed under `app/` after migration: colocated `GetStarted.tsx`, `FormHeader.tsx`, `Confirmation.tsx`, `*.module.css`, fetchers, or Firebase calls — those belong in `features/`.

A `page.tsx` should do two things only: call `generateMetadata` (when needed) and render the page root component imported from `features/`.

**Today** — home page colocates canvas logic and section imports in `app/`:

```tsx
// src/app/[locale]/page.tsx (current — pre-migration)
"use client";

import styles from "./Home.module.css";
import Landing from "@/components/home/landing/Landing";
import PortfolioSection from "@/components/home/portfolio/Portfolio";
import ServicesSection from "@/components/home/services/Services";
import ProcessSection from "@/components/home/process/Process";
import AboutSection from "@/components/home/about/About";

export default function Home() {
  // particle canvas + section composition
}
```

**Target** — thin route file only:

```tsx
// src/app/[locale]/page.tsx (target)
import HomePage, { generateMetadata } from '@/features/home';

export { generateMetadata };
export default HomePage;
```

```tsx
// src/app/[locale]/get-started/page.tsx (target)
import GetStartedPage, { generateMetadata } from '@/features/get-started';

export { generateMetadata };
export default GetStartedPage;
```

```tsx
// src/app/[locale]/confirmation/[id]/page.tsx (target)
import ConfirmationPage from '@/features/confirmation';

export default ConfirmationPage;
```

`layout.tsx` stays in `app/[locale]/` and imports shared chrome:

```tsx
// src/app/[locale]/layout.tsx (target)
import { Nav, Footer } from '@/shared/components/layout';
// generateMetadata for default home meta can move to features/home or stay here temporarily
```

---

## features/ — one feature folder per route `page.tsx`

Each App Router `page.tsx` gets its **own** folder under `features/`. Do not put two route pages in the same feature.

| Route | Feature folder | Page orchestrator |
|-------|----------------|-------------------|
| `/` | `features/home/` | `00.HomePage/` |
| `/get-started` | `features/get-started/` | `00.GetStartedPage/` |
| `/confirmation/[id]` | `features/confirmation/` | `00.ConfirmationPage/` |

```
features/
├── home/              ← / only
├── get-started/       ← /get-started only
└── confirmation/      ← /confirmation/[id] only
```

A feature has **exactly one** page orchestrator folder: `00.{PageName}/` (the default export for that route's `page.tsx`).

### Feature layout rules

1. **Numeric order (two digits)** — top-level sections use `01`, `02`, … in **JSX render order**. Use `00` for the route page orchestrator (`00.HomePage/`, `00.GetStartedPage/`, `00.ConfirmationPage/`).
2. **One folder per component** — the React entry file is `ComponentName.tsx` inside that folder (e.g. `01.Landing/Landing.tsx`).
3. **Subcomponents stay on the feature root** — folder name carries the parent section's `{NN}` and ancestor chain; apply prefix drop on the leaf segment when a parent name is redundant.
4. **Option B everywhere** — `lib/`, `types.ts`, optional `context/` and `svg/`. Do not use prefixed flat files (`Landing.helpers.ts`).
5. **`index.ts` on every folder** — each component folder exports only **its own** component; it does not re-export siblings.
6. **Feature import hub** — `features/{feature}/index.ts` re-exports the **entire** feature. **All** imports inside that feature use `from '..'` (resolves to the feature `index.ts`). `app/` uses `@/features/{feature}`.
7. **Shared subcomponents (`_` segment)** — two scopes (see table below).

### Folder naming

| Kind | Folder pattern | Example |
|------|----------------|---------|
| Page | `00.{PageName}/` | `00.HomePage/` |
| Top-level section (rendered by page) | `{NN}.{ComponentName}/` | `01.Landing/`, `02.Portfolio/` |
| Private child | `{NN}.{Parent}.{Child}/` | `00.GetStartedPage.FormHeader/` |
| Grandchild (private) | `{NN}.{Parent}.{Child}.{Grandchild}/` | `02.Portfolio._PortfolioItem.Overlay/` |
| **Feature-wide shared** (2+ top-level sections) | `_{ComponentName}/` | `_SectionHeader/` — **no** `{NN}` |
| Child of feature-wide shared | `_{Shared}.{Child}/` | `_SectionHeader.Badge/` |
| **Main-scoped shared** (2+ subcomponents of same section) | `{NN}.{Main}._{Shared}/` | `02.Portfolio._PortfolioItem/` |
| Child of main-scoped shared | `{NN}.{Main}._{Shared}.{Child}/` | `02.Portfolio._PortfolioItem.Overlay/` |

`{NN}` is always the **top-level section's** index on the page. Subcomponents **do not** get their own sequence number.

**Which shared pattern to use**

| Shared by whom | Folder |
|----------------|--------|
| `03.Services` + `04.Process` (two top-level sections) | `_SectionHeader/` |
| `02.Portfolio.Grid` + `02.Portfolio.Featured` (two subs of Portfolio) | `02.Portfolio._PortfolioItem/` |
| Private child of `_PortfolioItem` | `02.Portfolio._PortfolioItem.Overlay/` |
| Single page section owns the component | `00.GetStartedPage.FormHeader/` — **not** `_FormHeader/` |

All of these stay as **sibling folders on the feature root** — never nest `00.GetStartedPage.FormHeader/` inside `00.GetStartedPage/`.

**When to use `_` (strict):** only when **two or more top-level page sections** (`01`–`05` on home, excluding `00.*` orchestrators) import the same component. Components used by one section only belong under that section's chain. Do **not** park single-consumer utilities on the feature root as `_`.

Explorer sort: `00` → `01` → … then chains group by prefix (`02.Portfolio`, `02.Portfolio._PortfolioItem`, …), then feature-wide `_SectionHeader` (no leading digits) typically after numbered chains.

### Public API — `index.ts` (feature + component)

**Never** import `ComponentName.tsx` directly. Every component folder has a small `index.ts` that exports **only itself**. The **feature** `index.ts` aggregates every folder in that feature.

#### Component folder `index.ts` (local export only)

```ts
// features/home/01.Landing/index.ts
export { Landing } from './Landing';
```

```ts
// features/get-started/00.GetStartedPage/index.ts
export { default } from './GetStartedPage';
export { generateMetadata } from './lib/helpers';
```

```ts
// features/get-started/00.GetStartedPage.FormHeader/index.ts
export { FormHeader } from './FormHeader';
```

Do **not** re-export other folders from a component `index.ts`.

#### Feature `index.ts` — single import hub

```ts
// features/home/index.ts
export { default, generateMetadata } from './00.HomePage';
export { Landing } from './01.Landing';
export { Portfolio } from './02.Portfolio';
export { PortfolioItem } from './02.Portfolio._PortfolioItem';
export { Services } from './03.Services';
export { Process } from './04.Process';
export { About } from './05.About';
```

```ts
// features/get-started/index.ts
export { default, generateMetadata } from './00.GetStartedPage';
export { FormHeader } from './00.GetStartedPage.FormHeader';
export { FormProgressBar } from './00.GetStartedPage.FormProgressBar';
```

```ts
// features/confirmation/index.ts
export { default } from './00.ConfirmationPage';
export { Confirmation } from './01.Confirmation';
```

### Imports — always `features/{feature}/index.ts`

Every component folder sits **one level** under `features/{feature}/`, so the feature barrel is always one step up:

```ts
import { FormHeader, FormProgressBar } from '..';
import { Portfolio, PortfolioItem } from '..';
```

**`app/` → feature:**

```ts
import HomePage, { generateMetadata } from '@/features/home';
```

**Page and sections → siblings via feature index:**

```ts
// 00.HomePage/HomePage.tsx
import { Landing, Portfolio, Services, Process, About } from '..';

// 02.Portfolio/Portfolio.tsx
import { PortfolioItem } from '..';

// 00.GetStartedPage/GetStartedPage.tsx
import { FormHeader, FormProgressBar } from '..';
```

**Outside the feature** — use the path alias (same barrel):

```ts
import { Portfolio } from '@/features/home';
```

Do **not** import from another component folder path (`../02.Portfolio`, `../00.GetStartedPage.FormHeader`) — only `from '..'` inside the feature, or `@/features/{feature}` from outside.

Path alias `@/features/{feature}` must resolve to `features/{feature}/index.ts` (add to `tsconfig.json` paths when migrating).

### Example: `features/home/` (folder tree)

Page order: Landing → Portfolio → Services → Process → About.

```
features/home/
├── index.ts
├── 00.HomePage/
│   ├── index.ts
│   ├── HomePage.tsx
│   ├── HomePage.module.css
│   ├── types.ts
│   └── lib/
│       ├── helpers.ts          ← particle canvas setup (client)
│       └── schemas.ts          ← optional JSON-LD
├── 01.Landing/
│   ├── index.ts
│   ├── Landing.tsx
│   ├── Landing.module.css
│   └── types.ts
├── 02.Portfolio/
│   ├── index.ts
│   ├── Portfolio.tsx
│   ├── Portfolio.module.css
│   └── types.ts
├── 02.Portfolio._PortfolioItem/       ← if Grid + Featured both need the same card
│   ├── index.ts
│   ├── PortfolioItem.tsx
│   ├── PortfolioItem.module.css
│   └── types.ts
├── 02.Portfolio._PortfolioItem.Overlay/
│   ├── index.ts
│   └── Overlay.tsx
├── 03.Services/
│   ├── index.ts
│   ├── Services.tsx
│   ├── Services.module.css
│   └── types.ts
├── 04.Process/
│   ├── index.ts
│   ├── Process.tsx
│   ├── Process.module.css
│   ├── types.ts
│   └── lib/
│       └── data.ts             ← step labels if not only from i18n
└── 05.About/
    ├── index.ts
    ├── About.tsx
    ├── About.module.css
    └── types.ts
```

### Example: `features/get-started/` (multi-step form)

Today: `GetStarted.tsx`, `FormHeader.tsx`, `FormProgressBar.tsx` live under `app/[locale]/get-started/`.

```
features/get-started/
├── index.ts
├── 00.GetStartedPage/
│   ├── index.ts
│   ├── GetStartedPage.tsx
│   ├── GetStartedPage.module.css
│   ├── types.ts
│   └── lib/
│       ├── helpers.ts          ← generateMetadata
│       └── schemas.ts          ← form validation (zod) if colocated here
├── 00.GetStartedPage.FormHeader/
│   ├── index.ts
│   ├── FormHeader.tsx
│   └── FormHeader.module.css
└── 00.GetStartedPage.FormProgressBar/
    ├── index.ts
    ├── FormProgressBar.tsx
    └── FormProgressBar.module.css
```

Form submission stays a client `fetch` to `/api/booking/post` inside `GetStartedPage.tsx` (or `lib/submit.ts` if it grows).

Shared form hooks (`useSteps`, `useFormTranslations`) move to `shared/hooks/` because they are reusable across form UI.

### Example: `features/confirmation/` (dynamic route)

Today: `page.tsx` uses `useBooking`, `Loading`, and `Confirmation.tsx` colocated under `app/`.

```
features/confirmation/
├── index.ts
├── 00.ConfirmationPage/
│   ├── index.ts
│   ├── ConfirmationPage.tsx
│   └── types.ts
└── 01.Confirmation/
    ├── index.ts
    ├── Confirmation.tsx
    ├── Confirmation.module.css
    ├── types.ts
    └── lib/
        └── helpers.ts          ← urgency badge mapping, print helpers
```

```ts
// 00.ConfirmationPage/ConfirmationPage.tsx
"use client";

import { useParams } from 'next/navigation';
import { Loading } from '@/shared/components/Loading';
import { useBooking } from '@/shared/hooks/useBooking';
import { Confirmation } from '..';

export default function ConfirmationPage() {
  const { id } = useParams();
  const { error, loading, booking } = useBooking(id);

  if (loading) return <Loading size="large" />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!booking) return <p>No booking found.</p>;

  return <Confirmation booking={booking} />;
}
```

---

## Inside each component folder — Option B (role folders)

Keep **`ComponentName.tsx`**, **`index.ts`**, and **`ComponentName.module.css`** at the folder root. Put I/O and logic under **`lib/`**, shared props/view types in **`types.ts`**.

```
00.GetStartedPage/
├── index.ts
├── GetStartedPage.tsx
├── GetStartedPage.module.css
├── types.ts
└── lib/
    ├── helpers.ts              ← generateMetadata, pure helpers
    └── schemas.ts              ← zod schemas for FormData
```

```
02.Portfolio/
├── index.ts
├── Portfolio.tsx
├── Portfolio.module.css
├── types.ts
└── lib/
    └── data.ts                 ← static project list (marakeb, razan, clinic, afif)
```

```
01.Confirmation/
├── index.ts
├── Confirmation.tsx
├── Confirmation.module.css
├── types.ts
└── lib/
    └── helpers.ts
```

Optional **`context/`** when client state is non-trivial (not needed for current Nasaq pages):

```
03.Services/
├── index.ts
├── Services.tsx
├── Services.module.css
├── types.ts
├── context/
│   ├── provider.tsx
│   ├── useContext.ts
│   └── types.ts
└── svg/
    └── CheckIcon.svg
```

### Option B — `lib/` contents

| File | Purpose |
|------|---------|
| `lib/helpers.ts` | Pure helpers, metadata builders (no I/O) |
| `lib/fetch.ts` | Server/client data loading (I/O) |
| `lib/data.ts` | Static lists, enum labels |
| `lib/schemas.ts` | Zod schemas, JSON-LD builders |
| `lib/submit.ts` | Form POST to `/api/booking/post` |
| `types.ts` | Props, view models, page param aliases for `00.*` folders |
| `context/` | Optional split instead of `lib/context.ts` when a provider tree is large |
| `svg/` | Icons and decorations owned by this component only |

Import SVG as React components when needed: `import Icon from './svg/CheckIcon.svg?react'` (configure in `next.config.ts` if used).

---

## SVG conventions

### Per-component `svg/` folder

Each component folder may include **`svg/`**. Only SVGs **owned by that component** go there.

```
features/home/
├── 01.Landing/
│   ├── Landing.tsx
│   ├── Landing.module.css
│   └── svg/
│       └── WaveDecoration.svg
└── 03.Services/
    └── svg/
        └── ServiceIcon.svg
```

Rules:

* **No** feature-wide `features/{feature}/svg/` — assets live with the component that uses them
* **No** nested `svg/` under `svg/`; flat files inside `ComponentFolder/svg/`
* Prefer descriptive filenames inside `svg/` — the folder path already identifies the owner
* If two components need the same SVG, duplicate in each owner's `svg/` or move to `public/icons/` — no separate promotion workflow

### Shared SVGs (global)

SVGs used across **multiple features** live in `public/icons/` or stay as `react-icons` imports (current approach for Nav, Footer, Confirmation).

---

## messages/ — next-intl

One JSON file per locale at the repo root:

```
messages/
├── en.json
└── ar.json
```

Loaded in `getRequestConfig`:

```ts
// src/i18n/request.ts
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### Key namespaces

Top-level keys match components and layout: `Meta`, `Nav`, `Footer`, `Landing`, `Portfolio`, `Services`, `Process`, `About`, `Form`, …

Component sections use PascalCase matching the component folder (`Portfolio`, `Form`, …).

Usage:

```ts
const t = useTranslations('Portfolio');
const t = useTranslations('Form');
const t = useTranslations('Nav');
```

### Rules

* Both `en.json` and `ar.json` must always have the same keys
* Edit the locale files directly — no merge step or per-feature split folders

---

## shared/ — used by 2+ features

`shared/components/` may use **small subfolders** per component. Each component folder uses **Option B** where non-trivial (`lib/`, `types.ts`).

```
shared/
├── components/
│   ├── layout/
│   │   ├── Nav/
│   │   │   ├── index.ts
│   │   │   ├── Nav.tsx
│   │   │   ├── Nav.module.css
│   │   │   └── types.ts
│   │   └── Footer/
│   │       ├── index.ts
│   │       ├── Footer.tsx
│   │       └── Footer.module.css
│   ├── Loading/
│   │   ├── index.ts
│   │   ├── Loading.tsx
│   │   └── Loading.module.css
│   └── toggle/
│       └── ThemeToggle/
│           ├── index.ts
│           └── ThemeToggle.tsx
├── hooks/
│   ├── useBooking.ts
│   ├── useFormTranslations.ts
│   ├── useSteps.ts
│   └── usePrint.ts
├── lib/
│   ├── firebase.ts           ← Firestore reads/writes for bookings
│   ├── constants.ts          ← BASE_URL, etc.
│   ├── types.ts              ← FormData and shared domain types
│   └── functions.ts          ← email helpers (Resend)
├── helpers/                  ← optional: domain-aware pure functions
└── utils/                    ← optional: generic pure functions
```

### lib/ vs helpers/ vs utils/

* **lib/** — talks to external systems. Has side effects or I/O. Firebase, Resend, API route helpers.
* **helpers/** — domain-aware pure functions. Knows about app data shapes. No I/O.
* **utils/** — generic pure functions. No domain knowledge. Easily unit-testable in isolation.

### Migration map (today → target)

| Today | Target |
|-------|--------|
| `src/components/nav/Nav.tsx` | `shared/components/layout/Nav/` |
| `src/components/footer/Footer.tsx` | `shared/components/layout/Footer/` |
| `src/components/loading/Loading.tsx` | `shared/components/Loading/` |
| `src/components/toggle/ThemeToggle.tsx` | `shared/components/toggle/ThemeToggle/` |
| `src/components/home/landing/Landing.tsx` | `features/home/01.Landing/` |
| `src/components/home/portfolio/Portfolio.tsx` | `features/home/02.Portfolio/` |
| `src/components/home/services/Services.tsx` | `features/home/03.Services/` |
| `src/components/home/process/Process.tsx` | `features/home/04.Process/` |
| `src/components/home/about/About.tsx` | `features/home/05.About/` |
| `src/app/[locale]/page.tsx` + `Home.module.css` | `features/home/00.HomePage/` |
| `src/app/[locale]/get-started/GetStarted.tsx` | `features/get-started/00.GetStartedPage/` |
| `src/app/[locale]/get-started/FormHeader.tsx` | `features/get-started/00.GetStartedPage.FormHeader/` |
| `src/app/[locale]/get-started/FormProgressBar.tsx` | `features/get-started/00.GetStartedPage.FormProgressBar/` |
| `src/app/[locale]/confirmation/[id]/Confirmation.tsx` | `features/confirmation/01.Confirmation/` |
| `src/app/[locale]/confirmation/[id]/page.tsx` logic | `features/confirmation/00.ConfirmationPage/` |
| `src/hooks/useBooking.ts` | `shared/hooks/useBooking.ts` |
| `src/lib/firebase.ts`, `types.ts`, `constants.ts` | `shared/lib/` |
| `src/app/api/booking/*` | stays in `app/api/booking/` |

---

## API routes

Booking API routes stay under `app/api/` (not in `features/`):

```
src/app/api/booking/
├── post/route.ts    ← create booking (Firebase + email)
└── get/route.ts     ← fetch booking by id
```

Feature code calls these via `fetch('/api/booking/post', …)` from client components or via shared lib wrappers if server-side usage is added later.

---

## Underscore — shared components (two scopes)

Entry file in every case: **`ComponentName.tsx`** inside the folder (PascalCase, **no** `_` in the TSX filename). Barrel: **`index.ts`**.

### A — Feature-wide shared (between top-level sections)

When a private piece is needed by a **second top-level page section** (`01`–`05`), promote to the feature root:

```
features/home/
├── 03.Services/
├── 03.Services.ServiceCard/     ← private first
├── 04.Process/
│
│   Process also needs ServiceCard
│   ↓
├── _ServiceCard/
│   ├── index.ts
│   └── ServiceCard.tsx
```

### B — Main-scoped shared (between subcomponents of one section)

When a private piece is needed by a **second subcomponent** of the **same** top-level section:

```
features/home/
├── 02.Portfolio/
├── 02.Portfolio.Featured/
├── 02.Portfolio.Grid/
│
│   Featured and Grid both need PortfolioItem
│   ↓
├── 02.Portfolio._PortfolioItem/
│   ├── index.ts
│   ├── PortfolioItem.tsx
│   └── 02.Portfolio._PortfolioItem.Overlay/
│       ├── index.ts
│       └── Overlay.tsx
```

### Promotion ladder

**Feature-wide (two top-level sections):**

```
03.Services.ServiceCard/
        ↓ second top-level section needs it
_ServiceCard/
        ↓ second feature needs it
shared/components/ui/ServiceCard/
```

**Main-scoped (two subcomponents of one section):**

```
02.Portfolio.Featured.PortfolioItem/
02.Portfolio.Grid.PortfolioItem/
        ↓ both subs need the same UI
02.Portfolio._PortfolioItem/
        ↓ optional child
02.Portfolio._PortfolioItem.Overlay/
```

---

## Colocated file types (quick reference — Option B)

| Role | Location |
|------|----------|
| Component | `Landing.tsx` |
| Styles | `Landing.module.css` |
| Types | `types.ts` |
| Pure helpers / metadata | `lib/helpers.ts` |
| I/O fetch | `lib/fetch.ts` |
| Static data | `lib/data.ts` |
| Zod / JSON-LD | `lib/schemas.ts` |
| SVG | `svg/*.svg` |

**`app/` route segment (thin)**

| File | Purpose |
|------|---------|
| `page.tsx` | Import from `@/features/{feature}` |
| `types.ts` | Optional: route `params` only if not in `00.*/types.ts` |
| `route.ts` | API handlers under `app/api/` |

---

## What NOT to do

* No `_components/` or colocated page components inside `app/` routes after migration
* No **two route pages in one feature** — e.g. do not put `00.HomePage` and `00.GetStartedPage` under `features/home/`
* No **nested component folders** — `02.Portfolio/02.Portfolio._PortfolioItem/` is wrong; subcomponents are siblings: `02.Portfolio._PortfolioItem/`
* No loose files on the **feature root** except `index.ts`
* No single-digit order prefixes — use `01`, `02`, not `1`, `2`
* No new `NN` for subcomponents — they inherit the parent section number
* No prefixed flat files (`Landing.helpers.ts`) — use Option B `lib/helpers.ts`
* No `lib/` on the feature root — only inside component folders
* No feature-level `svg/` tree — use per-component `svg/` subfolders
* No `{NN}._Name/` on the feature root for **main-scoped** shared — use `02.Portfolio._PortfolioItem/`
* No numeric prefix on **feature-wide** shared — use `_ServiceCard/`, not `03._ServiceCard/`
* No nesting shared or private folders inside a parent component folder
* No importing a `.tsx` file path — use `from '..'` or `@/features/{feature}`
* No skipping `index.ts` on any component or feature folder
* No importing sibling component folders — use `from '..'` only
* No re-exporting other folders from a component `index.ts`
* Feature `index.ts` must re-export every folder in that feature that other files import
* No promoting a private subfolder directly to `shared/` — use the `_` shared folder stage first
* No `_` on the feature root for layout-only or single-section components
* No lowercase component or folder names
