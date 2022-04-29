import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="r7kamura.com"
          href="/opensearch.xml"
        />
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
              <Link href="/about">
                <a>サイト案内</a>
              </Link>
            </li>
            <li>
              <a href="https://www.google.com/search?q=site:r7kamura.com">
                検索
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
