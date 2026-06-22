import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../fixtures/routes";
import { RemoteControl } from "../helpers/remoteControl";

export class SearchPage extends BasePage {
  protected remote = new RemoteControl(this.page);

  //Locators

  get searchBar() {
    return this.page.getByTestId("search-bar");
  }

  //need to add data-testid
  get searchInput() {
    return this.page.getByRole("textbox", {
      name: "Search Movies, Shows, Apps",
    });
  }

  get genresGrid() {
    return this.page.getByTestId("search-genres");
  }

  get genreContainer() {
    return this.page.locator("._genre_rd9z6_1");
  }

  get action() {
    return this.page.locator("#search-genres-1");
  }

  get adventures() {
    return this.page.locator("#search-genres-2");
  }

  //Actions

  async assertSearchPageElements() {
    await expect
      .poll(() => this.searchBar.isVisible(), {
        timeout: 30_000,
        intervals: [1_000, 2_000, 3_000],
      })
      .toBe(true);
    await expect(this.searchInput).toBeVisible();
    await expect(this.genresGrid).toBeVisible();
    await expect(this.genreContainer.first()).toBeVisible();
  }

  async assertSearchPageUrl() {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.search));
  }

  async openCategory(categoryName: string) {
    switch (categoryName) {
      case "Action": {
        await this.remote.pressArrow("down");
        await this.remote.pressEnter();
        break;
      }
      case "Adventures": {
        await this.remote.pressArrow("down");
        await this.remote.pressArrow("right");
        await this.remote.pressEnter();
        break;
      }
      default: {
        await this.remote.pressArrow("down");
        await this.remote.pressArrow("right");
        await this.remote.pressEnter();
        break;
      }
    }
  }

  async assertCategoryOpened(categoryName: string) {
    await expect(this.searchInput).toHaveValue(categoryName);
  }

  async assertCategoryPageUrl(categoryName: string) {
    await expect(this.page).toHaveURL(
      new RegExp(`${ROUTES.search}\\?q=${categoryName}`),
    );
  }
}
