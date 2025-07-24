import { test, expect } from '@playwright/test';

test.describe('Home Page - Recipe Listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home page loads with recipe grid', async ({ page }) => {
    await test.step('Verify page title and main heading', async () => {
      await expect(page).toHaveTitle(/Cassia Recipes/);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    await test.step('Verify recipe grid is displayed', async () => {
      // Wait for recipes to load from Sanity
      await page.waitForLoadState('networkidle');
      
      // Check if recipe cards are present
      const recipeCards = page.locator('[data-testid="recipe-card"], .recipe-card, article').first();
      await expect(recipeCards).toBeVisible();
    });

    await test.step('Verify navigation header', async () => {
      await expect(page.getByRole('navigation')).toBeVisible();
      await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    });
  });

  test('Recipe cards display essential information', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    await test.step('Verify first recipe card content', async () => {
      const firstCard = page.locator('article, .recipe-card, [data-testid="recipe-card"]').first();
      await expect(firstCard).toBeVisible();
      
      // Check for recipe title
      await expect(firstCard.getByRole('heading')).toBeVisible();
      
      // Check for recipe image
      await expect(firstCard.locator('img')).toBeVisible();
    });
  });

  test('Navigation links work correctly', async ({ page }) => {
    await test.step('Navigate to Categories page', async () => {
      const categoriesLink = page.getByRole('link', { name: /categories/i });
      if (await categoriesLink.isVisible()) {
        await categoriesLink.click();
        await expect(page).toHaveURL(/categories/);
      }
    });

    await test.step('Navigate back to home', async () => {
      await page.getByRole('link', { name: /home/i }).click();
      await expect(page).toHaveURL('/');
    });
  });
});
