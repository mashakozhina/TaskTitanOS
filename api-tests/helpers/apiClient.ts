import axios from "axios";
import { appData } from "../fixtures/appData";

export const apiClient = axios.create({
  baseURL: appData.baseUrl,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "application/json",
    "Accept-Language": "en-GB,en;q=0.9",
  },
});
