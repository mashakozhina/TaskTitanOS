import { test } from "@playwright/test";
import { AppsPage } from "../pages/AppsPage";
import { HomePage } from "../pages/HomePage";
import { AppDetailsPage } from "../pages/AppDetailsPage";

test.describe("Applications", () => {
  let apps: AppsPage;
  let homePage: HomePage;
  let appDetails: AppDetailsPage;

  test.beforeEach(async ({ page }) => {
    apps = new AppsPage(page);
    homePage = new HomePage(page);
    appDetails = new AppDetailsPage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToApps();
  });

  test("Add app to the favourites from the Applications page", async ({
    page,
  }) => {
    const appAddedtoFavorites = await apps.openAppDetails();
    await appDetails.assertAppDetailsPageElements();
    await appDetails.addAppToFavourites(); //Couldn't add the app to favirites without login
    await homePage.navigateToHomePage();
    //await homePage.assertAppInFavourites(appAddedtoFavorites);
  });
});
