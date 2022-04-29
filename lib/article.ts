import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import {
  convertAmazonLink,
  extractDescription,
  extractImageUrl,
} from "./remarkPlugins";

export type Article = ArticleMetadata &
  ArticleMatter & {
    body: string;
  };

export type RenderedArticle = Article & RenderResult;

type ArticleMetadata = {
  date: string;
  name: string;
  slug: string | null;
};

type ArticleMatter = {
  title: string;
};

type RenderResult = {
  description: string | null;
  imageUrl: string | null;
  renderedBody: string;
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
    title: articleMatter.data.title,
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
  const renderResult = await renderArticleBody(article.body);
  return {
    ...article,
    ...renderResult,
  };
}

async function renderArticleBody(articleBody: string): Promise<RenderResult> {
  const result = await remark()
    .use(remarkHtml)
    .use(convertAmazonLink as any)
    .use(extractDescription as any)
    .use(extractImageUrl as any)
    .process(articleBody);
  const data = result.data as any;
  return {
    description: data.description || null,
    imageUrl: data.imageUrl || null,
    renderedBody: result.toString(),
  };
}

function fileNameToArticleMetadata(
  fileName: string
): ArticleMetadata | undefined {
  const matchArray = fileName.match(/^((\d{4}-\d{2}-\d{2})(?:-(.+))?)\.md$/);
  if (matchArray) {
    const name = matchArray[1];
    const date = matchArray[2];
    const slug = matchArray[3] || null;
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
