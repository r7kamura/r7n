import Link from "next/link";
import type { NextPage } from "next";
import { type Article, listArticles } from "../lib/article";
import Time from "../components/Time";

type Props = {
  articles: Array<Article>;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <section>
      <ol>
        {articles.map((article) => (
          <li key={article.name}>
            <Time date={article.date} />
            <Link href={`/articles/${article.name}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      articles: listArticles(),
    },
  };
}
