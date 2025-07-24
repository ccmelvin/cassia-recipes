---
description: 'Playwright test generation instructions for Cassia Recipes'
applyTo: '**'
---

# Test Writing Guidelines - Cassia Recipes

## Test Writing Guidelines

### Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.

### Test Structure
- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to the home page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.

### File Organization
- **Location**: Store all test files in the `tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `recipe-search.spec.ts`, `recipe-detail.spec.ts`).
- **Scope**: Aim for one test file per major application feature or page.

### Assertion Best Practices
- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of components. This provides a comprehensive and accessible snapshot.
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after navigation actions.

## Recipe App Specific Guidelines

### Recipe Listing Tests
- Test recipe card display with proper image, title, and metadata
- Verify category filtering functionality
- Test search functionality across recipe titles, ingredients, and tags
- Validate responsive grid layout on different screen sizes

### Recipe Detail Tests
- Test dynamic route navigation (`/recipe/[slug]`)
- Verify serving size adjustment functionality
- Test print functionality and print-specific styling
- Validate ingredient and instruction display
- Test social sharing functionality

### Content Management Tests
- Test Sanity CMS integration and data fetching
- Verify real-time content updates
- Test image optimization and display

### Interactive Features Tests
- Test filter combinations and clearing filters
- Verify sorting functionality (Recent, Alphabetical, Cooking Time)
- Test favorites functionality (UI interactions)
- Validate responsive design across breakpoints

## Example Test Structures

### Recipe Search and Filtering
```typescript
import { test, expect } from '@playwright/test';

test.describe('Recipe Search and Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Search recipes by ingredient', async ({ page }) => {
    await test.step('Perform ingredient search', async () => {
      const searchInput = page.getByRole('searchbox', { name: /search recipes/i });
      await searchInput.fill('chicken');
      await searchInput.press('Enter');
    });

    await test.step('Verify search results contain ingredient', async () => {
      const recipeCards = page.getByTestId('recipe-card');
      await expect(recipeCards).toHaveCount({ min: 1 });
      
      // Verify at least one recipe contains the searched ingredient
      const firstCard = recipeCards.first();
      await expect(firstCard).toContainText('chicken', { ignoreCase: true });
    });
  });

  test('Filter recipes by category', async ({ page }) => {
    await test.step('Select category filter', async () => {
      await page.getByRole('button', { name: 'Categories' }).click();
      await page.getByRole('button', { name: 'Main Dishes' }).click();
    });

    await test.step('Verify filtered results', async () => {
      const recipeCards = page.getByTestId('recipe-card');
      await expect(recipeCards).toHaveCount({ min: 1 });
      
      // Verify category badge is displayed
      await expect(page.getByText('Main Dishes')).toBeVisible();
    });
  });

  test('Clear all filters', async ({ page }) => {
    await test.step('Apply filters', async () => {
      await page.getByRole('button', { name: 'Categories' }).click();
      await page.getByRole('button', { name: 'Desserts' }).click();
      
      const searchInput = page.getByRole('searchbox', { name: /search recipes/i });
      await searchInput.fill('chocolate');
    });

    await test.step('Clear filters and verify reset', async () => {
      await page.getByRole('button', { name: 'Clear Filters' }).click();
      
      const searchInput = page.getByRole('searchbox', { name: /search recipes/i });
      await expect(searchInput).toHaveValue('');
      
      // Verify all recipes are shown again
      const recipeCards = page.getByTestId('recipe-card');
      await expect(recipeCards).toHaveCount({ min: 5 });
    });
  });
});
```

### Recipe Detail Page
```typescript
import { test, expect } from '@playwright/test';

