import { AxiosResponse } from "axios";
import { apiClient } from "../helpers/apiClient";
import { appData } from "../fixtures/appData";
import { CollectionResponse } from "../interfaces/common";
import { MenuItem } from "../interfaces/menuItems";

export class MenuItemsController {
  async getMenuItems(): Promise<AxiosResponse<CollectionResponse<MenuItem>>> {
    return apiClient.get("/v1/menu_items", {
      params: { ...appData.params },
    });
  }

  async getMenuItemsWithParams(
    params: Record<string, unknown>,
  ): Promise<AxiosResponse<CollectionResponse<MenuItem>>> {
    return apiClient.get("/v1/menu_items", { params });
  }
}
