<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Rules for AI agents in this repo

Read [docs/HANDBOOK.md](docs/HANDBOOK.md) first. It is the source of truth for layout, standards and the definition of done.

- **Branches:** branch from `develop` and open pull requests into `develop`. Never target `main`.
- **Commits:** short messages, one task per pull request, no AI signature or co-author lines.
- **Secrets:** never print, commit or paste secret values. Use `.env.local` copied from `.env.example`.
- **Database:** no SQL in the repo and no destructive statements against any live database. Live reads are read-only and announced first.
- **Access control:** every route and server action verifies the caller and the specific permission on the server.
- **CI and deploy config** (`.github/`, `vercel.json`, the migration guard) change only when a task asks for it.
- **Done means:** lint, typecheck, build and e2e pass; UI changes checked in a browser; say plainly what you couldn't verify.
