"use client"

import { useState } from "react"
import {
  ArrowClockwise12Regular,
  ArrowClockwise20Regular,
  BrainCircuit20Regular,
  Checkmark20Regular,
  CheckmarkCircle20Regular,
  Copy20Regular,
  Eye20Regular,
  EyeOff20Regular,
  Info16Filled,
  LightbulbFilament48Regular,
  LockClosed20Regular,
  Settings20Regular,
} from "@fluentui/react-icons"
import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import OpenAI from "openai"
import { toast } from "sonner"

import { addActivity, getPresets } from "@/lib/browser-storage"
import {
  generatePassword,
  generatePasswordByStrength,
  generatePasswordUsingPreset,
  getRandomPrompts,
  getStrengthInfo,
  PasswordPreset,
} from "@/lib/password"
import {
  defaultSettings,
  getSettings,
  setSettings,
  Settings,
} from "@/lib/settings"
import PasswordItem from "@/components/password-item"
import PromptItem from "@/components/prompt-item"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IndexPage() {
  let settings: Settings = defaultSettings
  function loadSettings() {
    settings = getSettings()
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
  loadSettings()

  const t = useTranslations()
  const lang = t("lang")
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)
  const [passwordStats, setPasswordStats] = useState({
    lowercase: 0,
    uppercase: 0,
    numbers: 0,
    special: 0,
    length: 0,
    entropy: 0,
  })

  // Simple generator state
  const [strengthLevel, setStrengthLevel] = useState(2) // 0-4

  // Advanced generator state
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecial, setIncludeSpecial] = useState(true)

  const [advancedPasswordTxt, setAdvancedPasswordTxt] = useState(
    generatePasswordByStrength(2, settings.customChars)
  )

  // AI generator state
  const [aiPrompt, setAiPrompt] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [randomPrompts, setRandomPrompts] = useState(getRandomPrompts(3, lang))

  // Get color based on score
  function getStrengthColor(score: number) {
    if (score === 0) return "bg-gray-200"
    if (score < 30) return "bg-red-500"
    if (score < 50) return "bg-orange-500"
    if (score < 70) return "bg-yellow-500"
    if (score < 90) return "bg-green-500"
    return "bg-emerald-500"
  }

  // Render password with colored characters
  function renderColoredPassword() {
    if (!generatedPassword) return null

    return (
      <div className="mt-2 font-mono text-lg break-all">
        {generatedPassword.split("").map((char, index) => {
          let className = ""

          if (/[a-z]/.test(char)) {
            className = "text-blue-600" // Lowercase
          } else if (/[A-Z]/.test(char)) {
            className = "text-red-600" // Uppercase
          } else if (/[0-9]/.test(char)) {
            className = "text-green-600" // Numbers
          } else {
            className = "text-purple-600" // Special
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </div>
    )
  }

  function getStrengthLabel(score: number) {
    if (score === 0) return t("unknown")
    if (score < 30) return t("very-weak")
    if (score < 50) return t("weak")
    if (score < 70) return t("moderate")
    if (score < 90) return t("strong")
    return t("very-strong")
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast(t("copied-title"), {
      description: t("copied-to-clipboard"),
    })
  }

  function generateSimplePassword() {
    const pwr = generatePasswordByStrength(strengthLevel, settings.customChars)
    setGeneratedPassword(pwr)
    setPasswordStats(getStrengthInfo(pwr))
    addActivity({ date: new Date(), content: pwr })
    toast(t("generated-title"), {
      description: t("generated-desc", { length: pwr.length }),
    })
  }

  function optionsChecked() {
    return (
      includeLowercase || includeUppercase || includeNumbers || includeSpecial
    )
  }

  function advancedNewBtnClicked() {
    if (!optionsChecked()) return

    const pwr = selectedPreset
      ? generatePasswordUsingPreset(selectedPreset, settings.customChars)
      : generatePassword(
          includeLowercase,
          includeUppercase,
          includeNumbers,
          includeSpecial,
          passwordLength,
          settings.customChars
        )
    setAdvancedPasswordTxt(pwr)
    addActivity({ date: new Date(), content: pwr })
  }

  function getRandomLength() {
    const min = settings.passwordLengthOne
    const max = settings.passwordLengthTwo
    setPasswordLength(Math.floor(Math.random() * (max - min)) + min)
  }

  const [passwords, setPasswords] = useState<string[]>([])
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
      const res = completion.choices[0].message.content
      const obj = JSON.parse(res ?? "{}")
      if (!Array.isArray(obj.passwords)) {
        setPasswords(["An error has occurred, please try again"])
        setResVis(true)
        return
      }
      setPasswords(obj.passwords)
      setResVis(true)
    } catch {}
  }
  const [selectedPreset, setSelectedPreset] = useState<PasswordPreset | null>()
  const [presets] = useState(getPresets())
  return (
    <main>
      <div className="mb-2 flex items-center space-x-2">
        <LockClosed20Regular primaryFill="#0088FF" className="text-white" />

        <p className="ml-2 font-bold">{t("generate")}</p>
      </div>
      <Tabs defaultValue="simple">
        <TabsList>
          <TabsTrigger value="simple">
            <CheckmarkCircle20Regular />
            <p className="font-semibold">{t("simple")}</p>
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Settings20Regular className="m-0" />
            <p className="font-semibold">{t("advanced")}</p>
          </TabsTrigger>
          <TabsTrigger value="ai">
            <BrainCircuit20Regular />
            <p className="font-semibold">{t("ai")}</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="justify-center border-none data-[state=active]:flex"
          value="simple"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("simple")}</CardTitle>
              <CardDescription>{t("simple-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="w-full max-w-250 space-y-6 sm:min-w-150 xl:min-w-200">
              {/* Generated Password Display */}
              <div className="space-y-2">
                <Label htmlFor="generated-password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="generated-password"
                    type={showPassword ? "text" : "password"}
                    value={generatedPassword}
                    readOnly
                    className="pr-20 font-mono"
                  />
                  <div className="absolute top-0 right-0 flex h-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-full"
                    >
                      {showPassword ? (
                        <EyeOff20Regular className="h-4 w-4" />
                      ) : (
                        <Eye20Regular className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToClipboard}
                      className="h-full"
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-4 w-4" />
                      ) : (
                        <Copy20Regular className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Strength Level Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>{t("strength")}</Label>
                  <span className="font-medium">
                    {
                      [
                        t("very-weak"),
                        t("weak"),
                        t("moderate"),
                        t("strong"),
                        t("very-strong"),
                      ][strengthLevel]
                    }
                  </span>
                </div>
                <Slider
                  value={[strengthLevel]}
                  min={0}
                  max={4}
                  step={1}
                  onValueChange={(value) => setStrengthLevel(value[0])}
                  className="py-4"
                />
                <div className="grid grid-cols-5 text-center text-xs">
                  <div>{t("very-weak")}</div>
                  <div>{t("weak")}</div>
                  <div>{t("moderate")}</div>
                  <div>{t("strong")}</div>
                  <div>{t("very-strong")}</div>
                </div>
              </div>

              {/* Password Preview */}
              {showPassword && (
                <div className="rounded-md bg-gray-50 p-3">
                  {renderColoredPassword()}
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="text-blue-600">{t("lowercases")}</span>
                    <span className="text-red-600">{t("uppercases")}</span>
                    <span className="text-green-600">{t("nbrs")}</span>
                    <span className="text-purple-600">{t("specialchars")}</span>
                  </div>
                </div>
              )}

              {/* Password Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-gray-50 p-3">
                  <div className="text-muted-foreground text-sm">
                    {t("length")}
                  </div>
                  <div className="text-xl font-bold">
                    {passwordStats.length} characters
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-3">
                  <div className="text-muted-foreground text-sm">
                    {t("strength")}
                  </div>
                  <div className="text-xl font-bold">
                    {getStrengthLabel(passwordStats.entropy)}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={generateSimplePassword}
                className="flex w-full items-center gap-2"
              >
                <ArrowClockwise20Regular className="h-4 w-4" />
                {t("generate-new-password")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="border-none" value="advanced">
          {/* <div className="flex">
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
                      {presets &&
                        presets.map((el, i) => (
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
          </div>
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
            </div>
            {!selectedPreset && (
              <div className="m-5 grid grid-rows-4 md:grid-cols-2">
                <div className="col-end-1 flex items-center space-x-2">
                  <Switch
                    id="LowerChk"
                    onCheckedChange={setIncludeLowercase}
                    defaultChecked={includeLowercase}
                  />
                  <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                </div>
                <div className="col-start-2 flex items-center space-x-2">
                  <Label htmlFor="LengthTxt">{t("length")}</Label>
                  <Input
                    defaultValue={passwordLength}
                    onChange={(e) =>
                      setPasswordLength(parseInt(e.target.value))
                    }
                    value={passwordLength}
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
                    onCheckedChange={setIncludeUppercase}
                    defaultChecked={includeUppercase}
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
            <div className="border-primary bg-primary/20 text-primary my-2 flex items-center space-x-2 rounded-md border p-2">
              <Info16Regular />
              <p>{t("preset-selected-msg")}</p>
            </div>
          )} */}
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
                        setSettings(settings)
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
                <p className="ml-2 text-sm">{t("ai-disclaimer")}</p>
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
                    onClick={() => setRandomPrompts(getRandomPrompts(3, lang))}
                    className="my-2 mr-2 h-[30px] cursor-pointer rounded-lg border border-blue-600 bg-white text-sm text-blue-600 shadow-xs transition-all hover:translate-y-[-4px] dark:bg-blue-950 dark:text-white"
                  >
                    <ArrowClockwise12Regular className="m-0" />
                  </Button>
                  {randomPrompts.map((prp) => (
                    <PromptItem key={prp} prompt={prp} />
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
                <div id="result-items" className={resVis ? "w-full" : "hidden"}>
                  {passwords.map((password) => (
                    <PasswordItem key={password} content={password} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
