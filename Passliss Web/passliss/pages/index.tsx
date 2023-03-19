import Head from "next/head"
import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"
import InstallButton from "@/components/ui/install-btn"

export default function IndexPage() {
  const { t } = useTranslation("common") // default namespace (optional)

  return (
    <Layout>
      <Head>
        <title>Passliss</title>
        <meta
          name="description"
          content="Passliss is a simple yet modern password generator."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="m-2">{t("desc")}</p>

        <div className="flex space-x-2 items-center">
          <InstallButton />

          <Link
            href="/home"
            className={
              buttonVariants({
                variant: "outline",
                size: "lg",
              }) + " font-bold text-lg m-2"
            }
          >
            {t("launch")}
          </Link>
        </div>
      </section>
    </Layout>
  )
}
