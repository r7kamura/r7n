import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
      <Head>
        <meta name="color-scheme" content="light dark"/>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="r7kamura.com"
          href="/opensearch.xml"
        />
      </Head>
      <header className="container mx-auto max-w-2xl px-8 py-12">
        <nav>
          <p>
            <Link href="/">
              <a className="font-bold text-gray-900 visited:text-gray-900 dark:text-gray-300 dark:visited:text-gray-300">
                r7kamura.com
              </a>
            </Link>
          </p>
        </nav>
      </header>
      <main className="container mx-auto max-w-2xl px-8 py-12 shadow-md bg-white dark:bg-gray-900">
        {children}
      </main>
      <footer className="container mx-auto max-w-2xl px-8 py-12 text-sm">
        <nav>
          <ul className="flex flex-row gap-6 justify-center">
            {[
              {
                url: "/",
                text: "ホーム",
              },
              {
                url: "/about",
                text: "サイト案内",
              },
              {
                url: "https://www.google.com/search?q=site:r7kamura.com",
                text: "検索",
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
