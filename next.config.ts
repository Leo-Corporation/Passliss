import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import withPWA from "next-pwa"

const nextConfig: NextConfig = {}

const withNextIntl = createNextIntlPlugin()
export default withPWA()(withNextIntl(nextConfig))
