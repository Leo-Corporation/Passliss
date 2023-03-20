import { Router } from "next/dist/client/router"
import Head from "next/head"
import { History20Regular } from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import Timeline from "@/components/timeline"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function ActivityPage() {
  const { t } = useTranslation("common") // default namespace (optional)
  let items: Activity[][] = [[]]
  function LoadActivities() {
    items = SortActivities(GetActivity())
  }
  LoadActivities()

  function RemoveActivity() {
    localStorage.removeItem("activity")
    Router.prototype.reload()
  }

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
          {(items[0].length > 0 ||
            items[1].length > 0 ||
            items[2].length > 0 ||
            items[3].length > 0) && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="h-auto px-2 py-1 font-bold"
                  variant="destructiveghost"
                >
                  {t("activity-delete")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("activity")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("activity-delete-confirm")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={RemoveActivity}>
                    {t("yes")}
                  </AlertDialogAction>
                  <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <div>
          {items[0].length > 0 ||
          items[1].length > 0 ||
          items[2].length > 0 ||
          items[3].length > 0 ? (
            items.map(
              (el, i) => el.length > 0 && <Timeline date={i} items={el} />
            )
          ) : (
            <div className="mt-10 flex w-full flex-col items-center justify-center text-center">
              <p className="icon text-7xl">{"\uF47F"}</p>
              <h4 className="text-xl font-bold">{t("no-activity")}</h4>
              <p>{t("no-activity-desc")}</p>
            </div>
          )}
        </div>
      </PageContent>
    </Layout>
  )
}
