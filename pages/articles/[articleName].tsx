import Head from "next/head";
import type { NextPage } from "next";
import { type Article, getArticle, listArticles } from "../../lib/article";
import Time from "../../components/Time";

type Props = {
  article: Article;
};

const ShowArticle: NextPage<Props> = ({ article }) => {
  return (
    <article>
      <Head>
        <title>{article.title}</title>
      </Head>
      <header>
        <Time date={article.date} />
      </header>
      <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
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
  return {
    props: {
      article: getArticle({ articleName: params.articleName }),
    },
  };
}
