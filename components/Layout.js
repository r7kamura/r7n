import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>r7kamura.com</title>
        <meta
          name="description"
          content="r7kamuraの生活やプログラミングに関するブログ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <p>
            <Link href="/">
              <a>r7kamura.com</a>
            </Link>
          </p>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>ホーム</a>
              </Link>
            </li>
            <li>
              <Link href="/sitemap">
                <a>サイト案内</a>
              </Link>
            </li>
            <li>
              <a
                href="https://www.google.com/search?q=site:r7kamura.com"
                target="_blank"
                rel="noreferrer"
              >
                検索
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
