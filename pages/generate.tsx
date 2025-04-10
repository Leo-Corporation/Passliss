import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import {
  Add16Regular,
  ArrowClockwise12Regular,
  ArrowDownload16Regular,
  ArrowDownload20Regular,
  BrainCircuit20Regular,
  CheckmarkCircle20Filled,
  CheckmarkCircle20Regular,
  CheckmarkStarburst20Filled,
  Dismiss16Regular,
  DismissCircle20Filled,
  Info16Filled,
  Info16Regular,
  Info20Regular,
  Lightbulb20Regular,
  LightbulbFilament48Regular,
  LockClosed20Regular,
  Password20Regular,
  Settings20Regular,
  Warning20Filled,
} from "@fluentui/react-icons"
import { Close, DialogClose } from "@radix-ui/react-dialog"
import useTranslation from "next-translate/useTranslation"
import OpenAI from "openai"

import { Settings } from "@/types/settings"
import { StrengthInfo } from "@/types/strength-info"
import {
  AddActivity,
  GetPresets,
  GetSettings,
  SetSettings,
} from "@/lib/browser-storage"
import {
  GeneratePassword,
  GeneratePasswordByStrength,
  GetRandomPrompts,
} from "@/lib/password-gen"
import {
  generatePasswordUsingPreset,
  PasswordPreset,
} from "@/lib/password-preset"
import { getStrengthInfo } from "@/lib/password-strength"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import PasswordItem from "@/components/password-item"
import PasswordVisionText from "@/components/password-vision"
import PromptItem from "@/components/prompt-item"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {
  let settings: Settings = undefined
  function LoadSettings() {
    settings = GetSettings()
    if (settings.hidePassword == null || settings.hidePassword == undefined) {
      settings.hidePassword = false
    }

    if (
      settings.defaultPasswordConfig == null ||
      settings.defaultPasswordConfig == undefined
    ) {
      settings.defaultPasswordConfig = {
        upperCases: true,
        lowerCases: true,
        numbers: true,
        special: false,
      }
    }
  }
  LoadSettings()

  const { t, lang } = useTranslation("common") // default namespace (optional)
  const [sliderVal, setSliderVal] = useState(2)
  const [hasUpper, setHasUpper] = useState(
    settings.defaultPasswordConfig.upperCases
  )
  const [hasLower, setHasLower] = useState(
    settings.defaultPasswordConfig.lowerCases
  )
  const [hasNumber, setHasNumber] = useState(
    settings.defaultPasswordConfig.numbers
  )
  const [hasChars, setHasChars] = useState(
    settings.defaultPasswordConfig.special
  )
  const [length, setLength] = useState(12)

  const [strengthInfo, setStrengthInfo] = useState<StrengthInfo>()

  const [strengthTxt, setStrengthTxt] = useState(
    getSliderUiInfo(sliderVal).text
  )
  const [strengthIconTxt, setStrengthIconTxt] = useState(
    getSliderUiInfo(sliderVal).icon
  )
  const [strengthColor, setStrengthColor] = useState(
    getSliderUiInfo(sliderVal).color
  )
  const [passwordTxt, setPasswordTxt] = useState(
    GeneratePasswordByStrength(2, settings.customChars)
  )
  const [advancedPasswordTxt, setAdvancedPasswordTxt] = useState(
    GeneratePasswordByStrength(2, settings.customChars)
  )
  const [passwordAmount, setPasswordAmount] = useState(10)
  const [multiplePasswordsTxt, setMultiplePasswordsTxt] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [csvSeparator, setCsvSeparator] = useState("colon")
  const [randomPrompts, setRandomPrompts] = useState(GetRandomPrompts(3, lang))

  function newBtnClicked() {
    let pwr = GeneratePasswordByStrength(sliderVal, settings.customChars)
    setPasswordTxt(pwr)
    AddActivity({ date: new Date(), content: pwr })
  }

  function copyBtnClicked() {
    navigator.clipboard.writeText(passwordTxt)
  }

  function optionsChecked() {
    return hasLower || hasUpper || hasNumber || hasChars
  }

  function MultiplePasswordClick() {
    if (!optionsChecked()) return

    let value = ""

    for (let i = 0; i < passwordAmount; i++) {
      value += selectedPreset
        ? generatePasswordUsingPreset(selectedPreset, settings.customChars) +
          "\n"
        : GeneratePassword(
            hasLower,
            hasUpper,
            hasNumber,
            hasChars,
            +length,
            settings.customChars
          ) + "\n"
    }
    setMultiplePasswordsTxt(value)
  }

  function advancedNewBtnClicked() {
    if (!optionsChecked()) return

    let pwr = selectedPreset
      ? generatePasswordUsingPreset(selectedPreset, settings.customChars)
      : GeneratePassword(
          hasLower,
          hasUpper,
          hasNumber,
          hasChars,
          +length,
          settings.customChars
        )
    setAdvancedPasswordTxt(pwr)
    AddActivity({ date: new Date(), content: pwr })
    setStrengthInfo(getStrengthInfo(pwr))
  }

  function copyAdvancedBtnClicked() {
    navigator.clipboard.writeText(advancedPasswordTxt)
  }

  function onSliderChanged(newValue) {
    let pwr = GeneratePasswordByStrength(newValue[0], settings.customChars)
    setPasswordTxt(pwr)
    setSliderVal(newValue[0])

    let info = getSliderUiInfo(newValue[0])
    setStrengthTxt(info.text)
    setStrengthIconTxt(info.icon)
    setStrengthColor(info.color)
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

  function getRandomLength() {
    let min = settings.passwordLengthOne
    let max = settings.passwordLengthTwo
    setLength(Math.floor(Math.random() * (max - min)) + min)
  }

  const [passwords, setPasswords] = useState([])
  const [showAI, setShowAI] = useState(
    !(
      settings.openaiKey == null ||
      settings.openaiKey == undefined ||
      settings.openaiKey == ""
    )
  )
  const [resVis, setResVis] = useState(true)

  async function generateAiPassword() {
    const openai = new OpenAI({
      apiKey: settings.openaiKey,
      dangerouslyAllowBrowser: true,
    })
    setResVis(false)
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'GOAL: Generate ONLY 3 complex passwords according to the user prompt.\nOUTPUT: Use the following format (JSON array):\n{"passwords": ["", "", ""]}',
          },
          {
            role: "user",
            content: aiPrompt,
          },
        ],
      })
      let res = completion.choices[0].message.content
      let obj = JSON.parse(res)
      if (!Array.isArray(obj.passwords)) {
        setPasswords(["An error has occurred, please try again"])
        setResVis(true)
        return
      }
      setPasswords(obj.passwords)
      setResVis(true)
    } catch {}
  }
  const [selectedPreset, setSelectedPreset] = useState<PasswordPreset>()
  const [presets, setPresets] = useState(GetPresets())
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
            <TabsTrigger value="simple">
              <span className="grid grid-cols-[1fr_auto] gap-2">
                <CheckmarkCircle20Regular />
                <span>{t("simple")}</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <span className="grid grid-cols-[1fr_auto] gap-2">
                <Settings20Regular />
                <span>{t("advanced")}</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="ai">
              <span className="grid grid-cols-[1fr_auto] gap-2">
                <BrainCircuit20Regular />
                <span>{t("ai")}</span>
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="justify-center border-none data-[state=active]:flex"
            value="simple"
          >
            <div className="flex w-full flex-col items-center">
              <PasswordVisionText content={passwordTxt} />
              <div className="flex space-x-2">
                <Button className="h-auto px-2 py-1" onClick={newBtnClicked}>
                  {t("new")}
                </Button>
                <Button
                  className="h-auto px-2 py-1"
                  variant="outline"
                  onClick={copyBtnClicked}
                >
                  {t("copy")}
                </Button>
              </div>
              <Slider
                id="StrengthSlider"
                onValueChange={onSliderChanged}
                defaultValue={[sliderVal]}
                max={3}
                step={1}
                className="m-5 sm:w-1/2"
              />
              <div className="w-full sm:w-1/2">
                <div className="grid grid-cols-[1fr_1fr_1fr_auto]">
                  <DismissCircle20Filled color="red" />
                  <Warning20Filled color="#FF7B00" />
                  <CheckmarkCircle20Filled color="#68EA00" />
                  <CheckmarkStarburst20Filled color="#00BF07" />
                </div>
              </div>
              <p
                className="icon-f m-2 text-6xl"
                style={{ color: strengthColor }}
                id="StrengthIconTxt"
              >
                {strengthIconTxt}
              </p>
              <p id="StrengthTxt">{strengthTxt}</p>
            </div>
          </TabsContent>
          <TabsContent className="border-none" value="advanced">
            <Dialog>
              <DialogTrigger className="hidden sm:block">
                <Button variant="link" className="space-x-2">
                  <Add16Regular />
                  <span>{t("use-preset")}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("select-preset")}</DialogTitle>
                </DialogHeader>
                {presets && presets.length === 0 ? (
                  <div className="flex w-full flex-col items-center justify-center text-center">
                    <p className="icon text-7xl">{"\uFD81"}</p>
                    <h4 className="text-xl font-bold">{t("no-activity")}</h4>
                    <p>{t("no-presets-desc")}</p>
                    <Link href="/presets">
                      <Button className="m-2 h-auto" variant="outline">
                        {t("create-preset")}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <ScrollArea className="h-[350px]">
                    <div className="w-full">
                      {presets.map((el, i) => (
                        <Close key={i} className="w-full">
                          <Button
                            onClick={() => setSelectedPreset(el)}
                            className="w-full font-semibold"
                            variant="ghost"
                          >
                            {el.name}
                          </Button>
                        </Close>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </DialogContent>
            </Dialog>
            <Drawer>
              <DrawerTrigger className="block sm:hidden">
                <Button variant="link" className="space-x-2">
                  <Add16Regular />
                  <span>{t("use-preset")}</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{t("select-preset")}</DrawerTitle>
                </DrawerHeader>
                {presets && presets.length === 0 ? (
                  <div className="my-10 flex w-full flex-col items-center justify-center text-center">
                    <p className="icon text-7xl">{"\uFD81"}</p>
                    <h4 className="text-xl font-bold">{t("no-activity")}</h4>
                    <p>{t("no-presets-desc")}</p>
                    <Link href="/presets">
                      <Button className="m-2 h-auto" variant="outline">
                        {t("create-preset")}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <ScrollArea className="h-[350px]">
                    <div className="w-full">
                      {presets.map((el, i) => (
                        <Close key={i} className="w-full">
                          <Button
                            onClick={() => setSelectedPreset(el)}
                            className="w-full font-semibold"
                            variant="ghost"
                          >
                            {el.name}
                          </Button>
                        </Close>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </DrawerContent>
            </Drawer>
            {selectedPreset && (
              <Button
                onClick={() => setSelectedPreset(null)}
                variant="link"
                className="space-x-2 decoration-red-500"
              >
                <Dismiss16Regular color="#ef4444" />
                <span className="text-red-500">{t("remove-preset")}</span>
              </Button>
            )}
            <div className="flex w-full flex-col items-center">
              <div className="max-w-full overflow-auto">
                <PasswordVisionText content={advancedPasswordTxt} />
              </div>
              <div className="flex space-x-2">
                <Button
                  className="h-auto px-2 py-1"
                  onClick={advancedNewBtnClicked}
                >
                  {t("new")}
                </Button>
                <Button
                  className="h-auto px-2 py-1"
                  variant="outline"
                  onClick={copyAdvancedBtnClicked}
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
                    <div className="pt-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="AmountTxt">{t("amount")}</Label>
                        <Input
                          defaultValue={passwordAmount}
                          type="number"
                          onChange={(e) =>
                            setPasswordAmount(parseInt(e.target.value))
                          }
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
                      <div className="my-2 flex flex-col">
                        <Label htmlFor="TextArea">{t("results")}</Label>
                        <Textarea
                          className="mt-2 px-2 py-1"
                          value={multiplePasswordsTxt}
                          id="TextArea"
                        />
                      </div>
                      <div className="m-2 mb-0 flex flex-row justify-center space-x-2">
                        <Button
                          className="h-auto px-2 py-1"
                          onClick={() =>
                            navigator.clipboard.writeText(multiplePasswordsTxt)
                          }
                        >
                          {t("copy")}
                        </Button>

                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant="outline"
                              className="h-auto px-2 py-1"
                            >
                              <ArrowDownload20Regular />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t("export-csv")}</DialogTitle>
                              <DialogDescription>
                                {t("export-csv-desc")}
                              </DialogDescription>
                            </DialogHeader>
                            <p>{t("separator")}</p>
                            <RadioGroup
                              defaultValue={csvSeparator}
                              onValueChange={(v) => setCsvSeparator(v)}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="colon" id="colon" />
                                <Label htmlFor="colon">&quot;,&quot;</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="semicolon"
                                  id="semicolon"
                                />
                                <Label htmlFor="semicolon">&quot;;&quot;</Label>
                              </div>
                            </RadioGroup>
                            <Link
                              className="flex items-center justify-center"
                              download="passwords.csv"
                              href={
                                "data:text/plain;charset=utf-8," +
                                encodeURIComponent(
                                  multiplePasswordsTxt.replaceAll(
                                    "\n",
                                    csvSeparator === "colon" ? "," : ";"
                                  )
                                )
                              }
                            >
                              <Button
                                variant="outline"
                                className="m-2 flex space-x-2"
                              >
                                <ArrowDownload16Regular />
                                <span>{t("export")}</span>
                              </Button>
                            </Link>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {!selectedPreset && (
                <div className="m-5 grid grid-rows-4 md:grid-cols-2">
                  <div className="col-end-1 flex items-center space-x-2">
                    <Switch
                      id="LowerChk"
                      onCheckedChange={setHasLower}
                      defaultChecked={hasLower}
                    />
                    <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                  </div>
                  <div className="col-start-2 flex items-center space-x-2">
                    <Label htmlFor="LengthTxt">{t("length")}</Label>
                    <Input
                      defaultValue={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      value={length}
                      type="number"
                      className="h-auto px-2 py-1"
                      id="LengthTxt"
                    />
                    <Button
                      onClick={getRandomLength}
                      className="h-auto px-2 py-1"
                      variant="outline"
                    >
                      <Lightbulb20Regular className="m-0 p-0" />
                    </Button>
                  </div>
                  <div className="col-end-1 flex items-center space-x-2">
                    <Switch
                      onCheckedChange={setHasUpper}
                      defaultChecked={hasUpper}
                      id="UpperChk"
                    />
                    <Label htmlFor="UpperChk">{t("uppercases")}</Label>
                  </div>
                  <div className="col-end-1 flex items-center space-x-2">
                    <Switch
                      onCheckedChange={setHasNumber}
                      defaultChecked={hasNumber}
                      id="NbrChk"
                    />
                    <Label htmlFor="NbrChk">{t("nbrs")}</Label>
                  </div>
                  <div className="col-end-1 flex items-center space-x-2">
                    <Switch
                      id="SpecialChk"
                      onCheckedChange={setHasChars}
                      defaultChecked={hasChars}
                    />
                    <Label htmlFor="SpecialChk">{t("specialchars")}</Label>
                  </div>
                </div>
              )}
            </div>
            {selectedPreset && (
              <div className="border-accent bg-accent/20 text-accent m-2 flex items-center space-x-2 rounded-md border p-2 dark:text-white">
                <Info16Regular />
                <p>{t("preset-selected-msg")}</p>
              </div>
            )}
            <div className="mb-2 -ml-6 flex items-center space-x-2">
              <Info20Regular primaryFill="#0088FF" className="text-white" />

              <p className="font-bold">{t("details")}</p>
            </div>
            <div className="">
              <p
                className="text-center text-xl font-bold"
                id="PasswordContainer"
              ></p>
              <div className="grid grid-cols-[1fr_auto] sm:grid-cols-2">
                <p className="font-bold text-[#FF2929]">{t("uppercases")}</p>
                <p className="font-bold text-[#FF2929]" id="UppercaseTxt">
                  {strengthInfo ? strengthInfo.uppercases : "0"}
                </p>
                <p className="font-bold text-[#3B8AFF]">{t("lowercases")}</p>
                <p className="font-bold text-[#3B8AFF]" id="LowercaseTxt">
                  {strengthInfo ? strengthInfo.lowercases : "0"}
                </p>
                <p className="font-bold text-[#007F5F]">{t("nbrs")}</p>
                <p className="font-bold text-[#007F5F]" id="NumbersTxt">
                  {strengthInfo ? strengthInfo.numbers : "0"}
                </p>
                <p className="font-bold text-[#9F2CF9]">{t("specialchars")}</p>
                <p className="font-bold text-[#9F2CF9]" id="SpecialTxt">
                  {strengthInfo ? strengthInfo.specialchars : "0"}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent className="border-none" value="ai">
            {settings.openaiKey == null ||
            settings.openaiKey == undefined ||
            (settings.openaiKey == "" && !showAI) ? (
              <div className="flex flex-col items-center">
                <LightbulbFilament48Regular />
                <h2 className="text-center text-3xl font-bold">
                  {t("welcome-ai")}
                </h2>
                <p className="text-center">{t("welcome-ai-desc")}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="m-2 h-auto px-2 py-1">
                      {t("set-api-key")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t("set-api-key")}</DialogTitle>
                      <DialogDescription>
                        {t("get-api-key-msg")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="AmountTxt">{t("api-key")}</Label>
                        <Input
                          type="password"
                          id="api-key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="h-auto max-w-[80%] px-2 py-1"
                          defaultValue={settings.openaiKey ?? ""}
                        />
                      </div>
                    </div>
                    <DialogClose>
                      <Button
                        onClick={() => {
                          settings.openaiKey = apiKey
                          setShowAI(
                            !(
                              settings.openaiKey == null ||
                              settings.openaiKey == undefined ||
                              settings.openaiKey == ""
                            )
                          )
                          SetSettings(settings)
                        }}
                        className="h-auto px-2 py-1"
                      >
                        {t("save")}
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-[16px_1fr] items-center space-x-2 rounded-lg border border-blue-600 bg-white p-2 text-blue-600 dark:bg-blue-950 dark:text-white">
                  <Info16Filled />
                  <p className="text-sm">{t("ai-disclaimer")}</p>
                </div>
                <div className="flex w-full flex-col items-center">
                  <div className="m-5 flex w-full space-x-2">
                    <Input
                      type="text"
                      id="prompt-txt"
                      placeholder={t("enter-prompt")}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="h-auto min-w-[150px] border-0 bg-white px-2 py-1 shadow-md dark:bg-slate-800"
                    />
                    <Button
                      className="h-auto px-2 py-1"
                      onClick={generateAiPassword}
                    >
                      {t("generate")}
                    </Button>
                  </div>
                  <div
                    id="suggestions"
                    className="flex w-full flex-wrap items-center"
                  >
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setRandomPrompts(GetRandomPrompts(3, lang))
                      }
                      className="my-2 mr-2 h-auto cursor-pointer rounded-lg border border-blue-600 bg-white p-2 text-sm text-blue-600 shadow-xs transition-all hover:translate-y-[-4px] dark:bg-blue-950 dark:text-white"
                    >
                      <ArrowClockwise12Regular />
                    </Button>
                    {randomPrompts.map((prp) => (
                      <PromptItem prompt={prp} />
                    ))}
                  </div>
                  <div
                    className={resVis ? "hidden" : "flex flex-col items-center"}
                  >
                    <p className="icon my-2 mr-2 animate-spin text-6xl font-normal select-none">
                      {"\uF709"}
                    </p>
                    <p className="text-center font-bold">{t("ai-loading")}</p>
                  </div>
                  <div
                    id="result-items"
                    className={resVis ? "w-full" : "hidden"}
                  >
                    {passwords.map((password) => (
                      <PasswordItem content={password} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PageContent>
    </Layout>
  )
}
