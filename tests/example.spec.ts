import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://flashusdts.shop/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/FLASH USDTS SHOP/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://flashusdts.shop/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
