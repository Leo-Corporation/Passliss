import withPWA from "next-pwa"
import nextTranslate from "next-translate-plugin"

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default pwa(nextTranslate(nextConfig))
