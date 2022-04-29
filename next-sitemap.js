/** @type {import('next-sitemap').IConfig} */
const settings = require("./settings");

module.exports = {
  siteUrl: settings.siteBaseUrl,
};
