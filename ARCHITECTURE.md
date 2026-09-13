# Architecture — Feature-Sliced Design

This project follows [Feature-Sliced Design](https://feature-sliced.design/).

## Layers

Highest to lowest. **A layer may only import from layers strictly below it.**

| Layer       | Holds                                                      |
| ----------- | ---------------------------------------------------------- |
| `app/`      | Next.js routing, root layout, providers, global styles      |
| `views/`    | One composition per route ("pages" in FSD terms)            |
| `widgets/`  | Large self-contained page sections                          |
| `features/` | Things a user *does* (submit a consultation request)        |
| `entities/` | Business entities (the office, a service, an article)       |
| `shared/`   | Reusable and business-agnostic: UI kit, icons, lib, config  |

### Why `views/` and not `pages/`

FSD names this layer `pages`. That name is unusable here: a top-level
`pages/` directory **is the Next.js Pages Router**, and its files would be
picked up as routes. `views/` is the standard workaround for FSD on Next.

### `app/` is routing only

Route files stay thin and delegate to `views/`:

```tsx
// app/articles/page.tsx
import { ArticlesPage } from "@/views/articles";
export default ArticlesPage;
```

Next requires a **default** export from `page.tsx`, `layout.tsx`, `route.ts`
and `error.tsx`. Everywhere else uses named exports.

## Slices and segments

Each layer (except `shared`, which has segments only) divides into slices:

```
widgets/contact-section/
  ui/        components
  model/     types, state
  lib/       slice-local helpers
  api/       data access
  index.ts   public API
```

**Import a slice only through its `index.ts`.** Deep imports into another
slice's internals are what makes a structure impossible to refactor later.

## Rules are enforced, not just documented

`eslint.config.mjs` applies `no-restricted-imports` per layer, so both
violations fail `npm run lint`:

- **Upward import** — `entities/` importing from `@/widgets/*`
- **Cross-slice import** — `entities/office` importing `@/entities/service`

If two slices in one layer need the same code, move that code **down** a
layer rather than importing sideways.

## Where does a new file go?

- Business-agnostic and reusable anywhere → `shared/`
- Describes a *thing* in the domain → `entities/<thing>/`
- Describes something a user *does* → `features/<action>/`
- A big composed section of a page → `widgets/<section>/`
- Assembles widgets into one route → `views/<route>/`
