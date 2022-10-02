import Link from "next/link";
import type { NextPage } from "next";
import CustomHead from "../components/CustomHead";

const pageTitle = "このサイトについて";

const ShowSiteGuide: NextPage = () => {
  return (
    <article className="markdown">
      <CustomHead
        description="このサイトについて"
        ogType="article"
        title={pageTitle}
      />
      <h1>{pageTitle}</h1>
      <p>
        r7kamura.comは、日々の生活やプログラミングに関する情報を発信する、
        <a href="https://twitter.com/r7kamura">r7kamura</a>
        のウェブサイトです。
      </p>
      <h2>作者情報</h2>
      <p>
        r7kamuraという名前で活動しています。この名前は、小学生の頃に親からメールアドレスをもらったときに付けました。発音するときは「あーるなかむら」、または「なかむら」と呼んでください。
      </p>
      <p>
        1989年に生まれ、高校の頃からプログラミングに興味を持ち、大学で情報工学を学び、幾つかの企業での業務経験を経て、現在はフリーランスとして働いています。
        ウェブサービス開発のフロントエンド・バックエンド共に10年以上の実務経験があります。現在は技術基盤的な部分に興味を持ち、開発体験向上のための仕事に注力しています。
      </p>
      <p>
        ご連絡の際は、<a href="https://twitter.com/r7kamura">Twitter</a>
        または
        <a href="mailto:r7kamura@gmail.com">メール</a>
        にてご連絡ください。
      </p>
      <h2>ご案内</h2>
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
        作者の好みに応じて、実装言語がよく変わります。最初はRubyで、次はRust、現在はJavaScriptで実装されています。
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
    </article>
  );
};

export default ShowSiteGuide;
