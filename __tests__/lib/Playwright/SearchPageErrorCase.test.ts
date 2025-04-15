import { test, expect, type Page } from '@playwright/test';

const BLUESKY_WEB_URL = 'https://bsky.app';

const BSKY_EMAIL = process.env.BS_USERNAME;
const BSKY_PASS = process.env.BS_PASSWORD;

// Login function
async function login(page: Page): Promise<void> {

  // Navigate to the login page
  await page.goto(`${BLUESKY_WEB_URL}`);

  // Click the sign-in button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on username field
  await page.getByTestId('loginUsernameInput').click();

  // Enter username
  await page.getByTestId('loginUsernameInput').fill(`${BSKY_EMAIL}`);

  // Click on password field
  await page.getByTestId('loginPasswordInput').click();

  // Enter pswd
  await page.getByTestId('loginPasswordInput').fill(`${BSKY_PASS}`);

  // Click on next button to sign-in
  await page.getByTestId('loginNextButton').click();

}

// Setup functionality
test.beforeEach(async ({ page }) => {

    // Call login function
    await login(page);

});


// Search for empty term
test('Search for empty term', {tag: '@search'}, async ({ page }) => {

    // Navigate to search bar
    await page.getByRole('search', { name: 'Search' }).click();

    // Stimulate pressing Enter key on keyboard
    await page.getByRole('search', { name: 'Search' }).press('Enter');

    // Get Discovery text
    let discoveryTabExt = await page.getByTestId('homeScreenFeedTabs-Discover').textContent();

    // Get Following text
    let followTabExt = await page.getByTestId('homeScreenFeedTabs-Following').textContent();

    // Get current url
    let currentUrl: string = page.url();

    // Assertion
    // Verify empty search remains on search page where elements: Discover, Following are seen
    await expect(discoveryTabExt).toContain('Discover');
    await expect(followTabExt).toContain('Following');

    // Verify current url searched matches default home url
    await expect(currentUrl).toContain('https://bsky.app');
        
});

