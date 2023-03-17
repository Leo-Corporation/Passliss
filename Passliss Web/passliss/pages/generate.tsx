import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"
import { PageContent } from "@/components/page"
import useTranslation from 'next-translate/useTranslation'


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
            <PageContent>

            </PageContent>
        </Layout>
    )
}
