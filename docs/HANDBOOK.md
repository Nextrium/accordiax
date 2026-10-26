# Accordiax handbook

Shared context for everyone who works on Accordiax, people and AI agents alike.

## The product in brief

Accordiax turns an informal deal into a protected one. Two people agree terms in writing (what, price, when). The buyer's payment is held, and it moves to the seller only when the buyer confirms delivery. If they disagree, a dispute process decides the outcome.

Today's app was built for students hiring academic consultants. It is being generalised to everyday commerce: online shopping, housing and local services.

## Code layout

| Path | What lives there |
|---|---|
| `app/` | Next.js App Router pages and API routes (`app/api/`) |
| `app/admin/` | Operations console pages |
| `components/` | Shared UI (`components/ui/` for primitives) |
| `hooks/`, `lib/` | Client hooks; Supabase clients, payments and email helpers |
| `e2e/` | Playwright smoke tests |
| `scripts/` | Repo tooling, including the migration guard |
| `.github/` | CI, templates and code owners |

Stack: Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS 4, Supabase (Postgres, auth, storage), Flutterwave, Brevo. This Next.js version has breaking changes; read `node_modules/next/dist/docs/` before relying on older patterns.

## How work flows

1. Tasks come from the contributors portal (<https://contribute.nextrium.org/>). GitHub issues are for findings only.
2. Branch from `develop`, open a pull request into `develop`.
3. CI must pass and a code owner must approve. Merging to `develop` deploys to preview.
4. A release is a pull request from `develop` to `main`, merged with a merge commit. Merging to `main` deploys to production after the owner approves the deploy.

## Standards

**Security**
- Every API route and server action verifies who is calling, on the server, on every request. Hiding a button is not access control.
- Every write checks the specific permission, not just "signed in". Unknown roles and errors deny.
- Business state (deal status, price, payment) changes only on the server.
- Never trust IDs or amounts sent by the browser.

**Data**
- Collect the minimum. No personal data or secrets in logs.
- No database SQL in the repo. Propose schema changes in the pull request description; a maintainer applies them.

**Secrets**
- Never in code, tests, issues, screenshots or chat. Use `.env.local` locally (copy `.env.example`).

**Cost**
- Prefer free tiers and work done on the user's device. Any new paid service needs a reason in the pull request.

**Code and UI**
- TypeScript strictly typed; avoid `any` in new code.
- Mobile first. Check every UI change at phone width.
- Short, plain copy written from the user's side.

## Checks

`npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, and `node --test scripts/migration-guard.test.mjs`. CI also runs a secret scan over the full history.

## Definition of done

- The linked task's acceptance criteria are met.
- All checks pass.
- UI changes were checked in a real browser, with a screenshot in the pull request.
- New permissions or data paths have a negative test (the wrong user is refused).
- `CHANGELOG.md` has a line under **Unreleased**.

## Where things live

| What | Where |
|---|---|
| Tasks | Contributors portal |
| Bugs and docs findings | GitHub issue form |
| Security reports | Private vulnerability reporting ([SECURITY.md](../SECURITY.md)) |
| Release history | [CHANGELOG.md](../CHANGELOG.md) |
