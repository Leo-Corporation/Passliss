import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { ThemeProvider } from "next-themes"

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
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <Nav locale={locale}>{children}</Nav>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
