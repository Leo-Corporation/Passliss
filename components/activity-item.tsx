import {
  Checkmark16Regular,
  Copy16Regular,
  Delete16Regular,
  Dismiss16Regular,
  MoreHorizontal16Regular,
} from "@fluentui/react-icons"
import { DialogClose } from "@radix-ui/react-dialog"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import { GetPasswordStrength, getStrengthInfo } from "@/lib/password-strength"
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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
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
  advancedVision: boolean
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
          {props.advancedVision ? (
            <>
              {props.activity.content.split("").map((c, i) => (
                <StrengthCharacter char={c} key={i} />
              ))}
            </>
          ) : props.hide ? (
            GetHiddenPassword(props.activity.content)
          ) : (
            props.activity.content
          )}
        </p>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="hidden sm:block">
              <Dialog>
                <DialogTrigger>
                  {GetStrength(props.activity.content)}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <span className="flex">
                        {GetStrength(props.activity.content)}
                      </span>
                    </DialogTitle>
                    <div>
                      <p
                        className="text-center text-xl font-bold"
                        id="PasswordContainer"
                      >
                        {props.activity.content.split("").map((el, i) => (
                          <StrengthCharacter char={el} key={i} />
                        ))}
                      </p>
                      <div className="grid grid-cols-2">
                        <p className="font-bold text-[#FF2929]">
                          {t("uppercases")}
                        </p>
                        <p
                          className="font-bold text-[#FF2929]"
                          id="UppercaseTxt"
                        >
                          {getStrengthInfo(props.activity.content).uppercases}
                        </p>
                        <p className="font-bold text-[#3B8AFF]">
                          {t("lowercases")}
                        </p>
                        <p
                          className="font-bold text-[#3B8AFF]"
                          id="LowercaseTxt"
                        >
                          {getStrengthInfo(props.activity.content).lowercases}
                        </p>
                        <p className="font-bold text-[#007F5F]">{t("nbrs")}</p>
                        <p className="font-bold text-[#007F5F]" id="NumbersTxt">
                          {getStrengthInfo(props.activity.content).numbers}
                        </p>
                        <p className="font-bold text-[#9F2CF9]">
                          {t("specialchars")}
                        </p>
                        <p className="font-bold text-[#9F2CF9]" id="SpecialTxt">
                          {getStrengthInfo(props.activity.content).specialchars}
                        </p>
                        <p className="font-bold">{t("length")}</p>
                        <p className="font-bold" id="LengthTxt">
                          {props.activity.content.length}
                        </p>
                      </div>
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
                  {GetStrength(props.activity.content)}
                </span>
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-5">
              <p
                className="text-center text-xl font-bold"
                id="PasswordContainer"
              >
                {props.activity.content.split("").map((el, i) => (
                  <StrengthCharacter char={el} key={i} />
                ))}
              </p>
              <div className="grid grid-cols-2">
                <p className="font-bold text-[#FF2929]">{t("uppercases")}</p>
                <p className="font-bold text-[#FF2929]" id="UppercaseTxt">
                  {getStrengthInfo(props.activity.content).uppercases}
                </p>
                <p className="font-bold text-[#3B8AFF]">{t("lowercases")}</p>
                <p className="font-bold text-[#3B8AFF]" id="LowercaseTxt">
                  {getStrengthInfo(props.activity.content).lowercases}
                </p>
                <p className="font-bold text-[#007F5F]">{t("nbrs")}</p>
                <p className="font-bold text-[#007F5F]" id="NumbersTxt">
                  {getStrengthInfo(props.activity.content).numbers}
                </p>
                <p className="font-bold text-[#9F2CF9]">{t("specialchars")}</p>
                <p className="font-bold text-[#9F2CF9]" id="SpecialTxt">
                  {getStrengthInfo(props.activity.content).specialchars}
                </p>
                <p className="font-bold">{t("length")}</p>
                <p className="font-bold" id="LengthTxt">
                  {props.activity.content.length}
                </p>
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={Copy}>{t("copy")}</Button>
              <div className="grid grid-cols-[1fr,auto] space-x-2">
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
