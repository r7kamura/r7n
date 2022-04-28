import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type Article = ArticleMetadata &
  ArticleMatter & {
    body: string;
  };

type ArticleMetadata = {
  date: string;
  name: string;
  slug: string;
};

type ArticleMatter = {
  title: string;
};

const articlesDirectoryPath =
  process.env.ARTICLES_DIRECTORY_PATH || path.join(process.cwd(), "articles");

export function getArticle({ articleName }: { articleName: string }): Article {
  const fileContent = readArticle(articleName);
  const articleMatter = matter(fileContent);
  const articleMetadata = fileNameToArticleMetadata(
    articleName
  ) as ArticleMetadata;
  return {
    ...articleMetadata,
    body: articleMatter.content,
    name: articleName,
    ...(articleMatter.data as ArticleMatter),
  };
}

export function listArticles(): Array<Article> {
  const fileNames = fs.readdirSync(articlesDirectoryPath);
  return fileNames
    .filter((fileName) => fileNameToArticleMetadata(fileName))
    .map((fileName) => {
      return getArticle({ articleName: fileName });
    })
    .filter((article) => {
      return article.date;
    });
}

export async function renderArticleBody(articleBody: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(articleBody);
  return result.toString();
}

function fileNameToArticleMetadata(
  fileName: string
): ArticleMetadata | undefined {
  const matchArray = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)/);
  if (matchArray) {
    const date = matchArray[1];
    const slug = matchArray[2];
    const name = [date, slug].join("-");
    return {
      date,
      name,
      slug,
    };
  }
}

function readArticle(name: string): string {
  const filePath = path.join(articlesDirectoryPath, name);
  return fs.readFileSync(filePath, "utf8");
}
