# better-contract

Headless-CMS rebuild of the [bettercontact.rocks](https://bettercontact.rocks) marketing
site. The full brief lives at **[`docs/requirements.md`](docs/requirements.md)** — read it
before adding features.

> Status: scaffold only. No content types, admin GUI or database schema exist yet.

## Stack

| Layer     | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19, TypeScript   |
| Styling   | Tailwind CSS v4 (via `@tailwindcss/postcss`)     |
| Data      | Prisma + PostgreSQL (schema added in a later task) |
| Linting   | ESLint 9 (`eslint-config-next`, flat config)     |
| Tests     | Vitest + React Testing Library (jsdom)           |

## Folder structure

```
app/         Next.js App Router routes, layouts and colocated tests
components/  Shared UI components
lib/         Server-side helpers, DB client, business logic
prisma/      Prisma schema, migrations and seed (stub for now)
public/      Static assets served at the site root
docs/        Project documentation, incl. requirements.md
```

Folder names stay content-type agnostic on purpose: the requirements doc lists 18+ hub /
post types (Blog, Case Study, VS, Integration, Glossary, Playbook, …), so nothing generic
should be named after a single one of them.

### Test convention

Tests are **colocated** next to the code they cover, named `*.test.ts` / `*.test.tsx`
(e.g. `app/page.test.tsx`). There is no separate `tests/` tree. Vitest is configured in
`vitest.config.mts` with `vite-tsconfig-paths`, so the `@/*` import alias works in tests;
`vitest.setup.ts` registers `@testing-library/jest-dom` matchers and cleans up the DOM
between tests.

Vitest (rather than `next/jest`) was chosen because it is markedly faster, needs no Babel
transform, and shares Vite's ESM resolution with the pure `lib/` helpers that later tasks
will unit-test.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL
npm run dev            # http://localhost:3000
```

## Scripts

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start the dev server                                 |
| `npm run build`     | Production build                                     |
| `npm start`         | Serve a production build                             |
| `npm run lint`      | ESLint over the repo                                 |
| `npm run typecheck` | `next typegen` + `tsc --noEmit`                      |
| `npm test`          | Run the test suite once (`vitest run`)               |
| `npm run test:watch`| Run the test suite in watch mode                     |

`typecheck` runs `next typegen` first because Next.js generates the route-aware types
(`PageProps`, `LayoutProps`, …) into `.next/types`, which `tsconfig.json` includes — a
bare `tsc --noEmit` would fail on a clean checkout.

## Environment

See `.env.example` for the required variables. `.env` itself is gitignored.

`.npmrc` pins `include=dev`: the build needs `typescript`, `tailwindcss` and the `@types/*`
packages, which live in `devDependencies`, and environments that export
`NODE_ENV=production` would otherwise make npm skip them. `vitest.config.mts` overrides
`NODE_ENV` to `test` for the same reason — the production build of React omits `React.act`,
which React Testing Library needs.
