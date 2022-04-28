import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { type Article, listArticles } from "../lib/article";
import Time from "../components/Time";

type Props = {
  articles: Array<Article>;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <section>
        <ol className={styles.articles}>
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
