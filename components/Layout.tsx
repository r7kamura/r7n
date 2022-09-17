import Head from "next/head";
import Link from "next/link";
import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 dark:text-gray-100">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="r7kamura.com"
          href="/opensearch.xml"
        />
      </Head>
      <header className="bg-gray-50 dark:bg-gray-800">
        <nav className="container mx-auto max-w-2xl px-4 py-12">
          <p>
            <Link href="/">
              <a className="font-bold text-gray-900 visited:text-gray-900 dark:text-gray-300 dark:visited:text-gray-300">
                r7kamura.com
              </a>
            </Link>
          </p>
        </nav>
      </header>
      <main className="bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-2xl px-4 py-12">{children}</div>
      </main>
      <footer className="container mx-auto max-w-2xl px-4 py-12 text-sm leading-loose">
        <nav>
          <ul className="list-disc ml-4">
            {[
              {
                url: "/",
                text: "ホーム",
              },
              {
                url: "/articles",
                text: "記事一覧",
              },
              {
                url: "/about",
                text: "このサイトについて",
              },
            ].map(({ text, url }) => {
              return (
                <li key={url}>
                  <Link href={url}>
                    <a className="text-gray-900 visited:text-gray-900 dark:text-gray-300 dark:visited:text-gray-300">
                      {text}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </footer>
    </div>
  );
}
