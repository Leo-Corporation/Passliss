import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"
import { PageContent } from "@/components/page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
            <PageContent page="generate">
                <Tabs defaultValue="simple" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="simple">{t("simple")}</TabsTrigger>
                        <TabsTrigger value="advanced">{t("advanced")}</TabsTrigger>
                    </TabsList>
                    <TabsContent className="border-none" value="simple">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Simple
                        </p>
                    </TabsContent>
                    <TabsContent className="border-none" value="advanced">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Advanced
                        </p>

                    </TabsContent>
                </Tabs>
            </PageContent>
        </Layout>
    )
}
