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

type ArticleFile = {
  content: Buffer;
  path: string;
};

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

const articlesDirectoryPaths = process.env.ARTICLES_DIRECTORY_PATHS
  ? process.env.ARTICLES_DIRECTORY_PATHS.split(",")
  : [path.join(process.cwd(), "articles")];

export function getArticle({ articleName }: { articleName: string }): Article {
  const articleFile = findArticleFile({ articleName }) as ArticleFile;
  return articleFileToArticle(articleFile);
}

export function listArticles(): Array<Article> {
  return articlesDirectoryPaths
    .flatMap((directoryPath) => {
      return fs.readdirSync(directoryPath).map((fileName) => {
        const filePath = path.join(directoryPath, fileName);
        const content = fs.readFileSync(filePath);
        return {
          content,
          path: filePath,
        };
      });
    })
    .map((articleFile) => {
      return articleFileToArticle(articleFile);
    })
    .filter((article) => {
      return article.date;
    })
    .sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else {
        return 0;
      }
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

function articleNameToArticleMetadata(
  articleName: string
): ArticleMetadata | undefined {
  const matchArray = articleName.match(/^((\d{4}-\d{2}-\d{2})(?:-(.+))?)$/);
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

function findArticleFile({
  articleName,
}: {
  articleName: string;
}): ArticleFile | undefined {
  let result;
  articlesDirectoryPaths.find((directoryPath) => {
    const filePath = path.join(directoryPath, `${articleName}.md`);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      result = {
        content,
        path: filePath,
      };
      return true;
    } catch (error) {
      return false;
    }
  });
  return result;
}

function articleFileToArticle(articleFile: ArticleFile): Article {
  const articleMatter = matter(articleFile.content);
  const articleName = path.basename(articleFile.path, ".md");
  const articleMetadata = articleNameToArticleMetadata(
    articleName
  ) as ArticleMetadata;
  return {
    ...articleMetadata,
    body: articleMatter.content,
    name: articleName,
    title: articleMatter.data.title,
  };
}
