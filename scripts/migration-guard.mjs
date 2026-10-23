// Migration guard for a Supabase project.
// Nextrium's protocol keeps Supabase SQL out of the repo: schema changes are reviewed
// and applied by the owner, never shipped through a merge. This guard fails if a change
// adds or edits SQL or migration files. Replace it with a frozen-migration guard if the
// project moves to committed migrations.
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const BLOCKED = [
  { test: (p) => /\.sql$/i.test(p), reason: 'SQL files are not committed (protocol, section 5)' },
  { test: (p) => /(^|\/)supabase\//i.test(p), reason: 'Supabase project files are not committed' },
  { test: (p) => /(^|\/)migrations?\//i.test(p), reason: 'migration files are not committed while the project uses Supabase' },
];

/** Returns one violation per path that matches a blocked pattern. */
export function findViolations(paths) {
  const out = [];
  for (const path of paths) {
    const normalized = path.replace(/\\/g, '/');
    const rule = BLOCKED.find((r) => r.test(normalized));
    if (rule) out.push({ path: normalized, reason: rule.reason });
  }
  return out;
}

function changedPaths(base) {
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
  const hasBase = base && !/^0+$/.test(base) && (() => {
    try { git('cat-file', '-e', `${base}^{commit}`); return true; } catch { return false; }
  })();
  // Compare the base against the working tree, so local runs catch uncommitted edits too.
  const listed = hasBase
    ? git('diff', '--name-only', '--diff-filter=ACMR', base)
    : git('ls-files');
  const untracked = git('ls-files', '--others', '--exclude-standard');
  return [...listed.split('\n'), ...untracked.split('\n')].filter(Boolean);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const i = process.argv.indexOf('--base');
  const base = i > -1 ? process.argv[i + 1] : '';
  const violations = findViolations(changedPaths(base));
  if (violations.length) {
    for (const v of violations) console.error(`migration-guard: ${v.path}: ${v.reason}`);
    process.exit(1);
  }
  console.log('migration-guard: no SQL or migration files changed.');
}
