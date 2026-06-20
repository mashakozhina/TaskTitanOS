import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

const appName = process.env.TEST_APP_NAME ?? "DAZN";

test.describe("Favourite Apps", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Remove app from the favorites at the Home page", async ({ page }) => {
    const appsBefore = await homePage.favoriteAppContainer.count();
    await homePage.selectFavoriteApp(appName);
    await homePage.removeAppUsingKeyboard(appName);
    await expect(homePage.favoriteAppContainer).toHaveCount(appsBefore - 1);
  });

  test('Not allowed to remove "watch-tv" app from the favorites', async ({
    page,
  }) => {
    await homePage.assertCannotDeleteWatchTv();
  });
});
