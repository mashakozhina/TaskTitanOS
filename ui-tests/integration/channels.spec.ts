import { test } from "@playwright/test";
import { ChannelsPage } from "../pages/ChannelsPage";
import { HomePage } from "../pages/HomePage";

test.describe("Channels", () => {
  let channels: ChannelsPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    channels = new ChannelsPage(page);
    homePage = new HomePage(page);
    await homePage.navigateToChannels();
  });

  test("Channels page shows placeholder when unavailable at the region", async ({
    page,
  }) => {
    await channels.assertPlaceholderVisible();
  });

  //Couldnt add this test because the page is unavailiable
  //test("Channels page is displayed correctly", async ({ page }) => {});
});
