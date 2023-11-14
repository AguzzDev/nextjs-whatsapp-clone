import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Whatsapp Clone</title>
        <meta name="description" content="Realtime Messaging App" />
        <link rel="icon" href="/whatsappLogo.svg" />

        <meta
          property="og:url"
          content="https://whatsapp-app.agustin-ribotta.xyz"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Whatsapp Clone" />
        <meta property="og:description" content="Realtime Messaging App" />
        <meta property="og:image" content="/wspimage.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="whatsapp-app.agustin-ribotta.xyz"
        />
        <meta
          property="twitter:url"
          content="https://whatsapp-app.agustin-ribotta.xyz"
        />
        <meta name="twitter:title" content="Whatsapp Clone" />
        <meta name="twitter:description" content="Realtime Messaging App" />
        <meta name="twitter:image" content="/wspimage.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
