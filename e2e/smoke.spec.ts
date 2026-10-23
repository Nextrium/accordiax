import { test, expect } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.ok()).toBeTruthy();
  await expect(page.locator('h1').first()).toBeVisible();
});

test('how it works page loads', async ({ page }) => {
  const res = await page.goto('/how-it-works');
  expect(res?.ok()).toBeTruthy();
  await expect(page.locator('h1').first()).toBeVisible();
});

test('login page offers an email sign-in link', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  await expect(page.getByPlaceholder('your@email.com')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send sign-in link' })).toBeVisible();
});

for (const path of ['/student-dashboard', '/consultant-dashboard']) {
  test(`signed-out visitor to ${path} is sent to login`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });
}
