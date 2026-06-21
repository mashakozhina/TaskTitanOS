import { GenresController } from "../controllers/GenresController";
import { CollectionResponse } from "../interfaces/common";
import { Genre } from "../interfaces/genres";

const genresController = new GenresController();

const EXPECTED_GENRE_CODES = [
  "action",
  "comedy",
  "drama",
  "horror",
  "thriller",
];

describe("Get Genres", () => {
  let response: CollectionResponse<Genre>;

  beforeAll(async () => {
    const res = await genresController.getGenres("movie");
    response = res.data;
  });

  it("returns 200 with collection and pagination", async () => {
    const res = await genresController.getGenres("movie");
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("collection");
    expect(res.data).toHaveProperty("pagination");
  });

  it("collection is not empty", () => {
    expect(response.collection.length).toBeGreaterThan(0);
  });

  it("each genre has required fields", () => {
    for (const genre of response.collection) {
      expect(genre).toHaveProperty("id");
      expect(genre).toHaveProperty("code");
      expect(genre).toHaveProperty("name");
      expect(genre).toHaveProperty("contents");
      expect(genre).toHaveProperty("image");
      expect(typeof genre.name).toBe("string");
      expect(typeof genre.code).toBe("string");
    }
  });

  it("each genre has a contents URL", () => {
    for (const genre of response.collection) {
      expect(genre.contents.url).toMatch(/^https?:\/\/.+/);
    }
  });

  it("each genre has a background colour defined", () => {
    for (const genre of response.collection) {
      expect(genre.image).toHaveProperty("dominant_color");
      expect(genre.image.dominant_color).toHaveProperty("image");
    }
  });

  it("contains expected core genres", () => {
    const codes = response.collection.map((g) => g.code);
    for (const code of EXPECTED_GENRE_CODES) {
      expect(codes).toContain(code);
    }
  });

  it("returns genres for tv_show type", async () => {
    const res = await genresController.getGenres("tv_show");
    expect(res.status).toBe(200);
    expect(res.data.collection.length).toBeGreaterThan(0);
  });

  it("returns 400 with error message when required param is missing", async () => {
    const error = await genresController
      .getGenresWithParams({ market: "gb", locale: "en", type: "movie" })
      .catch((e) => e);

    expect(error.response.status).toBe(400);
    expect(error.response.data.errors[0].message).toMatch(/param is missing/);
  });
});
