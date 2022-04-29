import type { NextApiRequest, NextApiResponse } from "next";
import RSS from "rss";
import { listArticles, renderArticle } from "../../lib/article";
import settings from "../../settings";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const rss = new RSS({
    description: "r7kamuraの生活やプログラミングに関するウェブサイト",
    feed_url: `${settings.siteBaseUrl}/feed.xml`,
    generator: "r7kamura/r7n",
    site_url: `${settings.siteBaseUrl}/`,
    title: "r7kamura.com",
  });

  const articles = listArticles().slice(0, 20);
  const renderedArticles = await Promise.all(
    articles.map(async (article) => {
      return await renderArticle(article);
    })
  );

  renderedArticles.forEach(async (renderedArticle) => {
    const url = `${settings.siteBaseUrl}/articles/${renderedArticle.name}`;
    rss.item({
      custom_elements: [
        {
          "content:encoded": {
            _cdata: renderedArticle.renderedBody,
          },
        },
      ],
      date: new Date(`${renderedArticle.date}T00:00+0900`),
      description: renderedArticle.description || "",
      title: renderedArticle.title,
      url,
    });
  });

  const responseBody = rss.xml();

  response
    .status(200)
    .setHeader("Content-Type", "application/xml")
    .send(responseBody);
}
