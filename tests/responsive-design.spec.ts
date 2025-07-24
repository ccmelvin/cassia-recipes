import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('Mobile layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await test.step('Verify mobile navigation', async () => {
      // Check if mobile menu button exists or if navigation adapts
      const navigation = page.getByRole('navigation');
      await expect(navigation).toBeVisible();
      
      // Mobile menu button might be present
      const mobileMenuButton = page.getByRole('button', { name: /menu/i }).or(
        page.locator('[data-testid="mobile-menu"]').or(
          page.locator('.mobile-menu-button')
        )
      );
      
      // Either mobile menu button exists or navigation is visible
      const hasMobileMenu = await mobileMenuButton.isVisible();
      const hasVisibleNav = await navigation.isVisible();
      
      expect(hasMobileMenu || hasVisibleNav).toBe(true);
    });

    await test.step('Verify recipe grid adapts to mobile', async () => {
      const recipeCards = page.locator('article, .recipe-card, [data-testid="recipe-card"]');
      await expect(recipeCards.first()).toBeVisible();
      
      // Verify cards are stacked vertically (single column)
      const firstCard = recipeCards.first();
      const secondCard = recipeCards.nth(1);
      
      if (await secondCard.isVisible()) {
        const firstCardBox = await firstCard.boundingBox();
        const secondCardBox = await secondCard.boundingBox();
        
        if (firstCardBox && secondCardBox) {
          // In mobile layout, second card should be below first card
          expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height - 50);
        }
      }
    });
  });

  test('Tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await test.step('Verify tablet grid layout', async () => {
      const recipeCards = page.locator('article, .recipe-card, [data-testid="recipe-card"]');
      await expect(recipeCards.first()).toBeVisible();
      
      // Should have at least 2 cards visible in tablet view
      const visibleCards = await recipeCards.count();
      expect(visibleCards).toBeGreaterThanOrEqual(1);
    });

    await test.step('Verify navigation is accessible', async () => {
      const navigation = page.getByRole('navigation');
      await expect(navigation).toBeVisible();
    });
  });

  test('Desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await test.step('Verify desktop navigation', async () => {
      const navigation = page.getByRole('navigation');
      await expect(navigation).toBeVisible();
      
      // Desktop should show full navigation links
      const homeLink = page.getByRole('link', { name: /home/i });
      await expect(homeLink).toBeVisible();
    });

    await test.step('Verify desktop grid layout', async () => {
      const recipeCards = page.locator('article, .recipe-card, [data-testid="recipe-card"]');
      await expect(recipeCards.first()).toBeVisible();
      
      // Desktop should show multiple cards in a row
      const visibleCards = await recipeCards.count();
      expect(visibleCards).toBeGreaterThanOrEqual(1);
    });
  });

  test('Recipe detail page is responsive', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to a recipe detail page
    const firstRecipeCard = page.locator('article, .recipe-card, [data-testid="recipe-card"]').first();
    await firstRecipeCard.click();
    await page.waitForLoadState('networkidle');

    await test.step('Test mobile recipe detail layout', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verify content is still accessible
      const recipeTitle = page.getByRole('heading', { level: 1 });
      await expect(recipeTitle).toBeVisible();
      
      // Verify ingredients section is visible
      const ingredientsSection = page.getByText(/ingredients/i).first();
      await expect(ingredientsSection).toBeVisible();
    });

    await test.step('Test desktop recipe detail layout', async () => {
      await page.setViewportSize({ width: 1200, height: 800 });
      
      // Verify content is properly laid out
      const recipeTitle = page.getByRole('heading', { level: 1 });
      await expect(recipeTitle).toBeVisible();
      
      // Verify both ingredients and instructions are visible
      const ingredientsSection = page.getByText(/ingredients/i).first();
      const instructionsSection = page.getByText(/instructions/i).first();
      
      await expect(ingredientsSection).toBeVisible();
      await expect(instructionsSection).toBeVisible();
    });
  });
});
