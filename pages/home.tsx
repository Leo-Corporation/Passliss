import { useState } from "react"
import Head from "next/head"
import { Home20Regular, Lightbulb20Regular } from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Settings } from "@/types/settings"
import { AddActivity, GetSettings } from "@/lib/browser-storage"
import { GeneratePasswordByStrength } from "@/lib/password-gen"
import DashboardCard, { CardProps } from "@/components/card"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import PasswordVisionText from "@/components/password-vision"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { t } = useTranslation("common") // default namespace (optional)
  let settings: Settings = undefined
  function LoadSettings() {
    settings = GetSettings()
  }
  LoadSettings()

  const cards: CardProps[] = [
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
  const [password, setPassword] = useState(
    GeneratePasswordByStrength(2, settings.customChars)
  )
  function NewBtnClick() {
    setPassword(GeneratePasswordByStrength(2, settings.customChars))
    AddActivity({ date: new Date(), content: password })
  }

  function CopyBtn() {
    navigator.clipboard.writeText(password)
  }

  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="home">
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
                link={el.link}
                title={el.title}
                description={el.description}
                icon={el.icon}
              />
            )
          })}
        </div>
      </PageContent>
    </Layout>
  )
}
