import Link from "next/link"
import {
  History20Filled,
  Home20Filled,
  LockClosed20Regular,
  Navigation24Regular,
  Settings20Filled,
  Shield20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import InstallSection from "./install-app"
import { Button, buttonVariants } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export interface PageProps {
  children: React.ReactNode
  page: string
}

export function PageContent({ children, page }: PageProps) {
  const { t } = useTranslation("common")

  function GetWelcomeMessage(): string {
    let hour = new Date().getHours() // Get the current hour
    if (hour >= 21 || hour < 7) {
      // If between 9PM & 7AM
      return t("night") // Return the correct value
    } else if (hour >= 7 && hour <= 12) {
      // If between 7AM - 12PM
      return t("hello") // Return the correct value
    } else if (hour >= 12 && hour <= 17) {
      // If between 12PM - 5PM
      return t("afternoon") // Return the correct value
    } else if (hour >= 17 && hour <= 21) {
      // If between 5PM - 9PM
      return t("evening") // Return the correct value
    }
  }

  function SetHeight() {
    if (typeof document !== "undefined") {
      let header = document.querySelector("header")
      if (!header) return

      let headerHeight = header.clientHeight
      let height = document.documentElement.clientHeight
      document.documentElement.style.setProperty(
        "--content-h",
        `${height - headerHeight}px`
      )
    }
  }
  SetHeight()

  if (typeof document !== "undefined") {
    onresize = () => {
      SetHeight()
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <header className="flex space-x-2 p-2 pt-5">
        <Sheet>
          <SheetTrigger>
            <Button className="md:hidden" variant="ghost">
              <Navigation24Regular />
            </Button>
          </SheetTrigger>
          <SheetContent position="left" size="content">
            <nav>
              <h3 className="m-2 text-xs font-bold">{t("pinned")}</h3>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: page == "home" ? "navselect" : "nav",
                  className:
                    "mx-2 my-1 h-auto w-full pl-0 pr-3 text-black dark:text-white",
                })}
                href={"/home"}
              >
                <div className="from-accent rounded-lg bg-gradient-to-br to-[#2153E0] p-1">
                  <Home20Filled className="text-white" />
                </div>
                <p className="ml-2 font-bold">{t("home")}</p>
              </Link>

              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: page == "activity" ? "navselect" : "nav",
                  className:
                    " mx-2 my-1 h-auto w-full pl-0 pr-3 text-black dark:text-white",
                })}
                href={"/activity"}
              >
                <div className="rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#9A21E0] p-1">
                  <History20Filled className="text-white" />
                </div>
                <p className="ml-2 font-bold">{t("activity")}</p>
              </Link>

              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: page == "settings" ? "navselect" : "nav",
                  className:
                    " mx-2 my-1 h-auto w-full pl-0 pr-3 text-black dark:text-white",
                })}
                href={"/settings"}
              >
                <div className="rounded-lg bg-gradient-to-br from-[#B1B1B1] to-[#343C51] p-1">
                  <Settings20Filled className="text-white" />
                </div>
                <p className="ml-2 font-bold">{t("settings")}</p>
              </Link>
              <h3 className="m-2 text-xs font-bold">{t("tools")}</h3>
              <Link
                className={buttonVariants({
                  size: "nav",
                  variant: page == "generate" ? "navselect2" : "nav2",
                  className: "text-accent mx-2 my-1 w-full",
                })}
                href={"/generate"}
              >
                <LockClosed20Regular />

                <p className="ml-2 font-bold">{t("generate")}</p>
              </Link>
              <Link
                className={buttonVariants({
                  size: "nav",
                  variant: page == "strength" ? "navselect2" : "nav2",
                  className: "text-accent mx-2 my-1 w-full",
                })}
                href={"/strength"}
              >
                <Shield20Regular />

                <p className="ml-2 font-bold">{t("strength")}</p>
              </Link>
              <Link
                className={buttonVariants({
                  size: "nav",
                  variant: page == "crypt" ? "navselect2" : "nav2",
                  className: "text-accent mx-2 my-1 w-full",
                })}
                href={"/encryption"}
              >
                <Translate20Regular />

                <p className="ml-2 font-bold">{t("encryption")}</p>
              </Link>
              <InstallSection />
            </nav>
          </SheetContent>
        </Sheet>
        <div>
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="font-bold">{GetWelcomeMessage()}</p>
        </div>
      </header>
      <section className="grid grid-cols-4 xl:grid-cols-5">
        <ScrollArea className="md:h-scroll">
          <nav className="m-2 mr-10 hidden md:block">
            <h3 className="m-2 mt-0 text-xs font-bold">{t("pinned")}</h3>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: page == "home" ? "navselect" : "nav",
                className:
                  "mx-2 my-1 h-auto w-full pl-0 pr-3 text-black dark:text-white",
              })}
              href={"/home"}
            >
              <div className="from-accent rounded-md bg-gradient-to-br to-[#2153E0] p-[5px]">
                <Home20Filled className="text-white" />
              </div>
              <p className="ml-2 font-bold">{t("home")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: page == "activity" ? "navselect" : "nav",
                className:
                  " mx-2 my-1 h-auto w-full pl-0 pr-3 text-black dark:text-white",
              })}
              href={"/activity"}
            >
              <div className="rounded-md bg-gradient-to-br from-[#6F00FF] to-[#9A21E0] p-[5px]">
                <History20Filled className="text-white" />
              </div>
              <p className="ml-2 font-bold">{t("activity")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: page == "settings" ? "navselect" : "nav",
                className:
                  " mx-2 my-1 h-auto w-full pl-0 pr-3 text-black dark:text-white",
              })}
              href={"/settings"}
            >
              <div className="rounded-md bg-gradient-to-br from-[#B1B1B1] to-[#343C51] p-[5px]">
                <Settings20Filled className="text-white" />
              </div>
              <p className="ml-2 font-bold">{t("settings")}</p>
            </Link>
            <h3 className="m-2 text-xs font-bold">{t("tools")}</h3>
            <Link
              className={buttonVariants({
                size: "nav",
                variant: page == "generate" ? "navselect2" : "nav2",
                className: "text-accent mx-2 my-1 w-full",
              })}
              href={"/generate"}
            >
              <LockClosed20Regular />
              <p className="ml-2 font-bold">{t("generate")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "nav",
                variant: page == "strength" ? "navselect2" : "nav2",
                className: "text-accent mx-2 my-1 w-full",
              })}
              href={"/strength"}
            >
              <Shield20Regular />
              <p className="ml-2 font-bold">{t("strength")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "nav",
                variant: page == "crypt" ? "navselect2" : "nav2",
                className: "text-accent mx-2 my-1 w-full",
              })}
              href={"/encryption"}
            >
              <Translate20Regular />
              <p className="ml-2 font-bold">{t("encryption")}</p>
            </Link>
            <InstallSection />
          </nav>
        </ScrollArea>
        <ScrollArea className="h-scroll col-span-5 p-2 md:col-start-2">
          {children}
        </ScrollArea>
      </section>
    </div>
  )
}
