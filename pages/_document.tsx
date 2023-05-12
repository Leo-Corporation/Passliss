import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000014"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href="/images/icon-512x512.png"></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/social.png" />
        <meta
          name="twitter:description"
          content="Passliss is a web application that allows you to generate secure passwords, test the strength of exiting ones and more."
        />
        <meta name="twitter:title" content="Passliss" />
        <meta
          property="og:description"
          content="Passliss is a web application that allows you to generate secure passwords, test the strength of exiting ones and more."
        />
        <meta property="og:image" content="/images/social.png" />
        <meta property="og:title" content="Passliss" />

        <meta
          name="description"
          content="Passliss is a web application that allows you to generate secure passwords, test the strength of exiting ones and more."
        />
      </Head>
      <body className="min-h-screen font-sans text-slate-900 antialiased dark:text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
