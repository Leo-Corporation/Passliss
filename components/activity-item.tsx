import {
  Checkmark16Regular,
  Copy16Regular,
  Delete16Regular,
  Dismiss16Regular,
  MoreHorizontal16Regular,
} from "@fluentui/react-icons"
import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"

import { Activity, getActivity, sortActivities } from "@/lib/browser-storage"
import {
  getPasswordStrength,
  getStrengthInfo,
  PasswordStrength,
} from "@/lib/password"
import PasswordAnalysis from "./password-analysis"
import PasswordStats from "./password-stats"
import StrengthCharacter from "./strength-character"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
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
  deleteEvent: () => void
  advancedVision: boolean
}

export default function ActivityItem(props: ActivityProps) {
  const passwordStats = getStrengthInfo(props.activity.content)
  function Copy() {
    navigator.clipboard.writeText(props.activity.content)
  }
  const t = useTranslations()
  function getHiddenPassword(password: string): string {
    let final: string = ""
    for (let i = 0; i < password.length; i++) {
      final += "•"
    }
    return final
  }
  let els: Activity[][] = [[]]
  function loadActivities() {
    els = sortActivities(getActivity())
  }
  function removeActivityItem() {
    loadActivities()
    els[props.timeline_index].splice(props.index, 1)
    const a: Activity[] = []
    for (let i = 0; i < els.length; i++) {
      for (let j = 0; j < els[i].length; j++) {
        a.push(els[i][j])
      }
    }
    console.log(a)
    localStorage.setItem("activity", JSON.stringify({ items: a }))
    props.deleteEvent()
  }

  function getStrength(password: string) {
    const strength = getPasswordStrength(password)
    switch (strength) {
      case PasswordStrength.VeryWeak:
        return (
          <p className="m-1 w-auto rounded-full border border-red-500 px-2 text-center text-sm font-semibold text-red-600">
            {t("very-weak")}
          </p>
        )
      case PasswordStrength.Weak:
        return (
          <p className="m-1 w-auto rounded-full border border-orange-500 px-2 text-center text-sm font-semibold text-orange-500">
            {t("weak")}
          </p>
        )
      case PasswordStrength.Moderate:
        return (
          <p className="m-1 w-auto rounded-full border border-yellow-500 px-2 text-sm font-semibold text-yellow-500">
            {t("moderate")}
          </p>
        )
      case PasswordStrength.Strong:
        return (
          <p className="m-1 w-auto rounded-full border border-green-500 px-2 text-center text-sm font-semibold text-green-600">
            {t("strong")}
          </p>
        )
      case PasswordStrength.VeryStrong:
        return (
          <p className="m-1 w-auto rounded-full border border-emerald-500 px-2 text-center text-sm font-semibold text-emerald-500">
            {t("very-strong")}
          </p>
        )

      default:
        return (
          <p className="text-md m-1 w-auto rounded-full border border-red-500 px-2 text-center font-semibold text-red-600">
            {t("weak")}
          </p>
        )
    }
  }

  return (
    <div
      onClick={Copy}
      className="m-3 grid cursor-pointer grid-cols-2 rounded-lg border border-slate-200 p-3 shadow-xs hover:bg-slate-100 sm:cursor-default dark:border-slate-600 dark:hover:bg-slate-900"
    >
      <div className="grid grid-cols-[1fr_auto] items-center justify-items-start">
        <p className="font-bold">
          {props.advancedVision ? (
            <>
              {props.activity.content.split("").map((c, i) => (
                <StrengthCharacter char={c} key={i} />
              ))}
            </>
          ) : props.hide ? (
            getHiddenPassword(props.activity.content)
          ) : (
            props.activity.content
          )}
        </p>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="hidden sm:block">
              <Dialog>
                <DialogTrigger>
                  {getStrength(props.activity.content)}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <span className="flex">
                        {getStrength(props.activity.content)}
                      </span>
                    </DialogTitle>
                    <div>
                      <PasswordAnalysis
                        generatedPassword={props.activity.content}
                      />
                      <PasswordStats
                        showLength
                        className="mt-4"
                        passwordAnalysis={passwordStats}
                      />
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <Button
                          onClick={Copy}
                          className="h-auto px-2 py-1"
                          variant="default"
                        >
                          {t("copy")}
                        </Button>
                        <DialogClose>
                          <Button
                            className="h-auto px-2 py-1"
                            variant="outline"
                          >
                            {t("close")}
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent className="grid grid-cols-[24px_1fr] items-center">
              {getStrengthInfo(props.activity.content).lowercase > 0 ? (
                <Checkmark16Regular />
              ) : (
                <Dismiss16Regular />
              )}

              <p>{t("lowercases")}</p>

              {getStrengthInfo(props.activity.content).uppercase > 0 ? (
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

              {getStrengthInfo(props.activity.content).special > 0 ? (
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
                className="hidden w-[48px] items-center justify-center sm:flex"
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
                className="hidden w-[48px] items-center justify-center sm:flex"
              >
                <Delete16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("delete")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Drawer>
          <DrawerTrigger>
            <Button variant="outline" className="block w-[48px] sm:hidden">
              <MoreHorizontal16Regular />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <span className="flex justify-center">
                  {getStrength(props.activity.content)}
                </span>
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-5">
              <PasswordAnalysis generatedPassword={props.activity.content} />
              <PasswordStats
                showLength
                className="mt-4"
                passwordAnalysis={passwordStats}
              />
            </div>
            <DrawerFooter>
              <Button onClick={Copy}>{t("copy")}</Button>
              <div className="grid grid-cols-[1fr_auto] space-x-2">
                <DrawerClose>
                  <Button className="w-full" variant="outline">
                    {t("close")}
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button
                    variant="outline"
                    onClick={() => removeActivityItem()}
                  >
                    <Delete16Regular />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
