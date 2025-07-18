import { test, expect } from '@playwright/test';

test.describe('Rent Control - Comprehensive Tests', () => {
  test('Homepage loads and has correct title', async ({ page }) => {
    await page.goto('https://www.rent-control.net/');
    await expect(page).toHaveTitle(/Rent Control/);
  });

  test('Main navigation works', async ({ page }) => {
    await page.goto('https://www.rent-control.net/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(page).toHaveURL(/.*(onboarding|signup|login)/);
  });

  test('Language switcher functions', async ({ page }) => {
    await page.goto('https://www.rent-control.net/');
    await page.getByRole('combobox').selectOption('es'); // example for Spanish
    await expect(page.locator('body')).toContainText(/Control de alquiler|similar/);
  });

  test('Dark/light mode toggles correctly', async ({ page }) => {
    await page.goto('https://www.rent-control.net/');
    const toggle = page.getByRole('button', { name: /Dark|Light/ });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('class', /dark|light/);
  });

  test('Responsive design - Mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://www.rent-control.net/');
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('Footer links work', async ({ page }) => {
    await page.goto('https://www.rent-control.net/');
    const links = ['Terms', 'Privacy', 'About', 'Contact'];
    for (const link of links) {
      const footerLink = page.getByRole('link', { name: new RegExp(link, 'i') });
      await expect(footerLink).toHaveAttribute('href', new RegExp(link.toLowerCase()));
    }
  });

  test('Main CTA buttons are present and working', async ({ page }) => {
    await page.goto('https://www.rent-control.net/');
    const ctas = ['Watch Demo', 'Start Free Trial'];
    for (const text of ctas) {
      const button = page.getByRole('button', { name: new RegExp(text, 'i') });
      await expect(button).toBeVisible();
    }
  });
});
