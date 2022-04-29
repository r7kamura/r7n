import Link from "next/link";
import type { NextPage } from "next";
import { type Article, listArticles } from "../lib/article";
import Time from "../components/Time";

type Props = {
  articles: Array<Article>;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <section>
        <p>
          r7kamura.comは、作者の
          <a href="https://twitter.com/r7kamura">r7kamura</a>
          が、日々の生活やプログラミングに関する情報を共有するウェブサイトです。
        </p>
      </section>
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
    </>
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
