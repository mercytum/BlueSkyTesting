import { test, expect, type Page } from '@playwright/test';
import { promises } from "fs";

const BLUESKY_WEB_URL = 'https://bsky.app';

//const BSKY_EMAIL = process.env.CIS565_EMAIL;
//const BSKY_PASS = process.env.CIS565_PASSWORD;
const BSKY_EMAIL = "cis565bskytests@gmail.com";
const BSKY_PASS = "CIS565TestGroup"; 

// Global total post variable
let TOTAL_POSTS = 0;

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

// Create Post using one character
test('Create Post using one character', {tag: '@post'}, async ({ page }) => {

    // Navigate to profile page
    await page.getByRole('link', { name: 'Profile', exact: true }).click();

    // Click on the compose button
    await page.getByTestId('profileView').getByTestId('composeFAB').click();

    // Click on the post textbox and type 1 character post msg
    await page.getByRole('textbox', { name: 'Rich-Text Editor' }).fill('A');
    
    // Click the publish / post button to create post
    await page.getByTestId('composerPublishBtn').click();

    // Initiate a page reload to show upated post numbers
    await page.reload();

    // Select the first post description seen
    let postText = await page.getByTestId('postText').first().textContent();

    // Assertion
    // Expected length of post toBe 1
    await expect(postText?.length).toBe(1);

});


// Create Post using 300 character
test('Create Post using 300 characters', {tag: '@post'}, async ({ page }) => {

    // Navigate to profile page
    await page.getByRole('link', { name: 'Profile', exact: true }).click();

    // Click on the compose button
    await page.getByTestId('profileView').getByTestId('composeFAB').click();

    // Click on the post textbox and type 300 character post msg
    await page.getByRole('textbox', { name: 'Rich-Text Editor' }).fill('Lorem ipsum odor amet, consectetuer adipiscing elit. Etiam himenaeos nascetur elit molestie semper. Sagittis ad senectus mauris; facilisi maximus a. Ex lectus ad tempor placerat egestas faucibus, a quam tincidunt. Parturient sagittis curae dignissim, tortor nam molestie ullamcorper mattis interdums.');
    
    // Click the publish / post button to create post
    await page.getByTestId('composerPublishBtn').click();

    // Initiate a page reload to show upated post numbers
    await page.reload();


    // Select the first post description seen
    let postText = await page.getByTestId('postText').first().textContent();

    // Check that post has no than one word
    let actual = await chkPostExist(postText);

    // Assertion
    // Expected length of post toBe 300
    await expect(postText?.length).toBe(300);

    // Verify post description has no than one word
    await expect(actual).toEqual(true);

});