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


// Search for feeds by using term
test('Search for feeds using search term', {tag: '@search'}, async ({ page }) => {

    // Search term
    const searchTerm = 'weather';

    // Search for Feeds
    await page.getByRole('link', { name: 'Feeds', exact: true }).click();

    // Click on search bar in feeds page
    await page.getByTestId('FeedsScreen').getByRole('search', { name: 'Search' }).click();

    // Type searchTerm
    await page.getByRole('main').getByRole('search', { name: 'Search' }).fill(searchTerm);

    // Stimulate pressing Enter key on keyboard
    await page.getByRole('main').getByRole('search', { name: 'Search' }).press('Enter');

    // Click on a predefined weather feed
    await page.getByRole('link', { name: 'Ontario Weather #ONstorm' }).click();

    // Select the first feed description seen
    let feedText = await page.getByTestId('postText').first().textContent();

    // Check that post has no than one word
    let actual = await chkPostExist(feedText);

    // Assertion
    // Verify post description has no than one word
    await expect(actual).toEqual(true);

});


// Search for feeds using hashtag
test('Search for feeds using hashtag', {tag: '@search'}, async ({ page }) => {

    // Search term
    const hashtag = '#nba';

    // Search for Feeds
    await page.getByRole('link', { name: 'Feeds', exact: true }).click();

    // Click on search bar in feeds page
    await page.getByTestId('FeedsScreen').getByRole('search', { name: 'Search' }).click();

    // Type searchTerm
    await page.getByRole('main').getByRole('search', { name: 'Search' }).fill(hashtag);

    // Stimulate pressing Enter key on keyboard
    await page.getByRole('main').getByRole('search', { name: 'Search' }).press('Enter');

    // Click on a predefined feed
    await page.getByRole('link', { name: hashtag }).click();

    // Select the first feed description seen
    let feedText = await page.getByTestId('postText').first().innerText();

    // Check that post has no than one word
    let actual = await chkPostExist(feedText);

    // Assertion
    // Verify post description has no than one word
    await expect(actual).toEqual(true);

});