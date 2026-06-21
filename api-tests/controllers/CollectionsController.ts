import { AxiosResponse } from "axios";
import { apiClient } from "../helpers/apiClient";
import { appData } from "../fixtures/appData";
import { CollectionResponse } from "../interfaces/common";
import { PageCollection } from "../interfaces/collection";

export class CollectionsController {
  async getPageCollections(
    //things that change per call
    pageId: number,
    page = 1,
    perPage = 50,
  ): Promise<AxiosResponse<CollectionResponse<PageCollection>>> {
    return apiClient.get(`/v1/pages/${pageId}/items`, {
      params: { ...appData.params, page, per_page: perPage },
    });
  }

  async getPageCollectionsWithParams(
    pageId: number,
    params: Record<string, unknown>,
  ): Promise<AxiosResponse<CollectionResponse<PageCollection>>> {
    return apiClient.get(`/v1/pages/${pageId}/items`, { params });
  }
}
