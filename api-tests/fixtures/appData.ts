export const appData = {
  baseUrl: process.env.BASE_URL,
  // things that change per environment
  params: {
    market: process.env.MARKET ?? "gb",
    device: process.env.DEVICE ?? "tv",
    locale: process.env.LOCALE ?? "en",
    firmware: "unknown",
    "excluded_app_codes[]": "apple_tv",
    model: "unset",
  },

  pageIds: {
    home: 498,
  },
};
