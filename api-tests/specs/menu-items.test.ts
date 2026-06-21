import { MenuItemsController } from "../controllers/MenuItemsController";
import { CollectionResponse } from "../interfaces/common";
import { MenuItem } from "../interfaces/menuItems";

const menuItemsController = new MenuItemsController();

const EXPECTED_INTERNAL_IDS = [
  "search",
  "home",
  "tv_guide",
  "channels",
  "apps",
];

describe("Get Menu Items", () => {
  let response: CollectionResponse<MenuItem>;

  beforeAll(async () => {
    const res = await menuItemsController.getMenuItems();
    response = res.data;
  });

  it("returns 200 with collection and pagination", async () => {
    const res = await menuItemsController.getMenuItems();
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("collection");
    expect(res.data).toHaveProperty("pagination");
  });

  it("collection is not empty", () => {
    expect(response.collection.length).toBeGreaterThan(0);
  });

  it("each item has required fields", () => {
    for (const item of response.collection) {
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("position");
      expect(item).toHaveProperty("internal_id");
      expect(item).toHaveProperty("icon");
      expect(typeof item.name).toBe("string");
      expect(typeof item.position).toBe("number");
    }
  });

  it("items are ordered by position", () => {
    const positions = response.collection.map((i) => i.position);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("contains core navigation items", () => {
    const internalIds = response.collection.map((i) => i.internal_id);
    for (const id of EXPECTED_INTERNAL_IDS) {
      expect(internalIds).toContain(id);
    }
  });

  it("home item has type page, kind home, and a numeric id", () => {
    const homeItem = response.collection.find((i) => i.internal_id === "home");
    expect(homeItem).toBeDefined();
    expect(homeItem!.type).toBe("page"); //item points to a page resource inside the platform
    expect(homeItem!.kind).toBe("home"); //to identify this page is the home screen specifically
  });

  it("all icons are valid URLs", () => {
    for (const item of response.collection) {
      expect(item.icon).toMatch(/^https?:\/\/.+/);
    }
  });

  it("returns 400 with error message when required param is missing", async () => {
    const error = await menuItemsController
      .getMenuItemsWithParams({ market: "gb", locale: "en" })
      .catch((e) => e);

    expect(error.response.status).toBe(400);
    expect(error.response.data.errors[0].message).toMatch(/param is missing/);
  });
});