test.describe('Recipe Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Navigate to recipe detail and verify content', async ({ page }) => {
    await test.step('Navigate to first recipe', async () => {
      const firstRecipeCard = page.getByTestId('recipe-card').first();
      const recipeTitle = await firstRecipeCard.getByRole('heading').textContent();
      await firstRecipeCard.click();
      
      // Verify URL contains recipe slug
      await expect(page).toHaveURL(/\/recipe\/[^\/]+$/);
      
      // Verify recipe title matches
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(recipeTitle);
    });

    await test.step('Verify recipe content structure', async () => {
      // Verify essential recipe components are present
      await expect(page.getByText(/prep time/i)).toBeVisible();
      await expect(page.getByText(/cook time/i)).toBeVisible();
      await expect(page.getByText(/servings/i)).toBeVisible();
      await expect(page.getByRole('heading', { name: /ingredients/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /instructions/i })).toBeVisible();
    });
  });

  test('Adjust serving size', async ({ page }) => {
    await test.step('Navigate to recipe with adjustable servings', async () => {
      await page.getByTestId('recipe-card').first().click();
    });

    await test.step('Increase serving size', async () => {
      const increaseButton = page.getByRole('button', { name: '+' });
      const servingDisplay = page.getByTestId('serving-count');
      
      const initialServings = await servingDisplay.textContent();
      await increaseButton.click();
      
      // Verify serving count increased
      await expect(servingDisplay).not.toHaveText(initialServings);
    });

    await test.step('Decrease serving size', async () => {
      const decreaseButton = page.getByRole('button', { name: '-' });
      const servingDisplay = page.getByTestId('serving-count');
      
      const currentServings = await servingDisplay.textContent();
      await decreaseButton.click();
      
      // Verify serving count decreased
      await expect(servingDisplay).not.toHaveText(currentServings);
    });
  });

  test('Print recipe functionality', async ({ page }) => {
    await test.step('Navigate to recipe', async () => {
      await page.getByTestId('recipe-card').first().click();
    });

    await test.step('Trigger print dialog', async () => {
      // Listen for print dialog
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('beforeprint');
        await dialog.accept();
      });

      await page.getByRole('button', { name: /print/i }).click();
    });
  });
});
```

### Responsive Design Tests
```typescript
import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('Mobile layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    await test.step('Verify mobile navigation', async () => {
      // Check if mobile menu button is visible
      const mobileMenuButton = page.getByRole('button', { name: /menu/i });
      await expect(mobileMenuButton).toBeVisible();
    });

    await test.step('Verify recipe grid adapts to mobile', async () => {
      const recipeGrid = page.getByTestId('recipe-grid');
      await expect(recipeGrid).toBeVisible();
      
      // Verify single column layout on mobile
      const recipeCards = page.getByTestId('recipe-card');
      await expect(recipeCards.first()).toBeVisible();
    });
  });

  test('Tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');

    await test.step('Verify tablet grid layout', async () => {
      const recipeCards = page.getByTestId('recipe-card');
      await expect(recipeCards).toHaveCount({ min: 2 });
    });
  });

  test('Desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('http://localhost:3000');

    await test.step('Verify desktop navigation', async () => {
      // Verify full navigation is visible
      await expect(page.getByRole('navigation')).toBeVisible();
      await expect(page.getByRole('link', { name: /categories/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    });
  });
});
```

## Test Execution Strategy

1. **Initial Setup**: Ensure development server is running on `http://localhost:3000`
2. **Content Verification**: Verify Sanity CMS has sample recipe data
3. **Initial Run**: Execute tests with `npx playwright test --project=chromium`
4. **Debug Failures**: Analyze test failures and identify root causes
5. **Cross-browser Testing**: Run tests across different browsers
6. **Mobile Testing**: Validate responsive behavior on mobile devices
7. **Performance**: Monitor test execution time and optimize slow tests
8. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators are accessible and specific, avoiding strict mode violations
- [ ] Tests cover core recipe functionality (search, filter, detail view)
- [ ] Interactive features are properly tested (serving adjustment, print)
- [ ] Responsive design is validated across breakpoints
- [ ] Tests are grouped logically by feature area
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented
- [ ] Tests handle dynamic content from Sanity CMS appropriately
- [ ] Print functionality and styling are validated
- [ ] Navigation between pages works correctly

## Recipe App Test Categories

### Core Functionality
- Recipe listing and display
- Search and filtering
- Category navigation
- Recipe detail pages

### Interactive Features
- Serving size adjustment
- Print functionality
- Social sharing
- Favorites (UI interactions)

### Content Management
- Sanity CMS integration
- Dynamic content loading
- Image optimization

### User Experience
- Responsive design
- Navigation flow
- Performance
- Accessibility compliance

### Data Integrity
- Recipe data structure
- Ingredient calculations
- Time displays
- Category associations
