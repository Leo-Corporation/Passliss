import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import {
  Eye16Regular,
  EyeOff16Regular,
  Save16Regular,
  Settings20Regular,
} from "@fluentui/react-icons"
import { DialogClose } from "@radix-ui/react-dialog"
import { ExternalLink, Github, Trash2 } from "lucide-react"
import { useTheme } from "next-themes"
import setLanguage from "next-translate/setLanguage"
import useTranslation from "next-translate/useTranslation"

import { Settings } from "@/types/settings"
import { GetSettings, SetSettings } from "@/lib/browser-storage"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { t, lang } = useTranslation("common") // default namespace (optional)
  const { setTheme, theme } = useTheme()
  const [keyVis, setKeyVis] = useState(false)

  const ver = "4.4.0.2408"

  let settings: Settings = undefined
  function LoadSettings() {
    settings = GetSettings()
    if (settings.hidePassword == null || settings.hidePassword == undefined) {
      settings.hidePassword = false
    }

    if (settings.openaiKey == null || settings.openaiKey == undefined) {
      settings.openaiKey = ""
    }

    if (settings.hashAlgo == null || settings.hashAlgo == undefined) {
      settings.hashAlgo = "md5"
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
  async function SelectChanged(val) {
    await setLanguage(val)
    const date = new Date()
    const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${val};expires=${date.toUTCString()};path=/`
  }
  LoadSettings()

  function isSettings(object: any): object is Settings {
    return (
      typeof object === "object" &&
      typeof object.passwordLengthOne === "number" &&
      typeof object.passwordLengthTwo === "number" &&
      typeof object.encryptAlgo === "string"
    )
  }

  function Import(event) {
    let file = event.target.files[0] // get the selected file
    let reader = new FileReader() // create a FileReader object
    reader.onload = function (event) {
      let text: string = event.target.result as string // get the file content as text
      let json: Settings = JSON.parse(text) // parse the text as JSON
      if (!isSettings(json)) {
        alert("Invalid file")
        return
      }
      localStorage.setItem("settings", JSON.stringify(json)) // store the JSON in localstorage
    }
    reader.readAsText(file) // read the file as text
  }

  function switchClick() {
    settings.hidePassword =
      document.getElementById("hide_pwr").ariaChecked != "true"
    SetSettings(settings)
  }

  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="settings">
        <div className="mb-2 flex items-center space-x-2">
          <Settings20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("settings")}</p>
        </div>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="flex flex-wrap sm:block">
            <TabsTrigger value="general">{t("general")}</TabsTrigger>
            <TabsTrigger value="password">{t("password")}</TabsTrigger>
            <TabsTrigger value="security">{t("security")}</TabsTrigger>
            <TabsTrigger value="api">{t("ai")}</TabsTrigger>
            <TabsTrigger value="about">{t("about")}</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="border-0 p-0">
            <Card>
              <CardHeader>
                <CardTitle>{t("general")}</CardTitle>
                <CardDescription>{t("general-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-semibold" htmlFor="theme">
                    {t("theme")}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <div
                      onClick={() => setTheme("light")}
                      className={`flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-slate-100 pr-2 dark:bg-slate-800 ${theme === "light" ? "border-accent" : "border-transparent"}`}
                    >
                      <Image
                        src="/LightTheme.png"
                        height={50}
                        width={50}
                        alt="Light theme image"
                        className="object-cover"
                      />
                      <p className="m-2 font-bold">{t("light")}</p>
                    </div>
                    <div
                      onClick={() => setTheme("dark")}
                      className={`flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-slate-100 pr-2 dark:bg-slate-800 ${theme === "dark" ? "border-accent" : "border-transparent"}`}
                    >
                      <Image
                        src="/DarkTheme.png"
                        height={50}
                        width={50}
                        alt="Dark theme image"
                        className="object-cover"
                      />
                      <p className="m-2 font-bold">{t("dark")}</p>
                    </div>
                    <div
                      onClick={() => setTheme("system")}
                      className={`flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-slate-100 pr-2 dark:bg-slate-800 ${theme === "system" ? "border-accent" : "border-transparent"}`}
                    >
                      <Image
                        src="/SystemTheme.png"
                        height={50}
                        width={50}
                        alt="System theme image"
                        className="object-cover"
                      />
                      <p className="m-2 font-bold">{t("system")}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="font-semibold">
                    {t("language")}
                  </Label>
                  <Select defaultValue={lang} onValueChange={SelectChanged}>
                    <SelectTrigger className="h-auto w-[200px] px-2 py-1 sm:justify-self-end">
                      <SelectValue placeholder={t("language")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultChecked={true} value="en">
                        English (United States)
                      </SelectItem>
                      <SelectItem value="fr">Français (France)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="space-y-2 border-0 p-0">
            <Card>
              <CardHeader>
                <CardTitle>{t("password-config")}</CardTitle>
                <CardDescription>{t("password-default")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="col-end-1 mb-2 flex items-center space-x-2">
                  <Switch
                    id="LowerChk"
                    onCheckedChange={() => {
                      settings.defaultPasswordConfig.lowerCases =
                        !settings.defaultPasswordConfig.lowerCases
                      SetSettings(settings)
                    }}
                    defaultChecked={settings.defaultPasswordConfig.lowerCases}
                  />
                  <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                </div>
                <div className="col-end-1 mb-2 flex items-center space-x-2">
                  <Switch
                    onCheckedChange={() => {
                      settings.defaultPasswordConfig.upperCases =
                        !settings.defaultPasswordConfig.upperCases
                      SetSettings(settings)
                    }}
                    defaultChecked={settings.defaultPasswordConfig.upperCases}
                    id="UpperChk"
                  />
                  <Label htmlFor="UpperChk">{t("uppercases")}</Label>
                </div>
                <div className="col-end-1 mb-2 flex items-center space-x-2">
                  <Switch
                    onCheckedChange={() => {
                      settings.defaultPasswordConfig.numbers =
                        !settings.defaultPasswordConfig.numbers
                      SetSettings(settings)
                    }}
                    defaultChecked={settings.defaultPasswordConfig.numbers}
                    id="NbrChk"
                  />
                  <Label htmlFor="NbrChk">{t("nbrs")}</Label>
                </div>
                <div className="col-end-1 mb-2 flex items-center space-x-2">
                  <Switch
                    id="SpecialChk"
                    onCheckedChange={() => {
                      settings.defaultPasswordConfig.special =
                        !settings.defaultPasswordConfig.special
                      SetSettings(settings)
                    }}
                    defaultChecked={settings.defaultPasswordConfig.special}
                  />
                  <Label htmlFor="SpecialChk">{t("specialchars")}</Label>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("password-settings")}</CardTitle>
                <CardDescription>{t("password-settings-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <h5 className="font-bold">{t("default-random-length")}</h5>
                <div className="flex items-center gap-2">
                  <p>{t("between")}</p>
                  <Input
                    defaultValue={settings.passwordLengthOne}
                    type="number"
                    className="h-auto w-14 px-2 py-1"
                    id="Num1Txt"
                    onChange={() => {
                      settings.passwordLengthOne = parseInt(
                        (document.getElementById("Num1Txt") as HTMLInputElement)
                          .value
                      )
                      SetSettings(settings)
                    }}
                  />
                  <p>{t("and")}</p>
                  <Input
                    defaultValue={settings.passwordLengthTwo}
                    type="number"
                    className="h-auto w-14 px-2 py-1"
                    id="Num2Txt"
                    onChange={() => {
                      settings.passwordLengthTwo = parseInt(
                        (document.getElementById("Num2Txt") as HTMLInputElement)
                          .value
                      )
                      SetSettings(settings)
                    }}
                  />
                </div>
                <br />
                <h5 className="font-bold">{t("custom-chars")}</h5>
                <p>{t("uppercases")}</p>
                <Input
                  defaultValue={settings.customChars.upperCases}
                  className="mt-2 h-auto px-2 py-1"
                  id="UpperTextArea"
                  onChange={() => {
                    settings.customChars.upperCases = (
                      document.getElementById(
                        "UpperTextArea"
                      ) as HTMLInputElement
                    ).value

                    SetSettings(settings)
                  }}
                />

                <p>{t("lowercases")}</p>
                <Input
                  defaultValue={settings.customChars.lowerCases}
                  className="mt-2 h-auto px-2 py-1"
                  id="LowerTextArea"
                  onChange={() => {
                    settings.customChars.lowerCases = (
                      document.getElementById(
                        "LowerTextArea"
                      ) as HTMLInputElement
                    ).value

                    SetSettings(settings)
                  }}
                />

                <p>{t("nbrs")}</p>
                <Input
                  defaultValue={settings.customChars.numbers}
                  className="mt-2 h-auto px-2 py-1"
                  id="NumbersTextArea"
                  onChange={() => {
                    settings.customChars.numbers = (
                      document.getElementById(
                        "NumbersTextArea"
                      ) as HTMLInputElement
                    ).value

                    SetSettings(settings)
                  }}
                />

                <p>{t("specialchars")}</p>
                <Input
                  defaultValue={settings.customChars.special}
                  className="mt-2 h-auto px-2 py-1"
                  id="SpecialTextArea"
                  onChange={() => {
                    settings.customChars.special = (
                      document.getElementById(
                        "SpecialTextArea"
                      ) as HTMLInputElement
                    ).value

                    SetSettings(settings)
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="space-y-2 border-0 p-0">
            <Card>
              <CardHeader>
                <CardTitle>{t("security")}</CardTitle>
                <CardDescription>{t("security-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="hide_pwr">{t("hide-password")}</Label>
                  <Switch
                    onClick={switchClick}
                    defaultChecked={
                      settings.hidePassword != null &&
                      settings.hidePassword != undefined
                        ? settings.hidePassword
                        : false
                    }
                    className="sm:justify-self-end"
                    id="hide_pwr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hashing"> {t("default-hashing-algo")}</Label>
                  <Select
                    defaultValue={settings.hashAlgo}
                    onValueChange={(val) => {
                      settings.hashAlgo = val
                      SetSettings(settings)
                    }}
                  >
                    <SelectTrigger
                      id="hashing"
                      className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end"
                    >
                      <SelectValue placeholder={t("algorithm")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultChecked={true} value="md5">
                        MD5
                      </SelectItem>
                      <SelectItem value="sha-1">SHA-1</SelectItem>
                      <SelectItem value="sha-256">SHA-256</SelectItem>
                      <SelectItem value="sha-512">SHA-512</SelectItem>
                      <SelectItem value="sha-3">SHA-3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryption">
                    {t("default-encryption-algo")}
                  </Label>
                  <Select
                    defaultValue={settings.encryptAlgo}
                    onValueChange={(val) => {
                      settings.encryptAlgo = val
                      SetSettings(settings)
                    }}
                  >
                    <SelectTrigger
                      id="encryption"
                      className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end"
                    >
                      <SelectValue placeholder={t("algorithm")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultChecked={true} value="aes">
                        AES
                      </SelectItem>
                      <SelectItem value="3des">3DES</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="rc4">RC4Drop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="api" className="space-y-2 border-0 p-0">
            <Card>
              <CardHeader>
                <CardTitle>{t("ai")}</CardTitle>
                <CardDescription>{t("ai-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Input
                  type={keyVis ? "text" : "password"}
                  id="api-key"
                  className="h-auto max-w-[50%] px-2 py-1"
                  defaultValue={settings.openaiKey ?? ""}
                />
                <Button
                  onClick={() => {
                    settings.openaiKey = (
                      document.getElementById("api-key") as HTMLInputElement
                    ).value

                    SetSettings(settings)
                  }}
                  className="h-auto px-2 py-1"
                >
                  <Save16Regular />
                </Button>
                <Button
                  className="h-auto px-2 py-1"
                  onClick={() => setKeyVis(!keyVis)}
                  variant="outline"
                >
                  {keyVis ? <Eye16Regular /> : <EyeOff16Regular />}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about" className="space-y-2 border-0 p-0">
            <Card>
              <CardHeader>
                <CardTitle>{t("about")}</CardTitle>
                <CardDescription>{t("about-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{t("version")}</h3>
                  <p>Passliss v{ver}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{t("repository")}</h3>
                  <a
                    href="https://github.com/Leo-Corporation/Passliss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex items-center hover:underline"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {t("view-repository")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{t("licenses")}</h3>
                  <p>
                    NextJS - MIT License - © 2023 Vercel, Inc.
                    <br></br>
                    RadixUI - MIT License - © 2022 WorkOS
                    <br></br>
                    shadcn/ui - MIT License - © 2023 shadcn
                    <br></br>
                    Fluent System Icons - MIT License - © 2020 Microsoft
                    Corporation
                    <br></br>
                    Passliss - MIT License - © 2021-2024 Léo Corporation
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t("data")}</CardTitle>
                <CardDescription>{t("manage-data")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Link
                    className={buttonVariants({
                      variant: "default",
                      size: "nav",
                      className: "text-center",
                    })}
                    href={
                      "data:text/plain;charset=UTF-8," +
                      encodeURIComponent(
                        typeof window !== "undefined"
                          ? localStorage.getItem("settings")
                          : "{msg: 'an error occurred'}"
                      )
                    }
                    download={"settings.json"}
                  >
                    {t("export-settings")}
                  </Link>
                  <Button
                    variant="outline"
                    size="nav"
                    onClick={() =>
                      (
                        document.getElementById(
                          "FileSelector"
                        ) as HTMLInputElement
                      ).click()
                    }
                  >
                    {t("import-settings")}
                  </Button>
                  <Input
                    type="file"
                    id="FileSelector"
                    accept="application/json"
                    className="hidden"
                    onChange={Import}
                  ></Input>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="h-auto px-2 py-1 font-bold"
                        variant="destructiveghost"
                      >
                        {t("reset-settings")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("reset-settings")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("reset-settings-msg")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          onClick={() => {
                            setTheme("system")
                            localStorage.setItem(
                              "settings",
                              JSON.stringify({
                                // default object
                                passwordLengthOne: 12,
                                passwordLengthTwo: 19,
                                encryptAlgo: "aes",
                                customChars: {
                                  lowerCases: "abcdefghijklmnopqrstuvwxyz",
                                  upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                  numbers: "01234567889",
                                  special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
                                },
                              })
                            )
                          }}
                        >
                          {t("continue")}
                        </AlertDialogAction>
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </Layout>
  )
}
