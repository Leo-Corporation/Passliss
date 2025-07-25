"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  History20Regular,
  Home20Regular,
  List20Regular,
  LockClosed20Regular,
  Settings20Regular,
  Shield20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const t = useTranslations()
  // Get the current page
  const currentPage = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={currentPage === "/" ? "bg-accent" : ""}
              size="lg"
              asChild
            >
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home20Regular className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{t("title")}</span>
                  <span className="truncate text-xs">{t("home")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("pinned")}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/activity">
                <SidebarMenuButton
                  className={currentPage === "/activity" ? "bg-accent" : ""}
                >
                  <History20Regular />
                  {t("activity")}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/presets">
                <SidebarMenuButton
                  className={currentPage === "/presets" ? "bg-accent" : ""}
                >
                  <List20Regular />
                  {t("presets")}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("tools")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/generate">
                  <SidebarMenuButton
                    className={currentPage === "/generate" ? "bg-accent" : ""}
                  >
                    <LockClosed20Regular />
                    {t("generate")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/strength">
                  <SidebarMenuButton
                    className={currentPage === "/strength" ? "bg-accent" : ""}
                  >
                    <Shield20Regular />
                    {t("strength")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/encryption">
                  <SidebarMenuButton
                    className={currentPage === "/encryption" ? "bg-accent" : ""}
                  >
                    <Translate20Regular />
                    {t("encryption")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings">
              <SidebarMenuButton
                className={currentPage === "/settings" ? "bg-accent" : ""}
                size="lg"
              >
                <Settings20Regular />
                {t("settings")}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
