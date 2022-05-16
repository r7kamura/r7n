import Head from "next/head";
import settings from "../settings";
import { useRouter } from "next/router";

type Props = {
  description: string | null;
  imageUrl?: string | null;
  ogType: OgType;
  title: string;
};

type OgType = "article" | "website";

export default function CustomHead({
  description,
  imageUrl,
  ogType,
  title,
}: Props) {
  const canonicalUrl = `${settings.siteBaseUrl}${useRouter().asPath}`;
  return (
    <Head>
      <title>{title}</title>
      <link href={canonicalUrl} rel="canonical"></link>
      <meta name="description" content={description || ""} />
      <meta name="og:description" content={description || ""} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content={ogType} />
      <meta name="og:url" content={canonicalUrl} />
      <meta
        name="og:image"
        content={imageUrl || `${settings.siteBaseUrl}/default_og_image.jpg`}
      />
      <meta
        property="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
    </Head>
  );
}
