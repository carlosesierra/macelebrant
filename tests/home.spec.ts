import { test, expect } from '@playwright/test'

test('homepage renders key sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('nav')).toBeVisible()
  await expect(page.locator('#home')).toBeVisible()
  await expect(page.locator('#testimonials')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
})
