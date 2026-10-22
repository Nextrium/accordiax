# Contributing to Accordiax

Thanks for helping. Accordiax protects everyday deals: a buyer and a seller agree terms, and money moves only when the deal is done.

## Before you start

- **Pick a task from the contributors portal:** <https://contribute.nextrium.org/>. Tasks there have a scope and acceptance criteria. Please don't start large work without one.
- **Found a bug or a docs problem?** Open a finding with the issue form.
- **Found a security problem?** Don't open an issue. Follow [SECURITY.md](SECURITY.md).
- Read the [handbook](docs/HANDBOOK.md) for how the code is laid out and the standards we hold.

## How to contribute

1. Fork the repo and clone your fork.
2. Branch from `develop`: `git switch -c fix/short-name origin/develop`.
3. Make your change. Keep each pull request to one task.
4. Run the checks below. All must pass.
5. Open a pull request **into `develop`** (not `main`). Fill in the template and link the portal task or finding.

`main` is the production branch. It only receives release pull requests from `develop`. A pull request into `main` from anything else is closed.

## Checks to run before you push

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium   # first time only
npm run test:e2e
node --test scripts/migration-guard.test.mjs
```

Copy `.env.example` to `.env.local` first. The fake values in it are enough to build and run the tests.

CI runs the same checks plus a secret scan. Lint uses a baseline (`eslint-suppressions.json`) for older code: new code must not add violations, and fixing an old one is welcome.

## What we review for

- It solves the linked task and nothing else.
- Every permission is checked on the server for every request.
- No secrets, real personal data or production URLs in code, tests or screenshots.
- No database SQL in the repo. Schema changes are proposed in the pull request description and applied by a maintainer.
- UI changes include a screenshot.

## What gets a pull request closed

- No linked task or finding, or several unrelated changes in one.
- Failing checks left unfixed.
- Secrets, real user data, or attempts to change CI, deploy config or `CODEOWNERS` without a task that asks for it.

## Review and merge

Every pull request needs green checks and an approval from a code owner. Maintainers merge into `develop`, which deploys to preview. Releases go from `develop` to `main`.

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE).
