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
      </Head>
      <body className="min-h-screen font-sans text-slate-900 antialiased dark:text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
