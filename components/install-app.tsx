"use client"

import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { BeforeInstallPromptEvent } from "@/lib/before-install"
import { Button } from "./ui/button"

export default function InstallSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Save the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    })

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("PWA installed")
    })
  }, [])

  const handleClick = () => {
    // Show the install prompt
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted")
      } else {
        console.log("User dismissed")
      }
      // Reset deferred prompt variable
      setDeferredPrompt(null)
    })
  }
  const t = useTranslations()

  return (
    <div>
      {deferredPrompt && (
        <>
          <h3 className="m-2 text-xs font-bold">{t("app")}</h3>

          <Button
            variant="outline"
            className="w-full font-bold"
            onClick={handleClick}
          >
            {t("install")}
          </Button>
        </>
      )}
    </div>
  )
}
