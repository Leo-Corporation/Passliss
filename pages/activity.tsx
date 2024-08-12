import { useState } from "react"
import { Router } from "next/dist/client/router"
import Head from "next/head"
import {
  Eye16Regular,
  EyeOff16Regular,
  History20Regular,
  Info16Regular,
} from "@fluentui/react-icons"
import { PopoverClose } from "@radix-ui/react-popover"
import useTranslation from "next-translate/useTranslation"

import { Activities, Activity } from "@/types/activity"
import { Settings } from "@/types/settings"
import { GetActivity, GetSettings, SortActivities } from "@/lib/browser-storage"
import { PasswordStrength } from "@/lib/password-gen"
import { GetPasswordStrength } from "@/lib/password-strength"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ActivityPage() {
  const [filter, setFilter] = useState("all")
  const [visionToggle, setVisionToggle] = useState(false)
  let settings: Settings = undefined
  function LoadSettings() {
    settings = GetSettings()
    if (settings.hidePassword == null || settings.hidePassword == undefined) {
      settings.hidePassword = false
    }
  }
  LoadSettings()
  const { t } = useTranslation("common") // default namespace (optional)
  let items: Activity[][] = [[]]
  let activity: Activities = GetActivity()
  const [total, setTotal] = useState(activity.items.length)
  const [low, setLow] = useState(getAmountByStrength(PasswordStrength.Low))
  const [medium, setMedium] = useState(
    getAmountByStrength(PasswordStrength.Medium)
  )
  const [good, setGood] = useState(getAmountByStrength(PasswordStrength.Good))
  const [excellent, setExcellent] = useState(
    getAmountByStrength(PasswordStrength.VeryGood)
  )

  function getAmountByStrength(strength: PasswordStrength) {
    let amount = 0
    for (let i = 0; i < activity.items.length; i++) {
      if (GetPasswordStrength(activity.items[i].content) === strength) {
        amount++
      }
    }
    return amount
  }

  function LoadActivities() {
    activity = GetActivity()
    items = SortActivities(activity)
  }
  LoadActivities()
  const [hasItems, setHasItems] = useState(
    items[0].length > 0 ||
      items[1].length > 0 ||
      items[2].length > 0 ||
      items[3].length > 0
  )

  function refreshItems() {
    LoadActivities()
    setHasItems(
      items[0].length > 0 ||
        items[1].length > 0 ||
        items[2].length > 0 ||
        items[3].length > 0
    )
    activity = GetActivity()
    setTotal(total - 1)
    setLow(getAmountByStrength(PasswordStrength.Low))
    setMedium(getAmountByStrength(PasswordStrength.Medium))
    setGood(getAmountByStrength(PasswordStrength.Good))
    setExcellent(getAmountByStrength(PasswordStrength.VeryGood))
  }

  function RemoveActivity() {
    localStorage.removeItem("activity")
    activity = GetActivity()
    setTotal(total - 1)
    Router.prototype.reload()
  }
  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="activity">
        <div className="mb-2 flex items-center space-x-2">
          <Info16Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("overview")}</p>
        </div>
        <div className="flex flex-wrap gap-2 py-2">
          <Card className="min-w-64">
            <CardHeader className="flex flex-row items-center pb-2">
              <CardTitle className="text-sm font-medium">
                {t("total")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{total}</p>
            </CardContent>
          </Card>
          <Card className="min-w-64">
            <CardHeader className="flex flex-row items-center pb-2">
              <CardTitle className="text-sm font-medium">{t("low")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{low}</p>
            </CardContent>
          </Card>
          <Card className="min-w-64">
            <CardHeader className="flex flex-row items-center pb-2">
              <CardTitle className="text-sm font-medium">
                {t("medium")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{medium}</p>
            </CardContent>
          </Card>
          <Card className="min-w-64">
            <CardHeader className="flex flex-row items-center pb-2">
              <CardTitle className="text-sm font-medium">{t("good")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{good}</p>
            </CardContent>
          </Card>
          <Card className="min-w-64">
            <CardHeader className="flex flex-row items-center pb-2">
              <CardTitle className="text-sm font-medium">
                {t("excellent")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{excellent}</p>
            </CardContent>
          </Card>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <History20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("activity")}</p>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="h-auto px-2 py-1">
                {t("filter")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex items-center space-x-2">
              <p>{t("filter")}</p>
              <Select onValueChange={setFilter}>
                <SelectTrigger defaultValue="all" className="h-auto w-[180px]">
                  <SelectValue
                    placeholder={t(
                      filter === "verygood" ? "excellent" : filter
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="low">{t("low")}</SelectItem>
                  <SelectItem value="medium">{t("medium")}</SelectItem>
                  <SelectItem value="good">{t("good")}</SelectItem>
                  <SelectItem value="verygood">{t("excellent")}</SelectItem>
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setVisionToggle(!visionToggle)
                  }}
                  variant="outline"
                  className="h-[30px] px-2 py-1"
                >
                  {visionToggle ? <EyeOff16Regular /> : <Eye16Regular />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("advanced-vision")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {hasItems && (
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
          {hasItems ? (
            items.map(
              (el, i) =>
                el.length > 0 && (
                  <Timeline
                    filter={filter}
                    refreshEvent={refreshItems}
                    index={i}
                    date={i}
                    items={el}
                    advancedVision={visionToggle}
                    hide={
                      settings.hidePassword != null &&
                      settings.hidePassword != undefined
                        ? settings.hidePassword
                        : false
                    }
                  />
                )
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
