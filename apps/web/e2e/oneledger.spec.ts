/**
 * E2E Tests for OneLedger Service Page
 * 
 * TODO: Setup Playwright before running these tests
 * 
 * Run: npm install -D @playwright/test
 * Add to package.json: "test:e2e": "playwright test"
 * Create playwright.config.ts
 */

import { test, expect } from "@playwright/test";

test.describe("OneLedger Service Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services/oneledger");
  });

  test("Path A: Hero scan → recommend → open module → CTA → submit lead", async ({ page }) => {
    // 1. Complete scan
    await page.click('button:has-text("Question 1")');
    await page.click('button:has-text("Question 2")');
    
    // 2. Verify scan result
    await expect(page.locator('text=/Ledger Risk Score/')).toBeVisible();
    
    // 3. Click recommended module
    const moduleButton = page.locator('button:has-text("Jump")').first();
    if (await moduleButton.isVisible()) {
      await moduleButton.click();
    }
    
    // 4. Open module detail
    const detailButton = page.locator('button:has-text("Chi tiết")').first();
    if (await detailButton.isVisible()) {
      await detailButton.click();
    }
    
    // 5. Open CTA dialog
    await page.click('button:has-text("Đặt lịch khảo sát")');
    
    // 6. Fill form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="company"]', "Test Company");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0123456789");
    
    // 7. Submit (mock API)
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, id: "test-lead-id" }),
      });
    });
    
    await page.click('button[type="submit"]');
    
    // 8. Verify success
    await expect(page.locator('text=/Chúng tôi đã nhận được thông tin/')).toBeVisible();
  });

  test("Path B: Big CTA directly → submit lead", async ({ page }) => {
    // 1. Scroll to Big CTA
    await page.locator("#cta").scrollIntoViewIfNeeded();
    
    // 2. Fill form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="company"]', "Test Company");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0123456789");
    
    // 3. Mock API
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, id: "test-lead-id" }),
      });
    });
    
    // 4. Submit
    await page.click('button[type="submit"]');
    
    // 5. Verify success
    await expect(page.locator('text=/Chúng tôi đã nhận được thông tin/')).toBeVisible();
  });

  test("Path C: duplicate lead response → UI success state", async ({ page }) => {
    // 1. Fill form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="company"]', "Test Company");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0123456789");
    
    // 2. Mock duplicate response
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          id: "test-lead-id",
          duplicateOf: "existing-lead-id",
          code: "DUPLICATE_LEAD",
        }),
      });
    });
    
    // 3. Submit
    await page.click('button[type="submit"]');
    
    // 4. Verify duplicate message
    await expect(page.locator('text=/Chúng tôi đã nhận thông tin trước đó/')).toBeVisible();
    
    // 5. Verify update notes option
    await expect(page.locator('button:has-text("Cập nhật ghi chú")')).toBeVisible();
  });
});

