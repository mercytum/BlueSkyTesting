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

test('user can open a post from Discover page', async ({page}) => {
  // Expect Discover tab to be visible after login and click it
  await expect(page.getByTestId('homeScreenFeedTabs-Discover')).toBeVisible()
  await page.getByTestId('homeScreenFeedTabs-Discover').click()

  //Search for user(mercytum)
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('mercytum')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  //Go to People tab and select the user
  await page.getByTestId('undefined-selector-2').getByText('People').click()
  await page.getByRole('link', {name: 'mercytum.bsky.social'}).click()

  await page
    .getByRole('link', {
      name: "Mercy Tum's avatar View profileView profile · April 15, 2025 at 1:07 PM Testing",
    })
    .click()

  // Check if you can see the post thread screen which includes the caht, repost, like, share and more icons/features
  const postThreadScreen = page.getByTestId('postThreadScreen')
  await expect(postThreadScreen).toBeVisible()

  // Check if you can see the reply button
  const reply = page.getByRole('button', {name: 'Compose reply'})
  await expect(reply).toBeVisible()

  //Go back Home
  await page.getByRole('link', {name: 'Home', exact: true}).click()
})

test('user can search and open first post from Discover page', async ({
  page,
}) => {
  // Expect Discover tab to be visible after login and click it
  await expect(page.getByTestId('homeScreenFeedTabs-Discover')).toBeVisible()
  await page.getByTestId('homeScreenFeedTabs-Discover').click()

  // Search for "playwright.dev"
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('playwright')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  // Expect "Top" tab to be visible in search results and click it
  await expect(page.getByTestId('undefined-selector-0').getByText('Top'))
    .toBeVisible
  await page.getByTestId('undefined-selector-0').getByText('Top').click()

  //Click on the first profile of the first post in the Top feed
  const topFeedContainer = page.locator(
    'div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2) > div > div',
  )
  const firstItem = topFeedContainer.locator('a').first()
  await firstItem.click()

  // Check if you can see the profile view
  const profileView = page.getByTestId('profileView')
  await expect(profileView).toBeVisible()

  // Check if you can see the Posts menu
  const posts = page.getByTestId('profilePager-Posts')
  await expect(posts).toBeVisible()

  // Check if you can see the Replies menu
  const replies = page.getByTestId('profilePager-Replies')
  await expect(replies).toBeVisible()

  //Go back Home
  await page.getByRole('link', {name: 'Home', exact: true}).click()
})

test('user can view trending post from Discover page', async ({page}) => {
  // Expect Discover tab to be visible after login and click it
  await expect(page.getByTestId('homeScreenFeedTabs-Discover')).toBeVisible()
  await page.getByTestId('homeScreenFeedTabs-Discover').click()

  //Check if Trending is visible
  const trending = page.getByText('Trending')
  await expect(trending).toBeVisible

  //Go back Home
  await page.getByRole('link', {name: 'Home', exact: true}).click()
})

test('user can perform infinite scrolling from Discover page', async ({
  page,
}) => {
  // Expect Discover tab to be visible after login and click it
  await expect(page.getByTestId('homeScreenFeedTabs-Discover')).toBeVisible()
  await page.getByTestId('homeScreenFeedTabs-Discover').click()

  //scroll by 100000px
  await page.pause()
  await page.evaluate(() => {
    window.scrollBy(0, 100000)
  })

  await page.pause()
})
