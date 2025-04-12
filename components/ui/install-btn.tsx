import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { BeforeInstallPromptEvent } from "@/lib/before-install"
import { Button } from "./button"

function InstallButton() {
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
    if (!deferredPrompt) return

    // Show the install prompt
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
        <Button variant="default" className="font-bold" onClick={handleClick}>
          {t("install")}
        </Button>
      )}
    </div>
  )
}

export default InstallButton
