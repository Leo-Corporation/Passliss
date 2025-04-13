import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"

import Nav from "@/components/nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Passliss",
  description:
    "Passliss is a web application that allows you to generate secure passwords, test the strength of exiting ones and more.",
  twitter: {
    card: "summary_large_image",
    title: "Passliss",
    description:
      "Passliss is a web application that allows you to generate secure passwords, test the strength of exiting ones and more.",
    creator: "@leocorpnews",
    images: [
      {
        url: "/images/social.png",
        alt: "Passliss",
      },
    ],
  },
  openGraph: {
    title: "Passliss",
    description:
      "Passliss is a web application that allows you to generate secure passwords, test the strength of exiting ones and more.",
    url: "https://passliss.com",
    siteName: "Passliss",
    images: [
      {
        url: "/images/social.png",
        alt: "Passliss",
      },
    ],
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { slug: string }
}>) {
  const locale = await getLocale()
  const t = await getTranslations()

  const { slug } = params
  console.log("slug:" + slug)

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Nav locale={locale}>{children}</Nav>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
