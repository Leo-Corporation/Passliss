"use client"

import { useState } from "react"
import { Home20Regular, Lightbulb20Regular } from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

import DashboardCard from "@/components/dash-card"
import PasswordVisionText from "@/components/password-vision"
import { Button } from "@/components/ui/button"

export default function Home() {
  const t = useTranslations()

  const [password, setPassword] = useState(
    "GeneratePasswordByStrength(2, settings.customChars)"
  )

  const cards = [
    {
      title: t("generate"),
      description: t("generate-desc"),
      icon: "\uF5A8",
      link: "./generate",
    },
    {
      title: t("strength"),
      description: t("strength-desc"),
      icon: "\uF50D",
      link: "./strength",
    },
    {
      title: t("encryption"),
      description: t("encryption-desc"),
      icon: "\uF4C1",
      link: "./encryption",
    },
  ]

  function NewBtnClick() {
    setPassword("GeneratePasswordByStrength(2, settings.customChars)")
  }

  function CopyBtn() {
    navigator.clipboard.writeText(password)
  }

  return (
    <div>
      <div className="mb-2 flex items-center space-x-2">
        <Home20Regular primaryFill="#0088FF" className="text-white" />

        <p className="ml-2 font-bold">{t("home")}</p>
      </div>
      <div className="flex w-full flex-col items-center">
        <PasswordVisionText content={password} />
        <div className="flex space-x-2">
          <Button className="h-auto px-2 py-1" onClick={NewBtnClick}>
            {t("new")}
          </Button>
          <Button
            className="h-auto px-2 py-1"
            variant="outline"
            onClick={CopyBtn}
          >
            {t("copy")}
          </Button>
        </div>
      </div>
      <div className="mb-2 flex items-center space-x-2">
        <Lightbulb20Regular primaryFill="#0088FF" className="text-white" />

        <p className="ml-2 font-bold">{t("recommended")}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-start">
        {cards.map((el) => {
          return (
            <DashboardCard
              key={el.title}
              link={el.link}
              title={el.title}
              description={el.description}
              icon={el.icon}
            />
          )
        })}
      </div>
    </div>
  )
}
