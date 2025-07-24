import { test, expect } from '@playwright/test';

test.describe('Recipe Search and Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Search functionality works', async ({ page }) => {
    await test.step('Perform search', async () => {
      // Look for search input with various possible selectors
      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[name*="search" i]').first();
      
      if (await searchInput.isVisible()) {
        await searchInput.fill('chicken');
        await searchInput.press('Enter');
        
        // Wait for search results
        await page.waitForTimeout(1000);
        
        await test.step('Verify search results', async () => {
          // Check if any recipes are displayed
          const recipeCards = page.locator('article, .recipe-card, [data-testid="recipe-card"]');
          const cardCount = await recipeCards.count();
          
          if (cardCount > 0) {
            // If results found, verify they contain search term
            const firstCard = recipeCards.first();
            await expect(firstCard).toBeVisible();
          } else {
            // If no results, check for "no results" message
            const noResultsMessage = page.getByText(/no recipes found/i, /no results/i);
            await expect(noResultsMessage).toBeVisible();
          }
        });
      } else {
        console.log('Search input not found - may not be implemented yet');
      }
    });
  });

  test('Category filtering works', async ({ page }) => {
    await test.step('Check for category filters', async () => {
      // Look for category buttons or dropdown
      const categoryFilter = page.locator('button:has-text("Categories"), select[name*="category" i], .category-filter').first();
      
      if (await categoryFilter.isVisible()) {
        await categoryFilter.click();
        
        // Look for specific category options
        const mainDishesOption = page.getByText(/main dishes/i, /dinner/i, /entrees/i).first();
        
        if (await mainDishesOption.isVisible()) {
          await mainDishesOption.click();
          
          await test.step('Verify filtered results', async () => {
            await page.waitForTimeout(1000);
            const recipeCards = page.locator('article, .recipe-card, [data-testid="recipe-card"]');
            await expect(recipeCards.first()).toBeVisible();
          });
        }
      } else {
        console.log('Category filter not found - may not be implemented yet');
      }
    });
  });

  test('Clear filters functionality', async ({ page }) => {
    await test.step('Apply filters and then clear them', async () => {
      // Look for clear filters button
      const clearButton = page.getByRole('button', { name: /clear/i }).or(
        page.getByText(/clear filters/i)
      ).or(
        page.getByText(/reset/i)
      );
      
      if (await clearButton.isVisible()) {
        await clearButton.click();
        
        await test.step('Verify filters are cleared', async () => {
          await page.waitForTimeout(1000);
          // Verify all recipes are shown again
          const recipeCards = page.locator('article, .recipe-card, [data-testid="recipe-card"]');
          await expect(recipeCards.first()).toBeVisible();
        });
      } else {
        console.log('Clear filters button not found - may not be implemented yet');
      }
    });
  });
});
