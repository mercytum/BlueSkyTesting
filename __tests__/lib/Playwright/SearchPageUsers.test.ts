import { test, expect, type Page } from '@playwright/test';

const BLUESKY_WEB_URL = 'https://bsky.app';

//const BSKY_EMAIL = process.env.CIS565_EMAIL;
//const BSKY_PASS = process.env.CIS565_PASSWORD;
const BSKY_EMAIL = "cis565bskytests@gmail.com";
const BSKY_PASS = "CIS565TestGroup"; 

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


// Search for user profile using username handle
test('Search for user using username handle', {tag: '@search'}, async ({ page }) => {

    // Search term
    const userHandle = 'mcuban.bsky.social';

    // Navigate to search bar
    await page.getByRole('search', { name: 'Search' }).click();

    // Type userHandle
    await page.getByRole('search', { name: 'Search' }).fill(userHandle);

    // Stimulate pressing Enter key on keyboard
    await page.getByRole('search', { name: 'Search' }).press('Enter');

    // Click on the "People" tab for search for persons
    await page.getByTestId('undefined-selector-2').getByText('People').click();

    // Click on people based on user handle
    await page.getByRole('link', { name: userHandle }).click();

    // Get current url
    let currenUrl: string = page.url();

    // Assertion
    // Verify currect profile searched matches based on url
    await expect(currenUrl).toContain(`https://bsky.app/profile/${userHandle}`);
        
});


// Search for user profile using first and last name
test('Search for user using first and last name', {tag: '@search'}, async ({ page }) => {

    // Search term
    const firstname = 'Barack';
    const lastname = 'Obama';
    const fullname = firstname + lastname;
    const handlename = fullname + '.bsky.social';

    // Navigate to search bar
    await page.getByRole('search', { name: 'Search' }).click();

    // Type fullname
    await page.getByRole('search', { name: 'Search' }).fill(fullname);

    // Stimulate pressing Enter key on keyboard
    await page.getByRole('search', { name: 'Search' }).press('Enter');

    // Click on the "People" tab for search for persons
    await page.getByTestId('undefined-selector-2').getByText('People').click();

    // Click on people based on user handle
    await page.getByRole('link', { name: handlename }).click();

    // Get current url
    let currentUrl: string = page.url();

    // Assertion
    // Verify current profile searched matches based on url
    await expect(currentUrl).toContain(`https://bsky.app/profile/${handlename.toLowerCase()}`);
        
});

