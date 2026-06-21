import { AxiosResponse } from "axios";
import { apiClient } from "../helpers/apiClient";
import { appData } from "../fixtures/appData";
import { CollectionResponse } from "../interfaces/common";
import { Genre } from "../interfaces/genres";

export class GenresController {
  async getGenres(
    //things that change per call
    type: "movie" | "tv_show",
    perPage = 24,
  ): Promise<AxiosResponse<CollectionResponse<Genre>>> {
    return apiClient.get("/v1/genres", {
      params: { ...appData.params, per_page: perPage, type },
    });
  }

  async getGenresWithParams(
    params: Record<string, unknown>,
  ): Promise<AxiosResponse<CollectionResponse<Genre>>> {
    return apiClient.get("/v1/genres", { params });
  }
}
