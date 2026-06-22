import { Page, expect } from "@playwright/test";

const KEY_DELAY_MS = 200;

export class RemoteControl {
  constructor(private page: Page) {}

  async pressArrow(direction: "left" | "right" | "up" | "down", times = 1) {
    const key = {
      left: "ArrowLeft",
      right: "ArrowRight",
      up: "ArrowUp",
      down: "ArrowDown",
    }[direction];
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press(key);
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(KEY_DELAY_MS); // simulates physical remote key delay
    }
  }

  async pressEnter(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press("Enter");
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(KEY_DELAY_MS);
    }
  }

  async longPressEnter(durationMs = 3000) {
    await this.page.keyboard.down("Enter");
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(durationMs); //for a remote control simulation a timed key hold is legitimate,there's no DOM signal to wait
  }

  async goBack(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.page.goBack();
    }
  }
}
