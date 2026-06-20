import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../fixtures/routes";
import { RemoteControl } from "../helpers/remoteControl";

export class AppsPage extends BasePage {
  protected remote = new RemoteControl(this.page);

  //Locators

  get pageContainer() {
    return this.page.getByTestId("page");
  }

  get bannerContent() {
    return this.page.getByTestId("banner-content");
  }

  get featuresApps() {
    return this.page.getByTestId("list-item-app_list-0");
  }

  get videoApps() {
    return this.page.getByTestId("list-item-app_list-1");
  }

  get sportApps() {
    return this.page.getByTestId("list-item-app_list-2");
  }

  get appContainer() {
    return this.page.locator("._genericItem_brv1e_58");
  }

  get daznApp() {
    return this.page.getByTestId("DAZN");
  }

  //Actions

  async assertAppsPageElements() {
    await expect
      .poll(() => this.bannerContent.isVisible(), {
        timeout: 30_000,
        intervals: [1_000, 2_000, 3_000],
      })
      .toBe(true);
    await expect(this.pageContainer).toBeVisible();
    await this.assertHeader();
    await this.assertListsContainer();
  }

  async assertAppsPageUrl() {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.apps));
  }

  async openAppDetails(): Promise<string> {
    await this.remote.pressArrow("down");
    await this.remote.pressArrow("down");
    await this.remote.pressArrow("down");
    await this.remote.pressArrow("down");
    const focusedAppTestId = await this.getFocusedElementTestId();
    await this.remote.pressEnter();
    return focusedAppTestId;
  }
}
