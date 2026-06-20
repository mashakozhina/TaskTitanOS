import { test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { HomePage } from "../pages/HomePage";

const category = process.env.TEST_CATEGORY ?? "Action";

test.describe("Search", () => {
  let homePage: HomePage;
  let search: SearchPage;

  test.beforeEach(async ({ page }) => {
    search = new SearchPage(page);
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToSearch();
  });

  test("Open a category from the search page", async ({ page }) => {
    await search.openCategory(category);
    await search.assertCategoryOpened(category);
    await search.assertCategoryPageUrl(category);
  });
});
