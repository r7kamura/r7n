type Settings = {
  siteBaseUrl: string;
};

const settings: Settings = {
  siteBaseUrl: process.env.BASE_URL || "https://r7kamura.com",
};

export default settings;
