"use client"

import { useState } from "react"
import { Router } from "next/dist/client/router"
import { useSettings } from "@/hooks/use-settings"
import {
  Eye16Regular,
  EyeOff16Regular,
  History20Regular,
  Info16Regular,
} from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

import {
  Activities,
  Activity,
  getActivity,
  sortActivities,
} from "@/lib/browser-storage"
import { getPasswordStrength, PasswordStrength } from "@/lib/password"
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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  const t = useTranslations()
  const { settings } = useSettings()

  const [filter, setFilter] = useState("all")
  const [visionToggle, setVisionToggle] = useState(false)

  let items: Activity[][] = [[]]
  let activity: Activities = getActivity()

  const [total, setTotal] = useState(activity.items.length)
  const [veryWeak, setVeryWeak] = useState(
    getAmountByStrength(PasswordStrength.VeryWeak)
  )
  const [weak, setWeak] = useState(getAmountByStrength(PasswordStrength.Weak))
  const [moderate, setModerate] = useState(
    getAmountByStrength(PasswordStrength.Moderate)
  )
  const [strong, setStrong] = useState(
    getAmountByStrength(PasswordStrength.Strong)
  )
  const [veryStrong, setVeryStrong] = useState(
    getAmountByStrength(PasswordStrength.VeryStrong)
  )

  function getAmountByStrength(strength: PasswordStrength) {
    let amount = 0
    for (let i = 0; i < activity.items.length; i++) {
      if (getPasswordStrength(activity.items[i].content) === strength) {
        amount++
      }
    }
    return amount
  }

  function loadActivities() {
    activity = getActivity()
    items = sortActivities(activity)
  }
  loadActivities()
  const [hasItems, setHasItems] = useState(
    items[0].length > 0 ||
      items[1].length > 0 ||
      items[2].length > 0 ||
      items[3].length > 0
  )

  function refreshItems() {
    loadActivities()
    setHasItems(
      items[0].length > 0 ||
        items[1].length > 0 ||
        items[2].length > 0 ||
        items[3].length > 0
    )
    activity = getActivity()
    setTotal(total - 1)
    setVeryWeak(getAmountByStrength(PasswordStrength.VeryWeak))
    setWeak(getAmountByStrength(PasswordStrength.Weak))
    setModerate(getAmountByStrength(PasswordStrength.Moderate))
    setStrong(getAmountByStrength(PasswordStrength.Strong))
    setVeryStrong(getAmountByStrength(PasswordStrength.VeryStrong))
  }

  function RemoveActivity() {
    localStorage.removeItem("activity")
    activity = getActivity()
    setTotal(total - 1)
    Router.prototype.reload()
  }
  return (
    <div>
      <div className="mb-2 flex items-center space-x-2">
        <Info16Regular primaryFill="#0088FF" className="text-white" />
        <p className="ml-2 font-bold">{t("overview")}</p>
      </div>
      <div className="flex flex-wrap gap-2 py-2">
        <Card className="min-w-full sm:min-w-64">
          <CardHeader>
            <CardDescription>{t("total")}</CardDescription>
            <CardTitle>{total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-w-full sm:min-w-64">
          <CardHeader>
            <CardDescription>{t("very-weak")}</CardDescription>
            <CardTitle>{veryWeak}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-w-full sm:min-w-64">
          <CardHeader>
            <CardDescription>{t("weak")}</CardDescription>
            <CardTitle>{weak}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-w-full sm:min-w-64">
          <CardHeader>
            <CardDescription>{t("moderate")}</CardDescription>
            <CardTitle>{moderate}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-w-full sm:min-w-64">
          <CardHeader>
            <CardDescription>{t("strong")}</CardDescription>
            <CardTitle>{strong}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-w-full sm:min-w-64">
          <CardHeader>
            <CardDescription>{t("very-strong")}</CardDescription>
            <CardTitle>{veryStrong}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="mb-2 flex items-center space-x-2">
        <History20Regular primaryFill="#0088FF" className="text-white" />
        <p className="ml-2 font-bold">{t("activity")}</p>
        <Popover>
          <PopoverTrigger>
            <Button className="h-auto px-2 py-1">{t("filter")}</Button>
          </PopoverTrigger>
          <PopoverContent className="flex items-center space-x-2">
            <p>{t("filter")}</p>
            <Select onValueChange={setFilter}>
              <SelectTrigger defaultValue="all" className="h-auto w-[180px]">
                <SelectValue
                  placeholder={t(
                    filter === "verygood" ? "very-strong" : filter
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="weak">{t("weak")}</SelectItem>
                <SelectItem value="moderate">{t("moderate")}</SelectItem>
                <SelectItem value="strong">{t("strong")}</SelectItem>
                <SelectItem value="verygood">{t("very-strong")}</SelectItem>
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
                variant="destructive"
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
                  key={i}
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
    </div>
  )
}
