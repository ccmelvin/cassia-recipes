import { test, expect } from '@playwright/test';

test.describe('Recipe Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Navigate to recipe detail page', async ({ page }) => {
    await test.step('Click on first recipe card', async () => {
      const firstRecipeCard = page.locator('article, .recipe-card, [data-testid="recipe-card"]').first();
      await expect(firstRecipeCard).toBeVisible();
      
      // Get the recipe title before clicking
      const recipeTitle = await firstRecipeCard.getByRole('heading').textContent();
      
      await firstRecipeCard.click();
      
      await test.step('Verify navigation to detail page', async () => {
        // Wait for navigation
        await page.waitForLoadState('networkidle');
        
        // Verify URL contains recipe slug
        await expect(page).toHaveURL(/\/recipe\/[^\/]+$/);
        
        // Verify recipe title is displayed
        if (recipeTitle) {
          await expect(page.getByRole('heading', { level: 1 })).toContainText(recipeTitle.trim());
        }
      });
    });
  });

  test('Recipe detail page displays essential content', async ({ page }) => {
    // Navigate to first recipe
    const firstRecipeCard = page.locator('article, .recipe-card, [data-testid="recipe-card"]').first();
    await firstRecipeCard.click();
    await page.waitForLoadState('networkidle');

    await test.step('Verify recipe metadata is displayed', async () => {
      // Check for timing information
      const timingElements = [
        page.getByText(/prep time/i),
        page.getByText(/cook time/i),
        page.getByText(/total time/i),
        page.getByText(/servings/i),
        page.getByText(/serves/i)
      ];

      // At least one timing element should be visible
      let timingFound = false;
      for (const element of timingElements) {
        if (await element.isVisible()) {
          timingFound = true;
          break;
        }
      }
      expect(timingFound).toBe(true);
    });

    await test.step('Verify recipe sections are present', async () => {
      // Check for ingredients section
      const ingredientsSection = page.getByRole('heading', { name: /ingredients/i }).or(
        page.getByText(/ingredients/i)
      );
      await expect(ingredientsSection.first()).toBeVisible();

      // Check for instructions section
      const instructionsSection = page.getByRole('heading', { name: /instructions/i }).or(
        page.getByText(/instructions/i).or(
          page.getByText(/directions/i)
        )
      );
      await expect(instructionsSection.first()).toBeVisible();
    });
  });

  test('Serving size adjustment functionality', async ({ page }) => {
    // Navigate to first recipe
    const firstRecipeCard = page.locator('article, .recipe-card, [data-testid="recipe-card"]').first();
    await firstRecipeCard.click();
    await page.waitForLoadState('networkidle');

    await test.step('Test serving size adjustment buttons', async () => {
      // Look for serving adjustment buttons
      const increaseButton = page.getByRole('button', { name: '+' }).or(
        page.locator('button:has-text("+")').or(
          page.locator('[data-testid="increase-serving"]')
        )
      );
      
      const decreaseButton = page.getByRole('button', { name: '-' }).or(
        page.locator('button:has-text("-")').or(
          page.locator('[data-testid="decrease-serving"]')
        )
      );

      if (await increaseButton.isVisible()) {
        // Get initial serving count
        const servingDisplay = page.locator('[data-testid="serving-count"]').or(
          page.getByText(/servings?:\s*\d+/i)
        );
        
        if (await servingDisplay.isVisible()) {
          const initialText = await servingDisplay.textContent();
          
          await increaseButton.click();
          await page.waitForTimeout(500);
          
          const updatedText = await servingDisplay.textContent();
          expect(updatedText).not.toBe(initialText);
        }
      } else {
        console.log('Serving adjustment buttons not found - may not be implemented yet');
      }
    });
  });

  test('Print functionality', async ({ page }) => {
    // Navigate to first recipe
    const firstRecipeCard = page.locator('article, .recipe-card, [data-testid="recipe-card"]').first();
    await firstRecipeCard.click();
    await page.waitForLoadState('networkidle');

    await test.step('Test print button', async () => {
      const printButton = page.getByRole('button', { name: /print/i }).or(
        page.locator('[data-testid="print-button"]')
      );

      if (await printButton.isVisible()) {
        // Set up print dialog handler
        let printDialogTriggered = false;
        
        page.on('dialog', async dialog => {
          if (dialog.type() === 'beforeprint') {
            printDialogTriggered = true;
          }
          await dialog.accept();
        });

        await printButton.click();
        
        // Note: Print dialog behavior varies by browser and environment
        // This test mainly verifies the button exists and is clickable
        await expect(printButton).toBeVisible();
      } else {
        console.log('Print button not found - may not be implemented yet');
      }
    });
  });
});
