import Head from "next/head";
import type { NextPage } from "next";
import {
  type Article,
  getArticle,
  listArticles,
  renderArticleBody,
} from "../../lib/article";
import Time from "../../components/Time";

type Props = {
  article: Article;
  renderedBody: string;
};

const ShowArticle: NextPage<Props> = ({ article, renderedBody }) => {
  return (
    <article>
      <Head>
        <title>{article.title}</title>
      </Head>
      <header>
        <Time date={article.date} />
        <h1>{article.title}</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: renderedBody }}></div>
    </article>
  );
};

export default ShowArticle;

export async function getStaticPaths() {
  const paths = listArticles().map((article) => {
    return {
      params: {
        articleName: article.name,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const article = getArticle({ articleName: params.articleName });
  const renderedBody = await renderArticleBody(article.body);
  return {
    props: {
      article,
      renderedBody,
    },
  };
}
