export interface PageCollection {
  id: number;
  name: string;
  type: string;
  branded_image: string | null;
  size: string;
  watchlist_feature: boolean;
  aggregated: boolean;
  url?: string;
  auto_fullscreen?: boolean;
  fullscreen_from_watch_tv?: number;
  fullscreen_from_other_apps?: number;
}
