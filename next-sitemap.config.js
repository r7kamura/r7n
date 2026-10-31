/** @type {import('next-sitemap').IConfig} */
const settings = require("./settings");

module.exports = {
  outDir: "out",
  siteUrl: settings.siteBaseUrl,
};
