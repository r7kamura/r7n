import type { NextApiRequest, NextApiResponse } from "next";
import RSS from "rss";
import { listArticles, renderArticle } from "../../lib/article";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const rss = new RSS({
    description: "r7kamuraの生活やプログラミングに関するウェブサイト",
    feed_url: "https://r7kamura.com/feed.xml",
    generator: "r7kamura/r7n",
    site_url: "https://r7kamura.com/",
    title: "r7kamura.com",
  });

  const articles = listArticles().slice(0, 20);
  const renderedArticles = await Promise.all(
    articles.map(async (article) => {
      return await renderArticle(article);
    })
  );

  renderedArticles.forEach(async (renderedArticle) => {
    const url = `https://r7kamura.com/articles/${renderedArticle.name}`;
    rss.item({
      custom_elements: [
        {
          "content:encoded": {
            _cdata: renderedArticle.renderedBody,
          },
        },
      ],
      date: new Date(`${renderedArticle.date}T00:00+0900`),
      description: renderedArticle.description,
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
