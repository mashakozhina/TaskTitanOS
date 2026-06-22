import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../fixtures/routes";
import { RemoteControl } from "../helpers/remoteControl";
import { AppsPage } from "./AppsPage";

export class AppDetailsPage extends BasePage {
  protected remote = new RemoteControl(this.page);
  protected apps = new AppsPage(this.page);

  //Locators

  get appDetailsLogo() {
    return this.page.getByTestId("app-details-logo");
  }

  get appDetailsTitle() {
    return this.page.getByTestId("app-details-title");
  }

  get appDetailsDescription() {
    return this.page.getByTestId("app-details-description");
  }

  get addToFavouritesBtn() {
    return this.page.getByTestId("app-details-favourites-button");
  }

  get openAppBtn() {
    return this.page.getByTestId("app-details-open-button");
  }

  //Actions

  async openAppDetailsPage() {
    await this.navigateTo(ROUTES.details);
    await this.assertAppDetailsPageElements();
  }

  async assertAppDetailsPageElements() {
    await expect
      .poll(() => this.appDetailsLogo.isVisible(), {
        timeout: 30_000,
        intervals: [1_000, 2_000, 3_000],
      })
      .toBe(true);
    await expect(this.appDetailsTitle).toBeVisible();
    await expect(this.appDetailsDescription).toBeVisible();
    await expect(this.addToFavouritesBtn).toBeVisible();
    await expect(this.openAppBtn).toBeVisible();
  }

  async assertAppDetailsPageUrl() {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.details));
  }

  async addAppToFavourites() {
    await expect(this.addToFavouritesBtn).toBeVisible();
    await this.addToFavouritesBtn.focus();
    await this.remote.pressEnter();
  }

  async backHomeFromAppDetails() {
    await this.page.goBack();
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(5_000); //this added temporary but should be removed
    await this.apps.assertAppsPageElements();
    await this.remote.pressArrow("up", 5);
    await this.remote.pressEnter();
    await this.remote.pressArrow("left", 3);
    await this.remote.pressEnter();
  }
}
