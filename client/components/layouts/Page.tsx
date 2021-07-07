import { useColorMode } from "@chakra-ui/react";
import { useBrowserColorScheme } from "client/hooks/useBrowserColorScheme";
import Head from "next/head";
import { useEffect } from "react";

type Meta = {
  title: string;
  description: string;
  image?: string;
  url?: string;
};

type Props = {
  meta: Meta;
  children: JSX.Element;
};

export function Page({ children, meta }: Props) {
  const { browserColorScheme } = useBrowserColorScheme();
  const { title, description, image, url = process.env.SITE_URL } = meta;
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        {/* <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} /> */}
        {/* <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} /> */}
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="shortcut icon" href={`/favicon-${browserColorScheme}.png`} />
        <link
          rel="stylesheet"
          media="screen"
          href="https://fontlibrary.org//face/now"
          type="text/css"
        />
        {/* {image && (
          <meta
            property="og:image"
            content={image.startsWith('https://') ? image : `${SITE_URL}${image}`}
          />
        )} */}
      </Head>
      {children}
    </>
  );
}
