import Link from "next/link";
import type { NextPage } from "next";
import CustomHead from "../components/CustomHead";

const pageTitle = "サイト案内";

const ShowSiteGuide: NextPage = () => {
  return (
    <article>
      <CustomHead
        description="このサイトについて。"
        ogType="article"
        title={pageTitle}
      />
      <h1>{pageTitle}</h1>
      <p>
        r7kamura.comは、作者の
        <a href="https://twitter.com/r7kamura">r7kamura</a>
        が、日々の生活やプログラミングに関する情報を共有するウェブサイトです。
      </p>
      <h2>案内</h2>
      <p>
        <Link href="/feed.xml">
          <a>RSS</a>
        </Link>
        で更新情報を配信しています。お好きなフィードリーダーで購読してください。
        作者は<a href="https://feedly.com/">Feedly</a>を利用しています。
        Twitterで更新情報を投稿することもありますが、投稿しないこともあります。
      </p>
      <p>
        <a href="https://github.com/r7kamura/r7kamura.com">GitHub</a>
        でウェブサイトのソースコードを公開しています。
        作者の好みが移ろえば、実装言語も変わります。最初はRubyで、次はRust、現在はJavaScriptで実装されています。
      </p>
      <p>
        <a href="https://github.com/sponsors/r7kamura">GitHub Sponsors</a>
        で、このウェブサイトの運営や作者のOSS活動を後援していただける方を募集しています。
        主な制作物として、各種言語のライブラリや、ブラウザ拡張、Custom GitHub
        Actionなどがあります。 作者のお気に入りは、
        <a href="https://chrome.google.com/webstore/detail/amazon-url-shortener/bonkcfmjkpdnieejahndognlbogaikdg">
          AmazonのURLを勝手に整えるChrome拡張
        </a>
        です。
      </p>
      <p>
        このウェブサイトでは、商品を紹介するためにAmazon.co.jpアソシエイトを利用しています。
        また、Amazonで
        <a href="https://www.amazon.co.jp/gp/registry/wishlist/31WJYTS73D19K">
          ほしい物リスト
        </a>
        を公開しています。
      </p>
      <h2>作者</h2>
      <p>
        r7kamuraという名前で活動しています。この名前は、小学生の頃に親からメールアドレスをもらったときに付けました。発音するときは「あーるなかむら」、または「なかむら」と呼んでください。
      </p>
      <p>
        1989年に生まれ、高校の頃からプログラミングに興味を持ち、大学で情報工学を学び、幾つかの企業での業務経験を経て、現在はフリーランスとして働いています。
      </p>
      <h2>連絡先</h2>
      <p>
        ご連絡の際は、<a href="https://twitter.com/r7kamura">Twitter</a>
        または
        <a href="mailto:r7kamura@gmail.com">メール</a>
        にてご連絡ください。
      </p>
    </article>
  );
};

export default ShowSiteGuide;
