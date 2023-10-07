import { Copy24Regular, Delete16Regular } from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import { GetPasswordStrength } from "@/lib/password-strength"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export interface ActivityProps {
  activity: Activity
  hide: boolean
  index: number
  timeline_index: number
  deleteEvent: Function
}

export default function ActivityItem(props: ActivityProps) {
  function Copy() {
    navigator.clipboard.writeText(props.activity.content)
  }
  const { t } = useTranslation("common") // default namespace (optional)
  function GetHiddenPassword(password: string): string {
    let final: string = ""
    for (let i = 0; i < password.length; i++) {
      final += "•"
    }
    return final
  }
  let els: Activity[][] = [[]]
  function LoadActivities() {
    els = SortActivities(GetActivity())
  }
  function removeActivityItem() {
    LoadActivities()
    els[props.timeline_index].splice(props.index, 1)
    let a: any[] = []
    for (let i = 0; i < els.length; i++) {
      for (let j = 0; j < els[i].length; j++) {
        a.push(els[i][j])
      }
    }
    console.log(a)
    localStorage.setItem("activity", JSON.stringify({ items: a }))
    props.deleteEvent()
  }
  return (
    <div
      onClick={Copy}
      className="m-3 grid cursor-pointer grid-cols-1 rounded-lg border border-slate-400 p-3 hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-900 sm:cursor-default sm:grid-cols-2"
    >
      <div className="grid grid-cols-[1fr,auto] items-center justify-items-start">
        <p className="font-bold">
          {props.hide
            ? GetHiddenPassword(props.activity.content)
            : props.activity.content}
        </p>
        {GetStrength(props.activity.content)}
      </div>
      <div className="hidden justify-end space-x-1 sm:flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-[48px]" onClick={Copy}>
                <Copy24Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("copy")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={removeActivityItem}
                variant="outline"
                className="w-[48px]"
              >
                <Delete16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("delete")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

function GetStrength(password) {
  let strength = GetPasswordStrength(password)
  const { t } = useTranslation("common")
  switch (strength) {
    case 0:
      return (
        <p className="m-1 w-auto rounded-full border border-[red] px-2 text-center text-sm font-semibold text-[red]">
          {t("low")}
        </p>
      )
    case 1:
      return (
        <p className="m-1 w-auto rounded-full border border-[#FF7B00] px-2 text-sm font-semibold text-[#FF7B00]">
          {t("medium")}
        </p>
      )
    case 2:
      return (
        <p className="m-1 w-auto rounded-full border border-[#68EA00] px-2 text-center text-sm font-semibold text-[#68EA00]">
          {t("good")}
        </p>
      )
    case 3:
      return (
        <p className="m-1 w-auto rounded-full border border-[#00BF07] px-2 text-center text-sm font-semibold text-[#00BF07]">
          {t("excellent")}
        </p>
      )

    default:
      return (
        <p className="text-md m-1 w-auto rounded-full border border-[red] px-2 text-center font-semibold text-[red]">
          {t("low")}
        </p>
      )
  }
}
