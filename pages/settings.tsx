import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Save16Regular, Settings20Regular } from "@fluentui/react-icons"
import { DialogClose } from "@radix-ui/react-dialog"
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
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function SettingsPage() {
  const { t, lang } = useTranslation("common") // default namespace (optional)
  const { setTheme } = useTheme()

  const ver = "3.3.1.2307"

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
        <div className="flex justify-center">
          <section
            id="about-section"
            className="m-2 flex flex-col items-center justify-center rounded-lg bg-white px-10 py-4 text-center shadow-lg dark:bg-slate-800"
          >
            <div className="m-3 flex items-center space-x-2">
              <h2 className="text-4xl font-bold">{t("title")}</h2>
              <span className="m-2 rounded-full bg-gradient-to-br from-[#0088FF] to-[#2153E0] px-2 font-bold text-white">
                {t("web")}
              </span>
            </div>
            <p className="text-sm">{`${t("version")} ${ver}`}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="nav" variant="outline" className="mt-1 font-bold">
                  {t("see-licenses")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("licenses")}</DialogTitle>
                </DialogHeader>
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
                  Passliss - MIT License - © 2023 Léo Corporation
                </p>
                <DialogFooter>
                  <DialogClose>
                    <Button size="nav" type="submit">
                      {t("ok")}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </div>
        <section id="settings-section">
          <Accordion type="single" collapsible>
            <AccordionItem value="theme">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF33C"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("theme")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("change-theme")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setTheme("light")}
                    className="m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-100 pr-2 dark:bg-slate-700"
                  >
                    <Image
                      src="/LightTheme.png"
                      height={50}
                      width={50}
                      alt="Light theme image"
                      className="object-cover"
                    />
                    <p className="m-2 font-bold">Light</p>
                  </div>
                  <div
                    onClick={() => setTheme("dark")}
                    className="m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-100 pr-2 dark:bg-slate-700"
                  >
                    <Image
                      src="/DarkTheme.png"
                      height={50}
                      width={50}
                      alt="Dark theme image"
                      className="object-cover"
                    />
                    <p className="m-2 font-bold">Dark</p>
                  </div>
                  <div
                    onClick={() => setTheme("system")}
                    className="m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-100 pr-2 dark:bg-slate-700"
                  >
                    <Image
                      src="/SystemTheme.png"
                      height={50}
                      width={50}
                      alt="System theme image"
                      className="object-cover"
                    />
                    <p className="m-2 font-bold">System</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <div className="mx-2 mt-2 grid grid-cols-1 items-center rounded-lg bg-slate-100 p-4 font-bold dark:bg-slate-800 sm:grid-cols-2 ">
              <div className="grid grid-cols-[auto,1fr] items-center">
                <p className="icon my-2 mr-2 text-3xl font-normal">
                  {"\uF4F4"}
                </p>
                <div>
                  <h4 className="text-left text-lg">{t("language")}</h4>
                  <p className="text-left text-sm font-normal">
                    {t("change-language")}
                  </p>
                </div>
              </div>
              <Select defaultValue={lang} onValueChange={SelectChanged}>
                <SelectTrigger className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end">
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

            <AccordionItem value="password">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF59E"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">
                      {t("password-settings")}
                    </h4>
                    <p className="text-left text-sm font-normal">
                      {t("password-settings-desc")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <h5 className="font-bold">{t("default-random-length")}</h5>
                <div className="flex items-center space-x-2">
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="password-defaults">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF6C6"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">
                      {t("password-config")}
                    </h4>
                    <p className="text-left text-sm font-normal">
                      {t("password-default")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="m-5 grid grid-rows-4 md:grid-cols-2">
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
                </div>
              </AccordionContent>
            </AccordionItem>

            <div className="mx-2 mt-2 grid grid-cols-1 items-center rounded-lg bg-slate-100 p-4 font-bold dark:bg-slate-800 sm:grid-cols-2 ">
              <div className="grid grid-cols-[auto,1fr] items-center">
                <p className="icon my-2 mr-2 text-3xl font-normal">
                  {"\uF503"}
                </p>
                <div>
                  <h4 className="text-left text-lg">
                    {t("password-security")}
                  </h4>
                  <p className="text-left text-sm font-normal">
                    {t("hide-password")}
                  </p>
                </div>
              </div>
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

            <div className="mx-2 mt-2 grid grid-cols-1 items-center rounded-lg bg-slate-100 p-4 font-bold dark:bg-slate-800 sm:grid-cols-2 ">
              <div className="grid grid-cols-[auto,1fr] items-center">
                <p className="icon my-2 mr-2 text-3xl font-normal">
                  {"\uF4B7"}
                </p>
                <div>
                  <h4 className="text-left text-lg">{t("encryption")}</h4>
                  <p className="text-left text-sm font-normal">
                    {t("default-encryption-algo")}
                  </p>
                </div>
              </div>
              <Select
                defaultValue={settings.encryptAlgo}
                onValueChange={(val) => {
                  settings.encryptAlgo = val
                  SetSettings(settings)
                }}
              >
                <SelectTrigger className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end">
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
            <div className="mx-2 mt-2 grid grid-cols-1 items-center rounded-lg bg-slate-100 p-4 font-bold dark:bg-slate-800 sm:grid-cols-2 ">
              <div className="grid grid-cols-[auto,1fr] items-center">
                <p className="icon my-2 mr-2 text-3xl font-normal">
                  {"\uF57E"}
                </p>
                <div>
                  <h4 className="text-left text-lg">{t("hashing")}</h4>
                  <p className="text-left text-sm font-normal">
                    {t("default-hashing-algo")}
                  </p>
                </div>
              </div>
              <Select
                defaultValue={settings.hashAlgo}
                onValueChange={(val) => {
                  settings.hashAlgo = val
                  SetSettings(settings)
                }}
              >
                <SelectTrigger className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end">
                  <SelectValue placeholder={t("algorithm")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem defaultChecked={true} value="md5">
                    MD5
                  </SelectItem>
                  <SelectItem value="sha-1">SHA-1</SelectItem>
                  <SelectItem value="sha-256">SHA-256</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AccordionItem value="ai">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF4DB"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("ai")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("set-api-key")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <p>{t("api-key")}</p>
                  <Input
                    type="password"
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
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF4AB"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("data")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("manage-data")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </PageContent>
    </Layout>
  )
}
