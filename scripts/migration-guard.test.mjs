import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findViolations } from './migration-guard.mjs';

test('allows ordinary source files', () => {
  assert.deepEqual(findViolations(['app/page.tsx', 'lib/email.ts', 'README.md']), []);
});

test('blocks SQL files anywhere', () => {
  assert.equal(findViolations(['db/schema.sql', 'notes/Fix.SQL']).length, 2);
});

test('blocks Supabase and migration folders', () => {
  const v = findViolations(['supabase/config.toml', 'drizzle/migrations/0001_init.ts', 'migration/x.js']);
  assert.equal(v.length, 3);
});

test('normalises Windows paths', () => {
  assert.equal(findViolations(['supabase\\seed.ts']).length, 1);
});

test('does not match lookalike names', () => {
  assert.deepEqual(findViolations(['app/migrations-guide.md', 'lib/sqlish.ts']), []);
});
