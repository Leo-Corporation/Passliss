import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { ThemeProvider } from "next-themes"

import { AppSidebar } from "@/components/nav"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icon-512x512.png" />
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger className="-ml-1" />
                </header>
                <main className="p-5">{children}</main>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
