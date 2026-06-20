import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../fixtures/routes";

export class ChannelsPage extends BasePage {
  //Locators

  //Add data-testid="channels-placeholder" for placeholder
  get placeholderHeading() {
    return this.page.getByText("This feature is coming soon");
  }

  get placeholderSubtitle() {
    return this.page.getByText(
      "Streaming channels are not available in your region yet.",
    );
  }

  get placeholderOkButton() {
    return this.page.getByRole("button");
  }

  //Actions
  async openChannelsPage() {
    await this.navigateTo(ROUTES.channels);
  }

  async assertChannelsPageUrl() {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.channels));
  }

  async assertPlaceholderVisible() {
    await expect(this.placeholderHeading).toBeVisible();
    await expect(this.placeholderSubtitle).toBeVisible();
    await expect(this.placeholderOkButton).toBeVisible();
  }
}
