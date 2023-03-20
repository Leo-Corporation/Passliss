import Head from "next/head"
import { Home20Regular, Lightbulb20Regular } from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { AddActivity } from "@/lib/browser-storage"
import { GeneratePasswordByStrength } from "@/lib/password-gen"
import DashboardCard, { CardProps } from "@/components/card"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { t } = useTranslation("common") // default namespace (optional)
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
  function NewBtnClick() {
    let txt = document.getElementById("PasswordTxt")

    let pwr = GeneratePasswordByStrength(2)
    txt.innerHTML = pwr
    AddActivity({ date: new Date(), content: pwr })
  }

  function CopyBtn() {
    let txt = document.getElementById("PasswordTxt")
    navigator.clipboard.writeText(txt.innerHTML)
  }

  return (
    <Layout>
      <Head>
        <title>Passliss</title>
        <meta
          name="description"
          content="Passliss is a simple yet modern password generator."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="home">
        <div className="mb-2 flex items-center space-x-2">
          <Home20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("home")}</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <p className="m-5 text-xl font-bold" id="PasswordTxt">
            {GeneratePasswordByStrength(2)}
          </p>
          <div className="flex space-x-2">
            <Button className="h-auto py-1 px-2" onClick={NewBtnClick}>
              {t("new")}
            </Button>
            <Button
              className="h-auto py-1 px-2"
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
        <div className="flex flex-wrap items-center justify-center">
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
