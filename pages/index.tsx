import Link from "next/link";
import type { NextPage } from "next";
import {
  listArticles,
  renderArticle,
  type RenderedArticle,
} from "../lib/article";
import Time from "../components/Time";
import CustomHead from "../components/CustomHead";
import { generateFeed } from "../lib/feed";
import fs from "fs";

type Props = {
  articles: Array<RenderedArticle>;
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
        <ol className="flex flex-col gap-12">
          {articles.map((article) => (
            <li key={article.name}>
              <Time date={article.date} />
              <Link href={`/articles/${article.name}`}>
                <a>{article.title}</a>
              </Link>
              <p>{article.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-20">
          <Link href="/articles">
            <a className="before:content-['»_']">すべての記事一覧へ</a>
          </Link>
        </p>
      </section>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  if (process.env.ON_NEXT_BUILD) {
    fs.writeFileSync("public/feed.xml", await generateFeed());
  }

  let articles: Array<RenderedArticle> = await Promise.all(
    listArticles()
      .slice(0, 7)
      .map(async (article) => {
        return await renderArticle(article);
      })
  );

  return {
    props: {
      articles,
    },
  };
}
