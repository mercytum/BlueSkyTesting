import {expect, test} from '@playwright/test'

test('user can follow and unfollow mercytum', async ({page}) => {
  //Go to site and Login
  await page.goto('http://localhost:19006/')
  // await page.goto('https://bsky.app/')
  await page.getByRole('button', {name: 'Sign in'}).click()
  await page.getByTestId('loginUsernameInput').click()
  await page.getByTestId('loginUsernameInput').fill('cis565bskytests@gmail.com')
  await page.getByTestId('loginPasswordInput').click()
  await page.getByTestId('loginPasswordInput').fill('CIS565TestGroup')
  await page.getByTestId('loginNextButton').click()

  //Confirm Login was successful
  await expect(page.getByTestId('homeScreenFeedTabs-Following')).toBeVisible()

  //Search for user(mercytum)
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('mercytum')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  //Go to People tab and select the user
  await page.getByTestId('undefined-selector-2').getByText('People').click()
  await page.getByRole('link', {name: 'mercytum.bsky.social'}).click()

  //Follow the user
  await page.getByTestId('followBtn').click()

  // Expect to see the "Unfollow" button now
  await expect(page.getByTestId('unfollowBtn')).toBeVisible()

  //Navigate back Home
  await page.getByRole('link', {name: 'Home', exact: true}).click()

  //Check if user is in your Following list
  await page.getByTestId('homeScreenFeedTabs-Following').click()
  // await page.goto('http://localhost:19006/')
  // await page.goto('https://bsky.app/')
  await page.locator('a').filter({hasText: '‪Mercy Tum‬'}).click()

  //Unfollow user
  await page.getByTestId('unfollowBtn').click()
  await page.getByRole('link', {name: 'Home', exact: true}).click()
})
