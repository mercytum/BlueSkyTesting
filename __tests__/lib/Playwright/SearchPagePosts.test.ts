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

// Check if post exists, return boolean 
async function chkPostExist(postText: string): Promise<boolean> {

    // If postText is not a string, return false
    if (typeof postText !== 'string' || !postText) {
        return false;
    }

    // Else return
    return postText.trim().includes(' ');
}

// Setup functionality
test.beforeEach(async ({ page }) => {

    // Call login function
    await login(page);

});


// Search for posts using general search
test('Search for posts using general search', {tag: '@search'}, async ({ page }) => {

    // Search term
    const searchTerm = 'pickleball';

    // Navigate to search bar
    await page.getByRole('search', { name: 'Search' }).click();

    // Type searchTerm
    await page.getByRole('search', { name: 'Search' }).fill(searchTerm);

    // Stimulate pressing Enter key on keyboard
    await page.getByRole('search', { name: 'Search' }).press('Enter');

    // Select the first post description seen
    let postText = await page.getByTestId('postText').first().textContent();

    // Check that post has no than one word
    let actual = await chkPostExist(postText);

    // Assertion
    // Verify post description has no than one word
    await expect(actual).toEqual(true);

});


// Search for post within user profile
test('Search for post within user profile', {tag: '@search'}, async ({ page }) => {

    // Search term
    const profile = '@majorleaguepb.bsky.social'

    // Navigate to search bar
    await page.getByRole('search', { name: 'Search' }).click();

    // Search using profile handle
    await page.getByRole('search', { name: 'Search' }).fill(profile);
    
    // Click on exact profile handle
    await page.getByRole('link', { name: 'majorleaguepb.bsky.social', exact: true }).click();

    // Select the first post description seen
    let postText = await page.getByTestId('postText').first().textContent();

    // Check that post has more than one word
    let actual = await chkPostExist(postText);

    // Assertion
    // Verify post description has more than one word
    await expect(actual).toEqual(true);

});
