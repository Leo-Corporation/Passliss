import Head from "next/head"
import { History20Regular } from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import Timeline from "@/components/timeline"

export default function ActivityPage() {
  const { t } = useTranslation("common") // default namespace (optional)
  let items: Activity[][] = [[]]
  function LoadActivities() {
    items = SortActivities(GetActivity())
  }
  LoadActivities()
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
      <PageContent page="activity">
        <div className="mb-2 flex items-center space-x-2">
          <History20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("activity")}</p>
        </div>
        <div>
          {items.map(
            (el, i) => el.length > 0 && <Timeline date={i} items={el} />
          )}
        </div>
      </PageContent>
    </Layout>
  )
}
