import {
  Checkmark12Regular,
  Checkmark16Regular,
  Copy16Regular,
  Delete16Regular,
  Dismiss16Regular,
  MoreHorizontal16Regular,
} from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import { GetPasswordStrength, getStrengthInfo } from "@/lib/password-strength"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
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
      className="m-3 grid cursor-pointer grid-cols-2 rounded-lg border border-slate-400 p-3 hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-900 sm:cursor-default"
    >
      <div className="grid grid-cols-[1fr,auto] items-center justify-items-start">
        <p className="font-bold">
          {props.hide
            ? GetHiddenPassword(props.activity.content)
            : props.activity.content}
        </p>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="hidden sm:block">
              {GetStrength(props.activity.content)}
            </TooltipTrigger>
            <TooltipContent className="grid grid-cols-[24px,1fr] items-center">
              {getStrengthInfo(props.activity.content).lowercases > 0 ? (
                <Checkmark16Regular />
              ) : (
                <Dismiss16Regular />
              )}

              <p>{t("lowercases")}</p>

              {getStrengthInfo(props.activity.content).uppercases > 0 ? (
                <Checkmark16Regular />
              ) : (
                <Dismiss16Regular />
              )}

              <p>{t("uppercases")}</p>

              {getStrengthInfo(props.activity.content).numbers > 0 ? (
                <Checkmark16Regular />
              ) : (
                <Dismiss16Regular />
              )}

              <p>{t("nbrs")}</p>

              {getStrengthInfo(props.activity.content).specialchars > 0 ? (
                <Checkmark16Regular />
              ) : (
                <Dismiss16Regular />
              )}

              <p>{t("specialchars")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-end space-x-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="hidden w-[48px] sm:block"
                onClick={Copy}
              >
                <Copy16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("copy")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={removeActivityItem}
                variant="outline"
                className="hidden w-[48px] sm:block"
              >
                <Delete16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("delete")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="block w-[48px] sm:hidden">
              <MoreHorizontal16Regular />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {GetStrength(props.activity.content)}
            <DropdownMenuItem onClick={() => Copy()} className="flex space-x-1">
              <Copy16Regular />
              <p>{t("copy")}</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => removeActivityItem()}
              className="flex space-x-1"
            >
              <Delete16Regular />
              <p>{t("delete")}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
