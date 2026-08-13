import { test, expect } from '@playwright/test';

test.describe('job search', () => {
  // This is the shortest release-confidence check: can a user open the product
  // and receive the expected default results?
  test('@smoke loads the job explorer and default results', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('QualityWorks Job Explorer');
    await expect(page.getByRole('heading', { name: 'QualityWorks Job Explorer' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('3 jobs found');
  });

  test('filters by keyword and remote arrangement', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search jobs').fill('SQL');
    await page.getByLabel('Work arrangement').selectOption('remote');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByRole('status')).toHaveText('1 job found');
    await expect(page.getByRole('heading', { name: 'Software Test Engineer' })).toBeVisible();
    await expect(page.getByText('Onsite Support Technician')).toHaveCount(0);
  });

  test('shows a clear empty state for no matches', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search jobs').fill('COBOL');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('status')).toHaveText('0 jobs found');
    await expect(page.getByRole('region', { name: 'Job results' })).toBeEmpty();
  });
});
