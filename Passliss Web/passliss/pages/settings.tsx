import Head from "next/head"

import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import useTranslation from 'next-translate/useTranslation'
import { Settings20Regular } from "@fluentui/react-icons"


export default function EncryptionPage() {
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
            <PageContent page="settings">
                <div className="flex space-x-2 items-center mb-2">
                    <Settings20Regular primaryFill="#0088FF" className="text-white" />

                    <p className="ml-2">{t("settings")}</p>
                </div>
            </PageContent>
        </Layout>
    )
}