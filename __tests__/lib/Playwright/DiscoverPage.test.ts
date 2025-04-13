import {expect, test} from '@playwright/test'

const username = process.env.BS_USERNAME
const password = process.env.BS_PASSWORD

test('user can search and explore content from Discover page', async ({
  page,
}) => {
  //Go to site and Login
  await page.goto('http://127.0.0.1:19006')
  // await page.goto('https://bsky.app/')
  await page.getByRole('button', {name: 'Sign in'}).click()
  await page.getByTestId('loginUsernameInput').fill(`${username}`)
  await page.getByTestId('loginPasswordInput').click()
  await page.getByTestId('loginPasswordInput').fill(`${password}`)
  await page.getByTestId('loginNextButton').click()

  // Expect Discover tab to be visible after login and click it
  await expect(page.getByTestId('homeScreenFeedTabs-Discover')).toBeVisible()
  await page.getByTestId('homeScreenFeedTabs-Discover').click()

  // Search for "playwright.dev"
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('playwright.dev')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  // Expect "Top" tab to be visible in search results and click it
  await expect(page.getByTestId('undefined-selector-0').getByText('Top'))
    .toBeVisible
  await page.getByTestId('undefined-selector-0').getByText('Top').click()

  // Click on the first result (assuming it's a post)
  const firstResult = page
    .getByTestId('undefined-selector-0')
    .locator('div')
    .first()
  await expect(firstResult).toBeVisible()
  await firstResult.click()

  //Go back Home and tap Trending
  await page.getByRole('link', {name: 'Home', exact: true}).click()
  await page.getByText('Trending').click()

  //Go back Home
  await page.getByRole('link', {name: 'Home', exact: true}).click()
})
