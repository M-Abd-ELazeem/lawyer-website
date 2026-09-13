# Project Restructure Guide

### Branch `refactor/project-structure` — full detailed walkthrough

> **Who is this for?** Any frontend developer working on this project after the restructure.
> **Read it before writing your first line of code** — especially §9 (Enforced Rules) and §18 (Where does a new file go?).
>
> 🇸🇦 النسخة العربية: [`REFACTOR-GUIDE.ar.md`](./REFACTOR-GUIDE.ar.md)

---

## Executive summary

| Metric | Value |
| --- | --- |
| Commits | 10 |
| Files changed | 108 |
| Lines added / removed | +2,822 / −1,307 |
| Code files now | 93 `.ts` / `.tsx` |
| Architectural layers | 6 |
| Slices | 16 |
| Real bugs fixed | 11 |
| Routes | 5 |

**The three things that happened:**

1. **The project did not build at all.** `npm run build` was failing on `main` because of an empty file. That was fixed first.
2. **A complete restructure** from a flat `components/` folder to **Feature-Sliced Design**, with its rules enforced automatically by ESLint.
3. **A data layer** that makes connecting any CMS or backend later a **one-file change**, with zero component edits.

> `main` was never touched. Everything is reviewable and reversible.

---

## Contents

1. [Before the change](#1-before-the-change)
2. [Commit log](#2-commit-log)
3. [What is Feature-Sliced Design?](#3-what-is-feature-sliced-design)
4. [The six layers in detail](#4-the-six-layers-in-detail)
5. [Why `views` and not `pages`?](#5-why-views-and-not-pages)
6. [Slices and segments](#6-slices-and-segments)
7. [Complete file move map](#7-complete-file-move-map)
8. [Full file tree](#8-full-file-tree)
9. [Automatically enforced rules](#9-automatically-enforced-rules)
10. [The data layer and API seam](#10-the-data-layer-and-api-seam)
11. [The icon system](#11-the-icon-system)
12. [The `shared/ui` kit](#12-the-sharedui-kit)
13. [Entities](#13-entities)
14. [Features](#14-features)
15. [Widgets](#15-widgets)
16. [Views and routes](#16-views-and-routes)
17. [Bugs that were fixed](#17-bugs-that-were-fixed)
18. [Where does a new file go?](#18-where-does-a-new-file-go)
19. [Styles and colours](#19-styles-and-colours)
20. [Commands](#20-commands)
21. [Next.js 16 specifics](#21-nextjs-16-specifics)
22. [Remaining work](#22-remaining-work)

---

## 1. Before the change

### The old structure

```
app/
  page.tsx          the home page
  layout.tsx        no metadata export at all
  globals.css
  articles/page.tsx completely empty (0 bytes) — this broke the build
  services/page.js  a JavaScript file in a TypeScript project
components/         8 files in one flat folder
  Navbar.tsx        93 lines
  Footer.tsx        158 lines
  Hero.tsx          60 lines
  About.tsx         144 lines
  Services.tsx      176 lines
  WhyUs.tsx         111 lines
  CTA.tsx           34 lines
  ContactForm.tsx   377 lines  ← the largest and most tangled
  Articles.tsx      empty, unused
```

### Problem 1: content buried inside components

`Services.tsx` held a 150-line array, and **the icons were JSX inside the data itself**:

```tsx
const services = [
  {
    title: "القانون التجاري",
    desc: "تأسيس الشركات، العقود التجارية...",
    icon: (
      <svg xmlns="..." viewBox="0 0 24 24" ...>
        <path d="M10 12h4" />
        ...
      </svg>
    ),
  },
  // ... 5 more, the same way
];
```

**Why this is fatal:**

Every API in the world sends data as **JSON**, and JSON cannot carry JSX. Fetching these services from a CMS later would have meant rewriting the component entirely, because the shape of the local data looked nothing like an API response.

This specific point is **the main reason** the restructure was necessary.

### Problem 2: duplicated contact details

| Data | Where it was duplicated |
| --- | --- |
| Phone `+971 56 648 1670` | `CTA.tsx`, `ContactForm.tsx`, `Footer.tsx` |
| Email `info@mahmoud-hassan.ae` | `ContactForm.tsx`, `Footer.tsx` |
| Address (Mazyad Mall) | `CTA.tsx`, `ContactForm.tsx`, `Footer.tsx` |
| Opening hours (3 rows) | `ContactForm.tsx`, `Footer.tsx` |

**And the duplication had already caused a real failure.** In `CTA.tsx` the link was written as:

```
https://wa.me/+971 56 648 1670
```

Literal **spaces** and a **`+`** inside a URL. This link **never worked** — and it is the single most important conversion button on the site.

### Problem 3: duplicated SVGs

| Icon | Copies | Location |
| --- | --- | --- |
| `circle-check` | 4 **byte-identical** | `WhyUs.tsx` |
| `clock` | 3 identical | `ContactForm.tsx` |
| `phone` | 3 | `ContactForm.tsx` (×2) + `Footer.tsx` |
| `map-pin` | 3 | `ContactForm.tsx` (×2) + `Footer.tsx` |
| `scale` (logo) | 3 | `Navbar.tsx` + `Footer.tsx` + `Services.tsx` |
| `mail` | 2 | `ContactForm.tsx` + `Footer.tsx` |

**Total: 27 hand-written `<svg>` elements**, each 8–15 lines.

### Problem 4: duplicated styling

| Pattern | Times copied |
| --- | --- |
| Section wrapper `container bg-dark-* py-16 px-6 lg:px-16` | 5 sections, each slightly drifted |
| Gold-rule heading block | 4 sections |
| `btn-gold` | 4 |
| `btn-light` | 3 |
| `label` + `input` pair with the same long className | 5 times in one file |

---

## 2. Commit log

The branch is split into 10 steps. **Each one builds independently.**

| # | Commit | Description | Files | +/− |
| --- | --- | --- | --- | --- |
| 1 | `9794c7a` | Repair broken routes, links and WhatsApp URLs | 12 | +51 / −33 |
| 2 | `ffd9fb5` | Add `config`, `types` and `utils` as a single source of truth | 20 | +352 / −165 |
| 3 | `1a00429` | Extract inline SVGs into an icon set with a key registry | 11 | +376 / −527 |
| 4 | `c3f2db1` | **Restructure into FSD layers** | 47 | +244 / −106 |
| 5 | `eb71901` | Shared UI kit + API seam + real contact backend | 48 | +1,256 / −404 |
| 6 | `a0f6ace` | Build out articles and services pages from the API seam | 17 | +537 / −133 |
| 7 | `0666bf5` | Real 404 for unknown article slugs, tidy assets and env | 36 | +93 / −78 |
| 8 | `1ca64b4` | Document the API seam and Next 16 specifics | 1 | +52 |
| 9 | `7fdb34f` | Close three FSD compliance gaps | 11 | +168 / −145 |
| 10 | `6f2cb5b` | Disable VS Code compact folders | 1 | +7 |

**Note commit 3:** it removed 527 lines and added 376 — extracting icons alone **shrank the codebase by 151 lines**.

---

## 3. What is Feature-Sliced Design?

A methodology for organising frontend projects. The idea: split code into **ordered layers**, and allow imports to flow in **one direction only**.

### The order

```
app      ← highest (routing)
  ↓
views    ← pages
  ↓
widgets  ← page sections
  ↓
features ← user actions
  ↓
entities ← business entities
  ↓
shared   ← lowest (fully generic)
```

### The golden rule

> **A layer may import only from layers strictly below it. Never from a layer above, and never from another slice in the same layer.**

### Why does this rule matter?

It prevents circular dependencies and guarantees every piece of code has exactly one logical home.

Concretely: `entities/service` knows nothing about the home page. That is why you can use services on ten different pages without touching the entity. If an entity were allowed to import from a page, it would be bound to that page forever.

**The real practical payoff:** when a change request arrives, you know immediately where to go.

| Requested change | File you open |
| --- | --- |
| Fetch services from a CMS instead of local data | `entities/service/api/` only |
| Change the grid from 3 to 4 columns | `widgets/services-grid/ui/` only |
| Move the services section above "About" | `views/home/` only |
| Add a "budget" field to the form | `features/consultation-request/` only |

---

## 4. The six layers in detail

### `shared/` — the lowest layer

**Definition:** anything generic with no connection to a law office. If you copied this folder into a restaurant project it would work unchanged.

**The test:** does this file mention "lawyer" or "consultation", or import `siteConfig`? If yes, it does **not** belong in `shared`.

```
shared/
  ui/            generic UI components (Button, Card, Input…)
  ui/icons/      the icon set + registry
  lib/           cn.ts (class merging) — format.ts (date formatting)
  api/           client.ts (typed fetch wrapper)
  config/        navigation.ts (menu links) — env.ts (environment)
```

> **Important exception:** `shared` is not divided into slices but into **segments** directly. So importing `@/shared/ui` and `@/shared/lib/cn` is allowed — those are its intended entry points.

### `entities/` — the *nouns* of the business

**Definition:** things that **exist** in our domain. An entity knows exactly three things:
1. **What the thing is** (its type)
2. **Where to get it** (its fetcher)
3. **How to display one of them** (a single card)

An entity knows **nothing** about pages or their order.

```
entities/
  office/     the office: name, phone, address, hours, logo
  service/    a legal practice area
  article/    a legal article
```

### `features/` — the *verbs* the user performs

**Definition:** what can the user actually **do**?

```
features/consultation-request/     ← requesting a consultation
```

**Note the naming carefully:** the folder is `consultation-request` — a **verb** — not `services`, which is a **noun**. Services are merely an ingredient inside the form (a dropdown). The action itself is submitting the request.

> **Expected question: why is there only one feature?**
> Because this is a marketing site with exactly one real user action: submitting a consultation request. **Inventing extra features to fill out the tree would be wrong.** The layer earns its place by keeping everything about the form — validation, submission, message building — in one place instead of scattered inside a widget.

### `widgets/` — page sections

**Definition:** a large, self-contained chunk of a page that combines entities and features. **Its job is arrangement only.**

```
widgets/
  navbar           top navigation
  footer           footer
  hero             opening section with background image
  about            about the consultant
  services-grid    the services grid
  why-us           why choose us
  cta-banner       call-to-action strip
  contact-section  the full contact section
```

**The clearest example** — `widgets/contact-section/ui/ContactSection.tsx`, just look at its imports:

```tsx
import { ContactInfoCards, OfficeInfoPanel } from "@/entities/office";   // from the entity
import { ConsultationForm } from "@/features/consultation-request";       // from the feature
import { Container, Section, SectionHeading } from "@/shared/ui";         // from shared
```

The widget **owns no data, no logic and no state**. Its only job is deciding that the form takes 7 columns and the office panel takes 5. That is all. Which is why it is 34 lines, down from the original 377.

### `views/` — pages

**Definition:** the complete composition for one route. It arranges widgets and fetches data once.

```
views/
  home/            /
  articles/        /articles
  article-detail/  /articles/[slug]
  services/        /services
```

```tsx
// views/home/ui/HomePage.tsx
export async function HomePage() {
  // Fetched once here and passed down: the services grid and the form's
  // consultation-type options are the same list.
  const services = await getServices();

  return (
    <main>
      <Hero />
      <About />
      <ServicesGrid services={services} />
      <WhyUs />
      <CtaBanner />
      <ContactSection services={services} />
    </main>
  );
}
```

### `app/` — routing only

After the restructure, route files are **very thin**. Their only job is wiring a route to a view:

```tsx
// app/page.tsx — 3 lines
import { HomePage } from "@/views/home";

export default HomePage;
```

> **Mandatory rule:** `page.tsx`, `layout.tsx`, `route.ts` and `error.tsx` **must** use `export default` because Next.js requires it. Everywhere else in the project uses **named exports**.

---

## 5. Why `views` and not `pages`?

In the official FSD docs this layer is called **`pages`**.

**That name is unusable here.**

Reason: any folder named `pages/` at the root of a Next.js project is treated as the **Pages Router** (the legacy routing system). Next would try to turn every file inside it into a real route, and the build would break because our files are not shaped the way it expects.

So we use **`views/`**, the convention adopted by the FSD community when working with Next.js. This is the **only intentional deviation** from the standard, and it is a necessary one, not a preference.

---

## 6. Slices and segments

Every layer (except `shared`) divides into **slices**, and every slice into **segments**:

```
widgets/contact-section/      ← the slice
  ui/                         ← segment: components
  model/                      ← segment: types, data, state
  lib/                        ← segment: slice-local helpers
  api/                        ← segment: data access
  index.ts                    ← the public API
```

### Segments actually present in this project

| Slice | Segments |
| --- | --- |
| `entities/article` | `api` `model` `ui` |
| `entities/office` | `config` `lib` `model` `ui` |
| `entities/service` | `api` `model` |
| `features/consultation-request` | `api` `lib` `model` `ui` |
| `widgets/about` | `model` `ui` |
| `widgets/why-us` | `model` `ui` |
| All other widgets and views | `ui` only |

> **Why do some slices only have `ui`?**
> Because `widgets/hero`, for example, owns no data and no state. **A segment is added when there is something to put in it**, not before. Creating empty folders "for consistency" goes against the methodology.

### The public API rule — critical

**Import a slice only through its `index.ts`.**

```tsx
import { Hero } from "@/widgets/hero";            // ✅ correct
import { Hero } from "@/widgets/hero/ui/Hero";    // ❌ fails lint
```

**Why?** Reaching inside couples you to the slice's internals. If someone reorganises files inside it later, your code breaks. The `index.ts` is the **contract**; everything behind it is free to change.

---

## 7. Complete file move map

### Components

| Old path | New path |
| --- | --- |
| `components/Navbar.tsx` | `widgets/navbar/ui/Navbar.tsx` |
| `components/Footer.tsx` | `widgets/footer/ui/Footer.tsx` |
| `components/Hero.tsx` | `widgets/hero/ui/Hero.tsx` |
| `components/About.tsx` | `widgets/about/ui/About.tsx` |
| `components/Services.tsx` | `widgets/services-grid/ui/ServicesGrid.tsx` |
| `components/WhyUs.tsx` | `widgets/why-us/ui/WhyUs.tsx` |
| `components/CTA.tsx` | `widgets/cta-banner/ui/CtaBanner.tsx` |
| `components/ContactForm.tsx` | `widgets/contact-section/ui/ContactSection.tsx` |
| `components/Articles.tsx` | **deleted** (empty and unused) |

### Types and config

| Old path | New path |
| --- | --- |
| `config/site.ts` | `entities/office/config/site.ts` |
| `config/navigation.ts` | `shared/config/navigation.ts` |
| `types/service.ts` | `entities/service/model/types.ts` |
| `types/article.ts` | `entities/article/model/types.ts` |
| `types/content.ts` | `entities/office/model/types.ts` |
| `types/contact.ts` | `features/consultation-request/model/types.ts` |
| `types/icon.ts` | `shared/ui/icons/types.ts` |
| `types/index.ts` | **deleted** (replaced by per-slice `index.ts`) |

### Utilities and icons

| Old path | New path |
| --- | --- |
| `lib/utils/cn.ts` | `shared/lib/cn.ts` |
| `lib/utils/format.ts` | `shared/lib/format.ts` |
| `lib/utils/contact-links.ts` | `entities/office/lib/contact-links.ts` |
| `components/icons/index.tsx` | `shared/ui/icons/icons.tsx` |
| `components/icons/registry.ts` | `shared/ui/icons/registry.ts` |

### Images

| Old path | New path |
| --- | --- |
| `public/hero-lawyer-CKDTvzYb.jpg` | `public/hero-lawyer.jpg` |
| `public/about-desk-9hQc1FT4.jpg` | `public/about-desk.jpg` |

> The old names carried a meaningless build hash. Their paths now live in `siteConfig.images` instead of being hardcoded in components.

### Export style changed

All components moved from **default** to **named** exports:

```tsx
// before
export default function Navbar() { ... }
import Navbar from "@/components/Navbar";

// after
export function Navbar() { ... }
import { Navbar } from "@/widgets/navbar";
```

**Why:** `export default` is now reserved exclusively for the `app/` route files that Next.js requires it from.

### A function that moved because it broke the rule

`buildConsultationMessage` lived in `entities/office/lib/contact-links.ts`, but it needs the `ConsultationRequest` type from `features/`. That is an **upward import**, which is forbidden.

It moved to `features/consultation-request/lib/build-message.ts` — its correct home, because it belongs to the action, not the entity.

---

## 8. Full file tree

Numbers on the left are line counts:

```
app/                                      ← routing only
   3  page.tsx                            home → views/home
  45  layout.tsx                          root layout + metadata + font
 138  globals.css                         global styles + @theme
   9  services/page.tsx                   → views/services
   9  articles/(list)/page.tsx            → views/articles
  22  articles/(list)/loading.tsx         articles skeleton
  33  articles/[slug]/page.tsx            article page + generateStaticParams
  30  articles/error.tsx                  error boundary for articles
  66  api/contact/route.ts                receives the contact form

views/                                    ← pages
  24  home/ui/HomePage.tsx
  29  articles/ui/ArticlesPage.tsx
  51  article-detail/ui/ArticleDetailPage.tsx
  38  services/ui/ServicesPage.tsx

widgets/                                  ← page sections
  54  navbar/ui/Navbar.tsx                (was 93)
  66  footer/ui/Footer.tsx                (was 158)
  59  hero/ui/Hero.tsx                    (was 60)
  67  about/ui/About.tsx                  (was 144)
  32  about/model/features.ts             ← content split from markup
  36  services-grid/ui/ServicesGrid.tsx   (was 176)
  39  why-us/ui/WhyUs.tsx                 (was 111)
   7  why-us/model/points.ts              ← content split
  36  cta-banner/ui/CtaBanner.tsx
  34  contact-section/ui/ContactSection.tsx  (was 377)

features/consultation-request/            ← the user action
 166  ui/ConsultationForm.tsx             the form
  39  model/schema.ts                     validation rules
  13  model/types.ts                      request + result types
  21  api/submit.ts                       posts to the server
  15  lib/build-message.ts                builds the WhatsApp message

entities/office/                          ← the office entity
  49  config/site.ts                      all office data
  22  lib/contact-links.ts                tel / mailto / wa.me links
  36  model/contact-channels.ts           the three contact channels
  10  model/types.ts                      the Feature type
  23  ui/Logo.tsx                         logo (was duplicated twice)
  25  ui/OpeningHours.tsx                 hours (was duplicated twice)
  29  ui/ContactInfoCards.tsx             the three contact cards
  50  ui/OfficeInfoPanel.tsx              address + hours + contacts panel

entities/service/                         ← the service entity
   9  model/types.ts                      the Service type
  47  model/services.ts                   seed data (6 services)
  35  api/get-services.ts                 ← the API seam

entities/article/                         ← the article entity
  12  model/types.ts                      the Article type
  46  model/articles.ts                   3 seed articles
  56  api/get-articles.ts                 ← the API seam
  30  ui/ArticleCard.tsx                  one article card

shared/                                   ← generic
  52  api/client.ts                       typed fetch wrapper
  18  config/env.ts                       environment variables
  26  config/navigation.ts                menu links
   4  lib/cn.ts                           class merging
  15  lib/format.ts                       date formatting
 193  ui/icons/icons.tsx                  17 icons
  52  ui/icons/registry.ts                key → component map
  25  ui/icons/types.ts                   the IconKey type
  29  ui/index.ts                         the kit's public API
       ui/*.tsx                           26 components (see §12)
```

**Total: 93 code files.**

---

## 9. Automatically enforced rules

**This is the most practically important section in the document.**

`eslint.config.mjs` blocks **three violations**. Any of them **fails** `npm run lint`:

### Violation 1: upward import

```ts
// inside a file in entities/
import { Navbar } from "@/widgets/navbar";   // ❌
```

```
FSD: "entities" may only import from layers below it.
"app", "views", "widgets", "features" are above it
```

### Violation 2: sideways import (between slices of the same layer)

```ts
// inside entities/office/
import type { Service } from "@/entities/service";   // ❌
```

```
FSD: "entities" slices must not import each other.
Move the shared code down a layer.
```

### Violation 3: deep import (bypassing the public API)

```ts
import { Hero } from "@/widgets/hero/ui/Hero";   // ❌
```

```
FSD: import a slice through its index.ts, not its internals.
Use "@/widgets/hero", not "@/widgets/hero/ui/Hero".
```

### Try it yourself

This is not theory. Open any file in `entities/`, add a violating line, run `npm run lint`, and you will see the error immediately. All three rules were **verified by actually triggering them**.

### What do I do when lint blocks me?

**Do not disable the rule. Do not add `eslint-disable`.** Being blocked means the code is in the wrong place.

The fix, 90% of the time: **move the shared code down a layer.**

A real example from this branch: `buildConsultationMessage` was in `entities/office` and needed a type from `features`. The fix was not to disable the rule — it was to move the function to `features`, where it logically belongs.

### ⚠️ Technical warning for anyone editing `eslint.config.mjs`

All three rules live inside a **single** `no-restricted-imports` entry per layer. This is **deliberate and necessary**.

In ESLint's flat config, a later block **replaces** a rule's options rather than merging them. If you split them into two separate blocks, **the first is silently disabled** — lint will pass and everything will look fine while the rule does nothing.

This actually happened during the work and was caught only by testing.

---

## 10. The data layer and API seam

This is **the whole point** of the restructure.

### The principle

Every fetcher lives in the entity's `api/` segment and returns a **domain model**:

```ts
// entities/service/api/get-services.ts

export async function getServices(): Promise<Service[]> {
  if (!hasApi) return seedServices;          // seed data while API_BASE_URL is unset

  const dto = await apiGet<ServiceDto[]>("/services", {
    revalidate: 3600,                         // revalidate hourly
    tags: ["services"],                       // tag for on-demand invalidation
  });
  return dto.map(toService);                  // DTO → domain model
}

// The backend's shape, kept separate from the domain model
type ServiceDto = { id: string; title: string; description: string; icon: string };

function toService(dto: ServiceDto): Service {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    icon: (dto.icon as Service["icon"]) ?? "scale",   // fallback instead of crashing
  };
}
```

### Why separate `ServiceDto` from `Service`?

Because the backend's shape may change, or differ from what the UI needs. `toService` is the **barrier** between them. If the backend renames a field, you edit `toService` only and no component is affected.

### The golden rule for data

> **Components call `getServices()` and never touch `seedServices`.**

So when the CMS arrives, the change is in **that one file**, with zero component edits.

### Integration table

| What you want to connect | File / variable |
| --- | --- |
| Services content from a CMS | `entities/service/api/get-services.ts` |
| Articles from a CMS | `entities/article/api/get-articles.ts` |
| Receiving contact form submissions | `CONTACT_WEBHOOK_URL` in `.env.local` |
| Backend base URL | `API_BASE_URL` in `.env.local` |

### `shared/api/client.ts`

A thin, typed wrapper around `fetch`:

- Builds the full URL from `API_BASE_URL`
- Turns any non-OK response into an `ApiError` carrying `status` and `url`
- Returns typed JSON — the caller never sees a `Response` object
- Passes caching options per call

> **Important:** in Next.js 16, `fetch` is **no longer cached by default**. Caching is opt-in per call via `revalidate` and `tags`.

### Error handling

- `getArticle(slug)` returns **`null`** when not found rather than throwing. The page turns that into a **404** via `notFound()`.
- `getArticles()` does throw, and `app/articles/error.tsx` catches it and renders `ErrorState` with a retry button.

### Activation

Everything currently runs on seed data because `API_BASE_URL` is unset. Set it in `.env.local` and real fetching begins. See `.env.example`.

---

## 11. The icon system

### The problem it solves

Icons were stored as JSX inside data arrays. That can never come from an API.

### The solution: string key + registry

**Step 1** — content stores the icon as a string:

```ts
{ id: "commercial", title: "القانون التجاري", icon: "building" }
```

**Step 2** — `IconKey` defines the allowed keys:

```ts
export type IconKey = "scale" | "building" | "house" | "users" | "file-text" | ...
```

**Step 3** — the registry maps key to component:

```tsx
export const iconRegistry: Record<IconKey, ComponentType<IconProps>> = {
  scale: ScaleIcon,
  building: BuildingIcon,
  // ...
};
```

**Step 4** — the component uses it:

```tsx
const Icon = iconRegistry[service.icon];
<Icon className="size-6" />
```

### Why this matters so much

**This is precisely what makes the API possible.** JSON can send `"icon": "building"`. It can never send `<svg>`.

### Built-in safety

The registry is typed as a **total `Record<IconKey, ...>`**. If you add a key to `IconKey` and forget to register a component, **the build fails immediately** instead of rendering a blank space nobody notices.

### Available icons (17)

| Key | Component | Used for |
| --- | --- | --- |
| `scale` | `ScaleIcon` | logo + general consultations |
| `building` | `BuildingIcon` | commercial law |
| `house` | `HouseIcon` | real-estate law |
| `users` | `UsersIcon` | personal status |
| `file-text` | `FileTextIcon` | contract drafting |
| `gavel` | `GavelIcon` | litigation and arbitration |
| `phone` | `PhoneIcon` | phone |
| `mail` | `MailIcon` | email |
| `map-pin` | `MapPinIcon` | address |
| `clock` | `ClockIcon` | opening hours |
| `whatsapp` | `WhatsappIcon` | WhatsApp |
| `send` | `SendIcon` | submit button |
| `check-circle` | `CheckCircleIcon` | "why choose us" points |
| `user-check` | `UserCheckIcon` | licensed |
| `briefcase` | `BriefcaseIcon` | practical experience |
| `book-open` | `BookOpenIcon` | academic background |
| `languages` | `LanguagesIcon` | bilingual |

### Internal structure

All icons share an `SvgIcon` base that fixes the `viewBox`, `stroke` settings and `currentColor`. So:

- **Colour** comes from `className`, e.g. `text-gold`
- **Size** comes from `className`, e.g. `size-5`
- All are `aria-hidden="true"` — they are decorative and sit next to readable text

### How do I add an icon?

1. Add the component to `shared/ui/icons/icons.tsx`
2. Add the key to `IconKey` in `shared/ui/icons/types.ts`
3. Register it in `registry.ts` — **and if you forget, the build fails and reminds you**

---

## 12. The `shared/ui` kit

**Build principle:** every component here was extracted from something **actually duplicated** in the code — not guessed at.

### Core components

| Component | Props | What it replaced |
| --- | --- | --- |
| `Section` | `id` `tone` `className` | the section wrapper repeated in **5** sections |
| `Container` | `className` | the inner `max-w-7xl mx-auto` column |
| `Button` | `variant` + `<button>` props | `btn-gold` / `btn-light` |
| `ButtonLink` | `href` `variant` | internal links via `next/link` |
| `ButtonExternalLink` | `href` `variant` | external links (adds `noopener` automatically) |
| `Card` | `className` | the `.card` class in **3** places |
| `IconBox` | `className` | the tinted square around an icon |
| `Divider` | `variant: "gold" \| "rule"` | the gold rule and `<hr>` |
| `SectionHeading` | `eyebrow` `title` `subtitle` `align` | the heading block repeated in **4** sections |
| `PageHeader` | `title` `subtitle` | inner-page headings |
| `Breadcrumbs` | `items: Crumb[]` | article-detail breadcrumbs |

#### A note on `Section`

```tsx
<Section id="about" tone="dark">         {/* primary background */}
<Section id="services" tone="secondary"> {/* alternating background */}
```

The `id` prop is not a detail — it is what **fixed the broken navigation links**, because the sections had no `id` at all.

#### Why three button components instead of one?

Because the props of `<button>`, `<a>` and `<Link>` genuinely differ. Unifying them behind a single `as` prop costs far more in type gymnastics than it saves at the call site.

### Form components — `shared/ui/form/`

| Component | Purpose |
| --- | --- |
| `Field` | combines `Label` + control + error — **replaced a 5× repetition** |
| `Input` | text input, accepts `invalid` and sets `aria-invalid` |
| `Textarea` | multi-line input |
| `Select` | dropdown |
| `Label` | field label |
| `FormError` | error message with `role="alert"` |
| `SubmitButton` | submit with `Spinner` and double-submit prevention |

All controls share `control-styles.ts` so **their styling cannot drift apart** over time.

### State components — `shared/ui/feedback/`

These became necessary the moment an API existed — data can now be loading, empty, or failed:

| Component | When it is used |
| --- | --- |
| `Spinner` | while the form submits |
| `Skeleton` | loading placeholder in `loading.tsx` |
| `Alert` | success and failure messages — `tone: "success" \| "error"` |
| `EmptyState` | no articles |
| `ErrorState` | fetch failed, with a retry button |

> **Deliberate decision:** `Alert` is an **inline** component, not a toast system. Its only consumer is the form's result message, and that message should appear **next to the form**, not in a screen corner. Building a full toast provider for one call site is complexity with no payoff.

### Content components — `shared/ui/content/`

| Component | Purpose |
| --- | --- |
| `Badge` | article tags |
| `Prose` | long-form body copy (article content) |
| `Pagination` | page numbers |

#### ⚠️ Important security note about `Prose`

`Prose` accepts **rendered React nodes**, never a raw HTML string.

If the CMS later returns HTML, it **must be sanitized on the server** before rendering. Piping untrusted CMS HTML straight into `dangerouslySetInnerHTML` on a public site is a **stored XSS vulnerability**. Use something like `isomorphic-dompurify`.

### How to import

```tsx
import { Section, Container, Button, Card } from "@/shared/ui";
```

Everything is exported from `shared/ui/index.ts`.

---

## 13. Entities

### `entities/office` — the office

**The key file:** `config/site.ts` — all office data in one place:

```ts
export const siteConfig = {
  name: "محمود حسن",
  title: "مستشار قانوني",
  legalName: "مكتب المستشار محمود حسن للاستشارات القانونية",
  description: "...",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmoud-hassan.ae",
  locale: "ar_AE",

  phone: {
    display: "+971 56 648 1670",   // for humans — has spaces
    raw: "971566481670",           // for URLs — digits only
  },

  email: "info@mahmoud-hassan.ae",
  address: { short, full, mapsUrl },
  hours: [ { days, time }, ... ],
  images: { hero, about },
  stats: [ { value, label }, ... ],
} as const;
```

#### ⚠️ Why are `phone.display` and `phone.raw` separate?

**This is exactly what caused the original bug.** The display form has spaces so it reads well; the raw form is digits only because `tel:` and `wa.me` require it.

When they were merged into one value, the result was the broken `https://wa.me/+971 56 648 1670`.

> **Do not merge them, however tempting it looks.**

**The rest of the entity:**

| File | Purpose |
| --- | --- |
| `lib/contact-links.ts` | the **only** place that builds `wa.me`, `tel:` and `mailto:` URLs |
| `model/contact-channels.ts` | the three contact channels as data |
| `ui/Logo.tsx` | the logo — was duplicated in `Navbar` and `Footer` |
| `ui/OpeningHours.tsx` | opening hours — was duplicated in `Footer` and the contact panel |
| `ui/ContactInfoCards.tsx` | the three cards |
| `ui/OfficeInfoPanel.tsx` | address, hours and contact panel |

#### `buildWhatsAppUrl`

```ts
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.phone.raw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

Always uses `phone.raw`, always encodes the message. **Every WhatsApp link on the site goes through this** — never hand-build one anywhere else.

### `entities/service` — a service

| File | Purpose |
| --- | --- |
| `model/types.ts` | `Service = { id, title, description, icon }` |
| `model/services.ts` | 6 services as seed data |
| `api/get-services.ts` | `getServices()` — **the API seam** |

### `entities/article` — an article

| File | Purpose |
| --- | --- |
| `model/types.ts` | `Article = { slug, title, excerpt, publishedAt, tags, coverImage?, body? }` |
| `model/articles.ts` | 3 seed articles |
| `api/get-articles.ts` | `getArticles()` and `getArticle(slug)` |
| `ui/ArticleCard.tsx` | one article card |

> Note `body` is optional — it is only populated on the detail page, so the listing does not need to fetch it.

---

## 14. Features

### `features/consultation-request`

This slice owns **everything about submitting a consultation request**:

```
ui/ConsultationForm.tsx     the form (client component)
model/schema.ts             validation rules
model/types.ts              ConsultationRequest and ContactResult
api/submit.ts               posts to /api/contact
lib/build-message.ts        builds the WhatsApp message
```

### Validation rules in detail

`model/schema.ts` — **with no external library**:

| Field | Rule | Error message |
| --- | --- | --- |
| `name` | at least 2 characters | «يرجى إدخال الاسم الكامل.» |
| `phone` | required + international pattern | «رقم الهاتف غير صالح.» |
| `email` | optional, but must be valid if present | «البريد الإلكتروني غير صالح.» |
| `consultationType` | required | «يرجى اختيار نوع الاستشارة.» |
| `details` | at least 10 characters | «يرجى إضافة تفاصيل كافية…» |

#### The most important point about validation

> **The same validation file runs in the browser and on the server.**

```ts
// browser — features/consultation-request/ui/ConsultationForm.tsx
const nextErrors = validateConsultationRequest(values);

// server — app/api/contact/route.ts
const fieldErrors = validateConsultationRequest(payload);
```

So the client and server **cannot disagree** about what is valid, and nobody can bypass validation by posting directly to the API.

### Form states

```
idle  →  submitting  →  success
                    ↘  error
```

- `idle` — initial
- `submitting` — button disabled, shows `Spinner`, double-submit blocked
- `success` — green `Alert` + form cleared
- `error` — red `Alert` + per-field error messages

A field's error is also **cleared as soon as the user edits it**, instead of lingering annoyingly.

### An important improvement: the dropdown

"Consultation type" used to be a free-text input, meaning **any string** reached the backend.

It is now a `<select>` built from `getServices()` itself, so the values arriving are always clean and constrained.

### WhatsApp as a secondary path

The primary button posts to the API. A second WhatsApp button was kept **deliberately**, so client enquiries are not lost if the backend goes down. This is the site's most important conversion path.

---

## 15. Widgets

| Widget | Purpose | Lines (before → after) |
| --- | --- | --- |
| `navbar` | top nav + mobile menu | 93 → 54 |
| `footer` | four-column footer | 158 → 66 |
| `hero` | opening section with background | 60 → 59 |
| `about` | about + 4 feature cards | 144 → 67 + 32 |
| `services-grid` | the six services | 176 → 36 |
| `why-us` | why choose us + pull quote | 111 → 39 + 7 |
| `cta-banner` | call-to-action strip | 34 → 36 |
| `contact-section` | full contact section | **377 → 34** |

### Breaking up `contact-section`

The original 377-line file mixed four things. It was split into:

| Part | New home | Why |
| --- | --- | --- |
| the form | `features/consultation-request/ui/` | it is a user **action** |
| the three cards | `entities/office/ui/ContactInfoCards` | it is **office** data |
| address + hours panel | `entities/office/ui/OfficeInfoPanel` | same reason |
| layout and arrangement | `widgets/contact-section` (34 lines) | all that remains for a widget |

### Content split from markup

`widgets/about` and `widgets/why-us` have a `model/` segment:

```ts
// widgets/about/model/features.ts
export const aboutFeatures: Feature[] = [
  { id: "licensed", title: "اعتماد قانوني", description: "...", icon: "user-check" },
  // ...
];
```

The component imports it rather than declaring it. **This makes the content ready to move to a CMS** without touching the markup.

---

## 16. Views and routes

| Route | View | Build type |
| --- | --- | --- |
| `/` | `views/home` | Static |
| `/services` | `views/services` | Static |
| `/articles` | `views/articles` | Static |
| `/articles/[slug]` | `views/article-detail` | **SSG** — 3 pages prerendered |
| `/api/contact` | — | Dynamic |

### Actual build output

```
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
├ ○ /articles
├ ● /articles/[slug]
│ ├ /articles/commercial-contracts-uae
│ ├ /articles/tenancy-disputes-abu-dhabi
│ └ /articles/inheritance-law-basics
└ ○ /services
```

### `generateStaticParams`

```tsx
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}
```

Tells Next to build every known article at build time, so they are served as fast static pages.

### `generateMetadata`

Each article gets its own `<title>`, description and Open Graph tags, built from its data:

```tsx
export async function generateMetadata({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;      // ← note the await
  const article = await getArticle(slug);
  if (!article) return { title: "المقال غير موجود" };
  return { title: article.title, description: article.excerpt, openGraph: { ... } };
}
```

---

## 17. Bugs that were fixed

**Every bug below existed on `main`.** None were invented to justify the restructure.

### 1. The build failed entirely 🔴

```
Type error: File 'app/articles/page.tsx' is not a module.
```

The file was **empty (0 bytes)** with no `export default`. Next requires a default export from `page.tsx`.

**Result:** `npm run build` failed on `main`. The project was not deployable at all.

### 2. The CTA WhatsApp link was broken 🔴

```tsx
href="https://wa.me/+971 56 648 1670"   // spaces and a + inside a URL
```

It never worked. This is **the site's most important conversion button**.

### 3. The WhatsApp message was never encoded 🔴

```tsx
const message = `*طلب استشارة جديد*%0A%0A` + `*الاسم الكامل:* ${formData.name}%0A` + ...;
const url = `https://wa.me/${number}?text=${message}`;   // no encoding
```

Two bugs at once: `%0A` written as literal text, and the Arabic body, spaces and `*` characters **never encoded at all**.

**The fix** — note the two changes **must** happen together:

```ts
const message = [ "*طلب استشارة جديد*", "", `*الاسم الكامل:* ${request.name}`, ... ].join("\n");
const url = `https://wa.me/${raw}?text=${encodeURIComponent(message)}`;
```

> **Why together?** Running `encodeURIComponent` over text that still contains a literal `%0A` produces `%250A`, making it worse.

**Verified** — the resulting URL decodes to:

```
*طلب استشارة جديد*

*الاسم الكامل:* 
*رقم الهاتف:* 
*البريد الإلكتروني:* غير محدد
*نوع الاستشارة:* 
*تفاصيل القضية:*
```

Readable Arabic with real line breaks. ✅

### 4. Links that 404'd

`Navbar` pointed to `/about` and `/contact` — **neither route existed**.

`Footer` pointed to `#about` and `#services` — **the sections had no `id`**.

**The fix:** all links now use the full `/#about` form. **Why:** `Navbar` and `Footer` live in the root layout and render on **every** page. Writing `#about` while on `/articles` does nothing; `/#about` navigates home and then scrolls.

### 5. Buttons that did nothing

- Both Hero buttons were `<a>` elements **with no `href`** — unclickable and unreachable by keyboard
- The "احجز استشارتك" button in `Navbar` was a `<button>` **with no handler**

### 6. Hero image positioned against the wrong ancestor

```tsx
<section className="container ...">        {/* no relative */}
  <Image className="absolute inset-0" />   {/* resolves against the wrong element */}
```

`absolute` needs a positioned ancestor. Added.

### 7. Three `<h1>` elements on one page

Hero had **two `<h1>`s** and `WhyUs` a third. Bad for SEO and screen readers.

**The fix:** one `<h1>` in Hero with a `<span>` for the second line (visually identical), and `WhyUs` became an `<h2>`.

### 8. The mobile menu never closed

After tapping a link, the menu stayed open over the content. Added `onClick={close}`, plus `aria-expanded` and an accessible label on the toggle.

### 9. A class that does not exist

```tsx
<span className="block h-0.2 w-8 ..." />   // h-0.2 is not a Tailwind class
```

It did nothing. Now `h-0.5`.

### 10. Soft 404 🔴

`/articles/anything-nonexistent` returned **`200 OK`** instead of `404`.

**Result:** search engines would have indexed nonexistent pages as valid.

#### Why it happened

Once Next begins **streaming** — after the first `Suspense` boundary such as a `loading.tsx` renders — the **headers have already been sent**, and the status code can no longer be changed. `notFound()` can then only mark the page `noindex`.

The problem was that `app/articles/loading.tsx` applied to the **entire segment**, including `[slug]`.

#### The fix

The listing and its `loading.tsx` moved into a **route group** named `(list)`:

```
app/articles/
  (list)/page.tsx       ← the listing
  (list)/loading.tsx    ← the skeleton — no longer wraps [slug]
  [slug]/page.tsx       ← outside the group
  error.tsx             ← still covers both
```

> Parentheses mean the folder name **does not appear in the URL**. The route stays `/articles`.

**Result:**

| Route | Before | After |
| --- | --- | --- |
| `/articles/not-real` | `200` ❌ | `404` ✅ |
| `/articles/commercial-contracts-uae` | `200` | `200` ✅ |
| `/articles` | `200` | `200` ✅ |

**Lesson:** think carefully before adding a `loading.tsx` to a segment that has dynamic children.

### 11. Conflicting `robots` tags

The layout emitted `robots: { index: true, follow: true }` while 404 pages emit `noindex` from Next. The result was **two contradictory tags** on the same page.

Removed from the layout, since it only restated the default behaviour anyway.

### Final verification against a real production server

| Test | Result |
| --- | --- |
| `/`, `/articles`, `/services` | `200` ✅ |
| All three articles | `200` ✅ |
| Unknown route | `404` ✅ |
| Unknown article slug | `404` ✅ |
| `POST /api/contact` valid | `200 {"ok":true}` ✅ |
| `POST` invalid | `422` + per-field Arabic errors ✅ |
| `POST` malformed body | `400` ✅ |
| `GET /api/contact` | `405` ✅ |
| `<h1>` count on home | `1` ✅ |
| Icons rendered | `29` ✅ |
| Document direction | `lang="ar" dir="rtl"` ✅ |

---

## 18. Where does a new file go?

**The most practical question.** Ask yourself, in order:

### 1️⃣ Is it fully generic with no connection to a law office?
A button, a modal, a tooltip, a formatting helper
→ **`shared/`**

### 2️⃣ Is it a *thing* that exists in the business domain?
A testimonial, a lawyer, a case
→ **`entities/<thing>/`**

### 3️⃣ Is it something the user *does*?
Subscribe to a newsletter, book an appointment, download a file
→ **`features/<action>/`**

### 4️⃣ Is it a whole page section combining several things?
→ **`widgets/<section>/`**

### 5️⃣ Is it an entire page?
→ **`views/<page>/`** + a thin file in `app/`

---

### The rule that settles the hard cases

When torn between **entity** and **widget**, ask:

> **Does it display one, or many arranged on a page?**

| Component | Layer |
| --- | --- |
| A single article card | **entity** → `entities/article/ui/ArticleCard.tsx` |
| A grid of articles with a heading, empty state and pagination | **widget** |

---

### Worked example: adding a "Testimonials" section

**Step 1 — the entity:**

```
entities/testimonial/
  model/types.ts          export type Testimonial = { id, author, role, text, rating }
  model/testimonials.ts   seed data
  api/get-testimonials.ts getTestimonials() ← the future API seam
  ui/TestimonialCard.tsx  displays one testimonial
  index.ts                public API
```

**Step 2 — the widget:**

```
widgets/testimonials/
  ui/Testimonials.tsx   heading + grid + empty state
  index.ts
```

```tsx
import { TestimonialCard } from "@/entities/testimonial";
import { Container, Section, SectionHeading, EmptyState } from "@/shared/ui";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) { ... }
```

**Step 3 — the page:**

```tsx
// views/home/ui/HomePage.tsx
const testimonials = await getTestimonials();
...
<Testimonials testimonials={testimonials} />
```

**Step 4:** `npm run lint && npm run build`

---

### Common mistakes to avoid

| ❌ Mistake | ✅ Instead |
| --- | --- |
| Declaring static data inside a `ui/` component | Put it in `model/` |
| Importing `@/widgets/hero/ui/Hero` | `@/widgets/hero` |
| Writing the phone number in a component | `siteConfig.phone` |
| Hand-building a `wa.me` URL | `buildWhatsAppUrl()` |
| Copying section classNames by hand | `<Section>` and `<Container>` |
| Adding `eslint-disable` to bypass an FSD rule | Move the code down a layer |
| Storing an icon as JSX inside data | Use a string key + `iconRegistry` |

---

## 19. Styles and colours

### Typography scale

`app/globals.css` contains an `@theme` block with a **complete type scale**. Use these instead of arbitrary sizes:

| Class | Size | Use |
| --- | --- | --- |
| `text-display` | 52px | the hero headline — once per site |
| `text-h1` | 36px | page-level heading |
| `text-h2` | 30px | section heading |
| `text-h3` | 22px | card-group heading |
| `text-h4` | 18px | small card heading |
| `text-lead` | 19px | intro copy |
| `text-body` | 17px | default paragraph |
| `text-small` | 15px | nav, buttons, labels |
| `text-caption` | 13px | fine print, field errors |

### Colours

Defined in `:root` as CSS variables: `--gold`, `--dark`, `--dark-section`, `--dark-card`, `--muted-foreground`.

### ⚠️ Inverted naming — watch out

```css
.bg-dark-section   →  var(--dark)          /* says "section" but is the primary colour */
.bg-dark-secondary →  var(--dark-section)  /* and vice versa */
```

**The two names are genuinely swapped.** The problem is **now hidden** behind `Section`'s `tone` prop, so:

```tsx
<Section tone="dark">        {/* ✅ */}
<Section tone="secondary">   {/* ✅ */}

<section className="bg-dark-section">   {/* ❌ don't use directly */}
```

### ⚠️ A note on `.border-gold`

This class is currently a **full shorthand**: `border: 1px solid var(--gold)` — not just a colour.

If you migrate it to `@theme` later, Tailwind will generate `border-gold` as a **colour only, with no width**, and `widgets/about` will break because it relies on the shorthand. It would then need `border border-gold`.

---

## 20. Commands

```bash
npm install            # install dependencies
npm run dev            # dev server at http://localhost:3000
npm run build          # build — this is the real test
npm run start          # run the production build locally
npm run lint           # lint, including the FSD rules
npx next typegen       # generate route types
npx tsc --noEmit       # typecheck only
```

### Before pushing any code

```bash
npm run lint && npm run build
```

**Both.** Lint catches architecture violations; build catches type and render errors.

> **When do I run `next typegen`?** After adding any new dynamic route such as `[slug]`, otherwise TypeScript will not recognise the `PageProps` type and autocomplete will not work.

---

## 21. Next.js 16 specifics

This release has **breaking changes** from previous versions. **Do not rely on prior knowledge or on internet examples that may target an older version.**

| Topic | The rule in Next 16 |
| --- | --- |
| `params` | now a **Promise** — `const { slug } = await params` |
| `searchParams` | now a **Promise** too |
| `fetch` | **no longer cached by default** — caching is opt-in per call |
| `error.tsx` | the prop is now **`unstable_retry`**, not `reset` |
| `middleware.ts` | renamed to **`proxy.ts`** |
| Route types | generated by `next dev`, `next build` or `next typegen` |
| Turbopack | now the default |
| `notFound()` while streaming | cannot change the status after headers are sent |

### A correct `error.tsx` in 16

```tsx
"use client";   // error boundaries must be client components

export default function ArticlesError({
  error,
  unstable_retry,          // ← not reset
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) { ... }
```

### 📚 The official docs ship locally

```
node_modules/next/dist/docs/
```

**Consult them before writing.** This is mandated by `AGENTS.md` at the project root:

> "This is NOT the Next.js you know. This version has breaking changes — read the relevant guide before writing any code."

---

## 22. Remaining work

| # | Task | Priority | Details |
| --- | --- | --- | --- |
| 1 | Extract `ServiceCard` | Medium | The service card is **duplicated** between `widgets/services-grid` and `views/services`, and has already drifted (`<h3>` in one, `<h2>` in the other). It belongs in `entities/service/ui/ServiceCard.tsx`. Lint does not catch it because duplication is not an import violation. |
| 2 | Move remaining `globals.css` classes to `@theme` | Low | Tailwind would generate them with all variants. Mind the `.border-gold` issue above. |
| 3 | Fix the inverted naming | Low | `.bg-dark-section` / `.bg-dark-secondary` are swapped. Currently hidden behind `Section`. |
| 4 | Connect the CMS | Project-dependent | Set `API_BASE_URL` in `.env.local` |
| 5 | Wire up form delivery | **High** | Set `CONTACT_WEBHOOK_URL` — submissions are currently only logged |
| 6 | Settle on one package manager | **High** | Both `yarn.lock` and `package-lock.json` exist. Delete one — they can resolve different dependency trees and produce confusing errors. |
| 7 | Two unused images | Low | In `public/` — left deliberately in case they are needed |
| 8 | Replace seed article content | Project-dependent | The three articles are placeholders |

### ⚠️ Item 5 is urgent

Right now `app/api/contact/route.ts` **logs the request to the console and returns success**, because `CONTACT_WEBHOOK_URL` is unset.

That means **client enquiries submitted through the form reach nobody.** The WhatsApp button works, but anyone using the form will have their message silently dropped. **This must be configured before launch.**

---

## 23. References

| Reference | Location |
| --- | --- |
| Architecture rules summary | `ARCHITECTURE.md` |
| Required environment variables | `.env.example` |
| Project instructions for developers | `AGENTS.md` |
| Official Next.js 16 docs | `node_modules/next/dist/docs/` |
| Feature-Sliced Design docs | https://feature-sliced.design/ |
| Arabic version of this guide | `REFACTOR-GUIDE.ar.md` |

---

## Summary in three points

1. **The structure is now layered and enforced.** You cannot break it by accident — lint will stop you. But it **will not explain why**, which is what this document is for.

2. **Content is separated from markup.** All site data lives in `model/` and `config/`, shaped exactly like an API response. Connecting a CMS is a one-file change per entity.

3. **Real bugs were fixed and verified.** The project did not build at all, and the WhatsApp link — the primary conversion path — was completely broken.

---

**If you are unsure why a file lives where it does — ask before moving it.**
