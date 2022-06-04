import CustomHead from "../../components/CustomHead";
import type { NextPage } from "next";
import {
  type RenderedArticle,
  getArticle,
  listArticles,
  renderArticle,
} from "../../lib/article";
import Time from "../../components/Time";

type Props = {
  renderedArticle: RenderedArticle;
};

const ShowArticle: NextPage<Props> = ({ renderedArticle }) => {
  return (
    <article className="markdown">
      <CustomHead
        description={renderedArticle.description}
        imageUrl={renderedArticle.imageUrl}
        ogType="article"
        title={renderedArticle.title}
      />
      <header>
        <Time date={renderedArticle.date} />
        <h1>{renderedArticle.title}</h1>
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: renderedArticle.renderedBody }}
      ></div>
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
  const renderedArticle = await renderArticle(article);
  return {
    props: {
      renderedArticle,
    },
  };
}
