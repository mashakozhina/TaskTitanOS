import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../fixtures/routes";
import { RemoteControl } from "../helpers/remoteControl";
import { ChannelsPage } from "./ChannelsPage";
import { SearchPage } from "./SearchPage";
import { AppsPage } from "./AppsPage";

export class HomePage extends BasePage {
  protected remote = new RemoteControl(this.page);
  protected channels = new ChannelsPage(this.page);
  protected search = new SearchPage(this.page);
  protected apps = new AppsPage(this.page);

  //Locators

  get bannerContent() {
    return this.page.getByTestId("banner-content");
  }

  get favouriteApps() {
    return this.page.getByTestId("user-apps");
  }

  get favoriteAppContainer() {
    return this.page.locator("._favAppItem_brv1e_203");
  }

  get firstFavoriteApp() {
    return this.page.locator("._favAppItem_brv1e_203").first();
  }

  get netflixApp() {
    return this.page.getByTestId("Netflix");
  }

  get watchTV() {
    return this.page.getByTestId("Watch TV");
  }

  get recommendedByYouTube() {
    return this.page.getByTestId("list-item-youtube_list-6");
  }

  get firstYouTubeRecommendation() {
    return this.page.locator("._youtubeItem_brv1e_1");
  }

  get mostWatchedChannels() {
    return this.page.getByTestId(
      "list-item-most_watched_channels_by_user_list-10",
    );
  }

  get removeAppBtn() {
    return this.page.getByTestId("editmode-remove-app");
  }

  //Actions

  async navigateToHomePage() {
    await this.navigateTo(ROUTES.home);
    await this.assertHomePageElements();
  }

  async assertHomePageElements() {
    await expect
      .poll(() => this.bannerContent.isVisible(), {
        timeout: 30_000,
        intervals: [1_000, 2_000, 3_000],
      })
      .toBe(true);
    await this.assertHeader();
    await expect(this.favouriteApps).toBeVisible();
    await this.assertListsContainer();
    // await expect(this.recommendedByYouTube).toBeVisible();
    // await expect(this.mostWatchedChannels).toBeVisible();
  }

  async focusFavouriteApp(appName: string, maxSteps = 25) {
    const app = this.page.locator(`[data-testid="${appName}"]`);
    for (let i = 0; i < maxSteps; i++) {
      if (await app.evaluate((el) => el === document.activeElement)) break;
      await this.remote.pressArrow("right");
    }
  }

  async selectFavoriteApp(appName: string) {
    switch (appName) {
      case "DAZN": {
        await this.remote.pressArrow("right");
        break;
      }
      case "Netflix": {
        await this.remote.pressArrow("right");
        await this.remote.pressArrow("right");
        await this.remote.pressEnter();
        break;
      }
      default: {
        await this.remote.pressArrow("right");
        break;
      }
    }
  }

  async removeAppUsingKeyboard(appName: string) {
    await this.remote.longPressEnter(); // triggers edit/delete mode
    await this.removeAppBtn.isVisible(); // wait for the remove button to be visible
    await this.remote.pressArrow("down"); // navigate to remove button if needed
    await this.remote.pressEnter(); // confirm removal
    //await this.removeAppBtn.click();
  }

  async assertCannotDeleteWatchTv() {
    await this.watchTV.hover();
    await this.remote.longPressEnter();
    await expect(this.removeAppBtn).toHaveCount(0); //ensure delete not shown
  }

  assertAppInFavourites(appName: string) {
    const appLocator = this.page.locator(`[data-testid="${appName}"]`);
    return expect(appLocator).toBeVisible();
  }

  async navigateToChannels() {
    await this.remote.pressArrow("up");
    await this.remote.pressArrow("up");
    await this.remote.pressArrow("right");
    await this.remote.pressArrow("right");
    await this.remote.pressEnter();
    await this.channels.assertChannelsPageUrl();
  }

  async navigateToSearch() {
    await this.remote.pressArrow("up");
    await this.remote.pressArrow("up");
    await this.remote.pressArrow("left");
    await this.remote.pressEnter();
    //await this.search.assertSearchPageElements();
    //await this.search.assertSearchPageUrl();
  }

  async navigateToApps() {
    await this.menuItemHome.focus();
    await this.remote.pressArrow("up");
    await this.remote.pressArrow("up");
    await this.remote.pressArrow("right");
    await this.remote.pressArrow("right");
    await this.remote.pressArrow("right");
    await this.remote.pressArrow("right");
    await this.remote.pressArrow("right");
    await this.remote.pressArrow("right");
    await this.remote.pressEnter();
    await this.apps.assertAppsPageElements();
    //await this.apps.assertAppsPageUrl();
  }
}
