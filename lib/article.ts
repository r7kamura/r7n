import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { convertAmazonLink, extractDescription } from "./remarkPlugins";

export type Article = ArticleMetadata &
  ArticleMatter & {
    body: string;
  };

export type RenderedArticle = Article & {
  description: string;
  renderedBody: string;
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
    `${articleName}.md`
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
    .sort((a: string, b: string) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    })
    .filter((fileName) => fileNameToArticleMetadata(fileName))
    .map((fileName) => {
      const articleName = path.basename(fileName, ".md");
      return getArticle({ articleName });
    })
    .filter((article) => {
      return article.date;
    });
}

export async function renderArticle(
  article: Article
): Promise<RenderedArticle> {
  const { description, renderedBody } = await renderArticleBody(article.body);
  return {
    ...article,
    description,
    renderedBody,
  };
}

async function renderArticleBody(
  articleBody: string
): Promise<{ description: string; renderedBody: string }> {
  const result = await remark()
    .use(remarkHtml)
    .use(convertAmazonLink)
    .use(extractDescription as any)
    .process(articleBody);
  return {
    description: (result.data.description as string) || "",
    renderedBody: result.toString(),
  };
}

function fileNameToArticleMetadata(
  fileName: string
): ArticleMetadata | undefined {
  const matchArray = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
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

function readArticle(articleName: string): string {
  const filePath = path.join(articlesDirectoryPath, `${articleName}.md`);
  return fs.readFileSync(filePath, "utf8");
}
