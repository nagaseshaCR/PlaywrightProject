import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  await expect(page.getByRole('banner')).toContainText('GREENKART');
//   await expect(page.getByRole('img', { name: 'Brocolli - 1 Kg' })).toBeVisible();
  await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
//   await expect(page.getByRole('img')).toBeVisible();
  await expect(page.getByRole('cell').filter({ hasText: /^$/ })).toBeVisible();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('combobox').selectOption('India');
  await expect(page.getByRole('checkbox')).toBeVisible();
  await expect(page.locator('label')).toContainText('Choose Country');
  await page.getByRole('button', { name: 'Proceed' }).click();
  await expect(page.locator('b')).toContainText('Please accept Terms & Conditions - Required');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
//   await expect(page.locator('#root')).toContainText('Thank you, your order has been placed successfully You\'ll be redirected to Home page shortly!!');
});