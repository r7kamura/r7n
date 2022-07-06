import Link from "next/link";
import type { NextPage } from "next";
import { type Article, listArticles } from "../lib/article";
import Time from "../components/Time";
import CustomHead from "../components/CustomHead";
import { generateFeed } from "../lib/feed";
import fs from "fs";

type Props = {
  articles: Array<Article>;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <CustomHead
        description="日々の生活やプログラミングに関する情報を発信する、r7kamuraのウェブサイト"
        ogType="website"
        title="r7kamura.com"
      />
      <section>
        <p>
          日々の生活やプログラミングに関する情報を発信する、r7kamuraのウェブサイト。
        </p>
      </section>
      <section className="mt-12">
        <ol className="flex flex-col gap-12">
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
  if (process.env.ON_NEXT_BUILD) {
    fs.writeFileSync("public/feed.xml", await generateFeed());
  }

  return {
    props: {
      articles: listArticles(),
    },
  };
}
