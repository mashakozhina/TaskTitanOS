import { expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL;

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators

  get navigationWrapper() {
    return this.page.getByRole("navigation", { name: "Main menu" });
  }

  get menuBar() {
    return this.page.getByRole("menubar");
  }

  get menuItemSearch() {
    return this.page.getByTestId("main-menu-item-0");
  }

  get menuItemHome() {
    return this.page.getByTestId("main-menu-item-1");
  }

  get menuItemTvGuide() {
    return this.page.getByTestId("main-menu-item-2");
  }

  get menuItemChannels() {
    return this.page.getByTestId("main-menu-item-3");
  }

  get menuItemTvApps() {
    return this.page.getByTestId("main-menu-item-4");
  }

  get menuItemSource() {
    return this.page.getByTestId("menu-icon-open-sources");
  }

  get menuItemSettings() {
    return this.page.getByTestId("menu-icon-open-settings");
  }

  get listsContainer() {
    return this.page.getByTestId("lists-container");
  }

  //Actions

  async navigateTo(path: string = "/"): Promise<void> {
    await this.page.goto(`${BASE_URL}${path}`);
  }

  async assertHeader() {
    await expect(this.navigationWrapper).toBeVisible();
    await expect(this.menuBar).toBeVisible();
    await expect(this.menuItemSearch).toBeVisible();
    await expect(this.menuItemHome).toBeVisible();
    await expect(this.menuItemTvGuide).toBeVisible();
    await expect(this.menuItemChannels).toBeVisible();
    await expect(this.menuItemTvApps).toBeVisible();
    await expect(this.menuItemSource).toBeVisible();
    await expect(this.menuItemSettings).toBeVisible();
  }

  async assertListsContainer() {
    await expect(this.listsContainer).toBeVisible();
  }

  async getFocusedElementTestId(): Promise<string> {
    return this.page.evaluate(() => {
      const el = document.activeElement;
      return (
        el?.getAttribute("data-testid") ?? el?.tagName ?? "no focused element"
      );
    });
  }

  async assertFocusedElement(expectedTestId: string): Promise<void> {
    await expect(
      this.page.locator(`[data-testid="${expectedTestId}"]`),
    ).toBeFocused();
  }
}
