import {expect, type Page,test} from '@playwright/test'

const USERNAME = process.env.BS_USERNAME
const PASSWORD = process.env.BS_PASSWORD
const LOCALHOST = 'http://localhost:19006/'

async function login(page: Page): Promise<void> {
  //Go to site and Login
  await page.goto(LOCALHOST)
  await page.getByRole('button', {name: 'Sign in'}).click()
  await page.getByTestId('loginUsernameInput').click()
  await page.getByTestId('loginUsernameInput').fill(`${USERNAME}`)
  await page.getByTestId('loginPasswordInput').click()
  await page.getByTestId('loginPasswordInput').fill(`${PASSWORD}`)
  await page.getByTestId('loginNextButton').click()
}

test.beforeEach(async ({page}) => {
  await login(page)
})

test('user can follow mercytum', async ({page}) => {
  //Confirm Login was successful
  await expect(page.getByTestId('homeScreenFeedTabs-Following')).toBeVisible()

  //Search for user(mercytum)
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('mercytum')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  //Go to People tab and select the user
  await page.getByTestId('undefined-selector-2').getByText('People').click()
  await page.getByRole('link', {name: 'mercytum.bsky.social'}).click()

  if (await page.getByTestId('unfollowBtn').isVisible()) {
    // Follow the user
    await page.getByTestId('unfollowBtn').click()
  }

  //Follow the user
  await page.getByTestId('followBtn').click()

  // Expect to see the "Unfollow" button now
  await expect(page.getByTestId('unfollowBtn')).toBeVisible()
})

test('user can load the Following list', async ({page}) => {
  //Confirm Login was successful
  await expect(page.getByTestId('homeScreenFeedTabs-Following')).toBeVisible()

  //Check if user is in your Following list
  await page.getByTestId('homeScreenFeedTabs-Following').click()
  await page.getByTestId('feedItem-by-mercytum.bsky.social').isVisible
})

test('user can navigate to followed user profile', async ({page}) => {
  //Confirm Login was successful
  await expect(page.getByTestId('homeScreenFeedTabs-Following')).toBeVisible()

  //Search for user(mercytum)
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('mercytum')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  //Go to People tab and select the user
  await page.getByTestId('undefined-selector-2').getByText('People').click()
  await page.getByRole('link', {name: 'mercytum.bsky.social'}).click()
})

test('user can unfollow mercytum', async ({page}) => {
  //Confirm Login was successful
  await expect(page.getByTestId('homeScreenFeedTabs-Following')).toBeVisible()

  //Search for user(mercytum)
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('mercytum')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  //Go to People tab and select the user
  await page.getByTestId('undefined-selector-2').getByText('People').click()
  await page.getByRole('link', {name: 'mercytum.bsky.social'}).click()

  await page.waitForTimeout(1000)

  if (await page.getByTestId('followBtn').isVisible()) {
    // Follow the user
    await page.getByTestId('followBtn').click()
  }
  // Expect to see the "Unfollow" button now
  await expect(page.getByTestId('unfollowBtn')).toBeVisible()

  //Unfollow the user
  await page.getByTestId('unfollowBtn').click()

  //Navigate back Home
  await page.getByRole('link', {name: 'Home', exact: true}).click()
})
