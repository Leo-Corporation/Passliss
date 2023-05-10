import { useState } from "react"
import Head from "next/head"
import {
  Lightbulb20Regular,
  LockClosed12Regular,
  LockClosed20Regular,
  LockClosed24Regular,
  Password20Regular,
} from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Settings } from "@/types/settings"
import { AddActivity, GetSettings } from "@/lib/browser-storage"
import {
  GeneratePassword,
  GeneratePasswordByStrength,
} from "@/lib/password-gen"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {
  const { t } = useTranslation("common") // default namespace (optional)
  const [sliderVal, setSliderVal] = useState(2)
  function NewBtnClick() {
    let txt = document.getElementById("PasswordTxt")
    let pwr = GeneratePasswordByStrength(sliderVal, settings.customChars)
    txt.innerHTML = pwr
    AddActivity({ date: new Date(), content: pwr })
  }

  function CopyBtn() {
    let txt = document.getElementById("PasswordTxt")
    navigator.clipboard.writeText(txt.innerHTML)
  }

  function AreOptionsChecked() {
    let lower =
      document.getElementById("LowerChk").getAttribute("aria-checked") == "true"
    let upper =
      document.getElementById("UpperChk").getAttribute("aria-checked") == "true"
    let nbr =
      document.getElementById("NbrChk").getAttribute("aria-checked") == "true"
    let special =
      document.getElementById("SpecialChk").getAttribute("aria-checked") ==
      "true"
    return lower || upper || nbr || special
  }

  function MultiplePasswordClick() {
    if (!AreOptionsChecked()) return

    let amount: number = parseInt(
      (document.getElementById("AmountTxt") as HTMLInputElement).value
    )
    let text = document.getElementById("TextArea") as HTMLTextAreaElement

    text.value = "" // clear

    let lower =
      document.getElementById("LowerChk").getAttribute("aria-checked") == "true"
    let upper =
      document.getElementById("UpperChk").getAttribute("aria-checked") == "true"
    let nbr =
      document.getElementById("NbrChk").getAttribute("aria-checked") == "true"
    let special =
      document.getElementById("SpecialChk").getAttribute("aria-checked") ==
      "true"
    let length = (document.getElementById("LengthTxt") as HTMLInputElement)
      .value

    for (let i = 0; i < amount; i++) {
      text.value +=
        GeneratePassword(
          lower,
          upper,
          nbr,
          special,
          +length,
          settings.customChars
        ) + "\n"
    }
  }

  function NewBtnAdvancedClick() {
    if (!AreOptionsChecked()) return

    let txt = document.getElementById("APasswordTxt")
    let lower =
      document.getElementById("LowerChk").getAttribute("aria-checked") == "true"
    let upper =
      document.getElementById("UpperChk").getAttribute("aria-checked") == "true"
    let nbr =
      document.getElementById("NbrChk").getAttribute("aria-checked") == "true"
    let special =
      document.getElementById("SpecialChk").getAttribute("aria-checked") ==
      "true"
    let length = (document.getElementById("LengthTxt") as HTMLInputElement)
      .value
    let pwr = GeneratePassword(
      lower,
      upper,
      nbr,
      special,
      +length,
      settings.customChars
    )
    txt.innerHTML = pwr
    AddActivity({ date: new Date(), content: pwr })
  }

  function CopyAdvancedBtn() {
    let txt = document.getElementById("APasswordTxt")
    navigator.clipboard.writeText(txt.innerHTML)
  }

  function SliderChange(newValue) {
    let p = document.getElementById("StrengthTxt")
    let icon = document.getElementById("StrengthIconTxt")
    let txt = document.getElementById("PasswordTxt")

    let pwr = GeneratePasswordByStrength(newValue[0], settings.customChars)
    txt.innerHTML = pwr
    AddActivity({ date: new Date(), content: pwr })

    setSliderVal(newValue[0])
    let info = getSliderUiInfo(newValue[0])
    p.innerHTML = info.text
    icon.innerHTML = info.icon
    icon.style.color = info.color
  }

  function getSliderUiInfo(val: number): {
    text: string
    icon: string
    color: string
  } {
    switch (val) {
      case 0:
        return { text: t("strength-low"), icon: "\uF36E", color: "red" }

      case 1:
        return { text: t("strength-medium"), icon: "\uF882", color: "#FF7B00" }

      case 2:
        return { text: t("strength-good"), icon: "\uF299", color: "#68EA00" }

      case 3:
        return {
          text: t("strength-excellent"),
          icon: "\uF6EA",
          color: "#00BF07",
        }

      default:
        return {
          text: t("enterpwrstrength"),
          icon: "\uF4AB",
          color: "#FFFFFFA0",
        }
    }
  }

  let settings: Settings = undefined
  function LoadSettings() {
    settings = GetSettings()
  }
  LoadSettings()

  function RandomLength() {
    let min = settings.passwordLengthOne
    let max = settings.passwordLengthTwo
    ;(document.getElementById("LengthTxt") as HTMLInputElement).value = (
      Math.floor(Math.random() * (max - min)) + min
    ).toString()
  }

  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="generate">
        <div className="mb-2 flex items-center space-x-2">
          <LockClosed20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("generate")}</p>
        </div>
        <Tabs defaultValue="simple">
          <TabsList>
            <TabsTrigger value="simple">{t("simple")}</TabsTrigger>
            <TabsTrigger value="advanced">{t("advanced")}</TabsTrigger>
          </TabsList>
          <TabsContent
            className="justify-center border-none data-[state=active]:flex"
            value="simple"
          >
            <div className="flex w-full flex-col items-center">
              <p className="m-5 text-xl font-bold" id="PasswordTxt">
                {GeneratePasswordByStrength(2, settings.customChars)}
              </p>
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
              <Slider
                id="StrengthSlider"
                onValueChange={SliderChange}
                defaultValue={[sliderVal]}
                max={3}
                step={1}
                className="m-5 sm:w-[50%]"
              />
              <p
                className="icon-f m-2 text-6xl"
                style={{ color: getSliderUiInfo(sliderVal).color }}
                id="StrengthIconTxt"
              >
                {getSliderUiInfo(sliderVal).icon}
              </p>
              <p id="StrengthTxt">{getSliderUiInfo(sliderVal).text}</p>
            </div>
          </TabsContent>
          <TabsContent className="border-none" value="advanced">
            <div className="flex w-full flex-col items-center">
              <div className="max-w-full overflow-auto">
                <p className="m-5 text-xl font-bold" id="APasswordTxt">
                  {GeneratePasswordByStrength(2, settings.customChars)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="h-auto px-2 py-1"
                  onClick={NewBtnAdvancedClick}
                >
                  {t("new")}
                </Button>
                <Button
                  className="h-auto px-2 py-1"
                  variant="outline"
                  onClick={CopyAdvancedBtn}
                >
                  {t("copy")}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-auto px-2 py-1" variant="outline">
                      <Password20Regular className="m-0 p-0" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t("multipasswords")}</DialogTitle>
                      <DialogDescription>
                        {t("multipasswords-desc")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="AmountTxt">{t("amount")}</Label>
                        <Input
                          defaultValue={12}
                          type="number"
                          className="h-auto px-2 py-1"
                          id="AmountTxt"
                        />
                        <Button
                          className="h-auto px-2 py-1"
                          onClick={MultiplePasswordClick}
                        >
                          {t("generate")}
                        </Button>
                      </div>
                      <div className="flex flex-col space-x-2 ">
                        <Label htmlFor="TextArea">{t("results")}</Label>
                        <Textarea className="mt-2 px-2 py-1" id="TextArea" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="m-5 grid grid-rows-4 md:grid-cols-2">
                <div className="col-end-1 flex items-center space-x-2">
                  <Switch id="LowerChk" defaultChecked={true} />
                  <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                </div>
                <div className="col-start-2 flex items-center space-x-2">
                  <Label htmlFor="LengthTxt">{t("length")}</Label>
                  <Input
                    defaultValue={12}
                    type="number"
                    className="h-auto px-2 py-1"
                    id="LengthTxt"
                  />
                  <Button
                    onClick={RandomLength}
                    className="h-auto px-2 py-1"
                    variant="outline"
                  >
                    <Lightbulb20Regular className="m-0 p-0" />
                  </Button>
                </div>
                <div className="col-end-1 flex items-center space-x-2">
                  <Switch defaultChecked={true} id="UpperChk" />
                  <Label htmlFor="UpperChk">{t("uppercases")}</Label>
                </div>
                <div className="col-end-1 flex items-center space-x-2">
                  <Switch defaultChecked={true} id="NbrChk" />
                  <Label htmlFor="NbrChk">{t("nbrs")}</Label>
                </div>
                <div className="col-end-1 flex items-center space-x-2">
                  <Switch id="SpecialChk" />
                  <Label htmlFor="SpecialChk">{t("specialchars")}</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </Layout>
  )
}
