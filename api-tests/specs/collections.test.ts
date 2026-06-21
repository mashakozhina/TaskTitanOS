import { CollectionsController } from "../controllers/CollectionsController";
import { appData } from "../fixtures/appData";
import { CollectionResponse } from "../interfaces/common";
import { PageCollection } from "../interfaces/collection";

const collectionsController = new CollectionsController();
const homePageId = appData.pageIds.home;

describe("Get Collections", () => {
  let response: CollectionResponse<PageCollection>;

  beforeAll(async () => {
    const res = await collectionsController.getPageCollections(homePageId);
    response = res.data;
  });

  it("returns 200 with collection and pagination", async () => {
    const res = await collectionsController.getPageCollections(homePageId);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("collection");
    expect(res.data).toHaveProperty("pagination");
  });

  it("collection is not empty", () => {
    expect(response.collection.length).toBeGreaterThan(0);
  });

  it("each collection item has required fields", () => {
    for (const item of response.collection) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("type");
      expect(typeof item.name).toBe("string");
      expect(typeof item.type).toBe("string");
    }
  });

  it("pagination count matches collection length", () => {
    expect(response.pagination.count).toBe(response.collection.length);
    expect(response.pagination.current_page).toBe(1);
  });

  it("returns 400 with error message when required param is missing", async () => {
    const error = await collectionsController
      .getPageCollectionsWithParams(homePageId, { market: "gb", locale: "en" })
      .catch((e) => e);

    expect(error.response.status).toBe(400);
    expect(error.response.data.errors[0].message).toMatch(/param is missing/);
  });

  it("returns 404 with error message for a non-existent page id", async () => {
    const error = await collectionsController
      .getPageCollections(999)
      .catch((e) => e);

    expect(error.response.status).toBe(404);
    expect(error.response.data.errors[0].message).toMatch(/Not found resource/);
  });
});
