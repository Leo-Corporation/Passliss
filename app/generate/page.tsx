"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Add16Regular,
  ArrowClockwise12Regular,
  ArrowClockwise20Regular,
  ArrowDownload16Regular,
  ArrowDownload20Regular,
  BrainCircuit20Regular,
  Checkmark20Regular,
  CheckmarkCircle20Regular,
  Copy20Regular,
  Dismiss16Regular,
  Eye20Regular,
  EyeOff20Regular,
  Info16Filled,
  Info16Regular,
  LightbulbFilament48Regular,
  LockClosed20Regular,
  Settings20Regular,
} from "@fluentui/react-icons"
import { Close, DialogClose } from "@radix-ui/react-dialog"
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  const [generatedPassword, setGeneratedPassword] = useState(
    generatePasswordByStrength(2, settings.customChars)
  )
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

  const [numberOfPasswords, setNumberOfPasswords] = useState(1)
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([])

  // AI generator state
  const [aiPrompt, setAiPrompt] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [randomPrompts, setRandomPrompts] = useState(getRandomPrompts(3, lang))

  const [csvSeparator, setCsvSeparator] = useState("colon")

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

  function copyAllPasswords() {
    const allPasswords = generatedPasswords.join("\n")
    navigator.clipboard.writeText(allPasswords)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast(t("copied-all-title"), {
      description: t("copied-all", { amount: generatedPasswords.length }),
    })
  }

  function copyPasswordAtIndex(index: number) {
    if (generatedPasswords[index]) {
      navigator.clipboard.writeText(generatedPasswords[index])
      toast(t("copied-title"), {
        description: t("copy-password-index", { index: index + 1 }),
      })
    }
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

  // Get time to crack estimate
  function getTimeToCrack(entropy: number) {
    // Assuming 10 billion guesses per second (modern hardware)
    const guessesPerSecond = 10000000000
    const seconds = Math.pow(2, entropy) / guessesPerSecond

    if (seconds < 60) return t("instantly")
    if (seconds < 3600) return `${Math.round(seconds / 60)} ${t("minutes")}`
    if (seconds < 86400) return `${Math.round(seconds / 3600)} ${t("hours")}`
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} ${t("days")}`
    if (seconds < 31536000 * 100)
      return `${Math.round(seconds / 31536000)} ${t("years")}`
    if (seconds < 31536000 * 1000)
      return `${Math.round(seconds / 31536000 / 100)} ${t("centuries")}`
    return t("millions-of-years")
  }

  function optionsChecked() {
    return (
      includeLowercase || includeUppercase || includeNumbers || includeSpecial
    )
  }

  function generateAdvancedPassword() {
    if (!optionsChecked()) return

    if (numberOfPasswords > 1) {
      const passwords = []
      for (let i = 0; i < numberOfPasswords; i++) {
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
        passwords.push(pwr)
        addActivity({ date: new Date(), content: pwr })
      }
      setGeneratedPasswords(passwords)
      setGeneratedPassword(passwords[0] || "")
      setPasswordStats(getStrengthInfo(passwords[0] || ""))
    } else {
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
      setGeneratedPassword(pwr)
      setPasswordStats(getStrengthInfo(pwr))
      addActivity({ date: new Date(), content: pwr })
      toast(t("generated-title"), {
        description: t("generated-desc", { length: pwr.length }),
      })
    }
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
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
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
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                  <div className="text-muted-foreground text-sm">
                    {t("length")}
                  </div>
                  <div className="text-xl font-bold">
                    {passwordStats.length} {" " + t("characters")}
                  </div>
                </div>
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
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
        <TabsContent
          className="flex justify-center border-none"
          value="advanced"
        >
          <Card className="w-full max-w-250 sm:min-w-150 xl:min-w-200">
            <CardHeader>
              <CardTitle>{t("advanced")}</CardTitle>
              <CardDescription>{t("advanced-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generated Password Display */}
              <div className="space-y-2">
                <Label htmlFor="advanced-password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="advanced-password"
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

              {/* Password Preview */}
              {showPassword && (
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                  {renderColoredPassword()}
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="text-blue-600">{t("lowercases")}</span>
                    <span className="text-red-600">{t("uppercases")}</span>
                    <span className="text-green-600">{t("nbrs")}</span>
                    <span className="text-purple-600">{t("specialchars")}</span>
                  </div>
                </div>
              )}

              {/* Password Length */}
              {!selectedPreset && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>{t("length")}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span
                            onClick={getRandomLength}
                            className="decoration-foreground/50 cursor-pointer font-medium underline decoration-dotted underline-offset-2"
                          >
                            {passwordLength} {" " + t("characters")}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{t("random-length")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Slider
                    value={[passwordLength]}
                    min={4}
                    max={64}
                    step={1}
                    onValueChange={(value) => setPasswordLength(value[0])}
                    className="py-4"
                  />
                  <div className="grid grid-cols-3 text-xs">
                    <div>4</div>
                    <div className="text-center">32</div>
                    <div className="text-right">64</div>
                  </div>
                </div>
              )}

              {/* Character Types */}
              {!selectedPreset ? (
                <div className="space-y-4">
                  <h3 className="font-medium">{t("character-types")}</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-blue-600">abc</span>
                        <Label htmlFor="include-lowercase">
                          {t("lowercases")}
                        </Label>
                      </div>
                      <Switch
                        id="include-lowercase"
                        checked={includeLowercase}
                        onCheckedChange={setIncludeLowercase}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-red-600">ABC</span>
                        <Label htmlFor="include-uppercase">
                          {t("uppercases")}
                        </Label>
                      </div>
                      <Switch
                        id="include-uppercase"
                        checked={includeUppercase}
                        onCheckedChange={setIncludeUppercase}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-green-600">123</span>
                        <Label htmlFor="include-numbers">{t("nbrs")}</Label>
                      </div>
                      <Switch
                        id="include-numbers"
                        checked={includeNumbers}
                        onCheckedChange={setIncludeNumbers}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-600">!@#</span>
                        <Label htmlFor="include-special">
                          {t("specialchars")}
                        </Label>
                      </div>
                      <Switch
                        id="include-special"
                        checked={includeSpecial}
                        onCheckedChange={setIncludeSpecial}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-primary bg-primary/20 text-primary my-2 flex items-center space-x-2 rounded-md border p-2">
                  <Info16Regular />
                  <p>{t("preset-selected-msg")}</p>
                </div>
              )}
              <div className="flex">
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
                        <h4 className="text-xl font-bold">
                          {t("no-activity")}
                        </h4>
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
                        <h4 className="text-xl font-bold">
                          {t("no-activity")}
                        </h4>
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

              {/* Number of Passwords */}
              <div className="space-y-2">
                <Label htmlFor="number-of-passwords-advanced">
                  {t("amount")}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="number-of-passwords-advanced"
                    type="number"
                    min="1"
                    max="50"
                    value={numberOfPasswords}
                    onChange={(e) =>
                      setNumberOfPasswords(
                        Math.max(
                          1,
                          Math.min(50, Number.parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground text-sm">
                    {t("multipasswords-desc")}
                  </span>
                </div>
              </div>

              {/* Password Stats */}
              <div className="space-y-4">
                <h3 className="font-medium">{t("strength")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                    <div className="text-sm text-green-600">
                      {t("lowercases")}
                    </div>
                    <div className="text-xl font-bold">
                      {passwordStats.lowercase}
                    </div>
                  </div>
                  <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                    <div className="text-sm text-red-600">
                      {t("uppercases")}
                    </div>
                    <div className="text-xl font-bold">
                      {passwordStats.uppercase}
                    </div>
                  </div>
                  <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                    <div className="text-sm text-blue-600">{t("nbrs")}</div>
                    <div className="text-xl font-bold">
                      {passwordStats.numbers}
                    </div>
                  </div>
                  <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                    <div className="text-sm text-purple-600">
                      {t("specialchars")}
                    </div>
                    <div className="text-xl font-bold">
                      {passwordStats.special}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>
                      {t("entropy", { entropy: passwordStats.entropy })}
                    </Label>
                    <span>{getStrengthLabel(passwordStats.entropy)}</span>
                  </div>
                  <Progress
                    value={Math.min(passwordStats.entropy, 128) / 1.28}
                    bg={getStrengthColor(passwordStats.entropy)}
                  />
                  <p className="text-muted-foreground text-sm">
                    {t("estimated-time", {
                      time: getTimeToCrack(passwordStats.entropy),
                    })}
                  </p>
                </div>
              </div>

              {/* Multiple Passwords Display */}
              {numberOfPasswords > 1 && generatedPasswords.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t("results")}</Label>

                    <div className="flex space-x-2">
                      <Dialog>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <DialogTrigger>
                                <Button variant="outline" size="sm">
                                  <ArrowDownload20Regular />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>{t("export-csv")}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

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
                                generatedPasswords.join(
                                  csvSeparator === "colon" ? "," : ";"
                                )
                              )
                            }
                          >
                            <Button
                              variant="outline"
                              className="m-2 flex space-x-1"
                            >
                              <ArrowDownload16Regular />
                              <span>{t("export")}</span>
                            </Button>
                          </Link>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyAllPasswords}
                      >
                        {t("copy-all")}
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto rounded-md border">
                    <table className="w-full">
                      <tbody>
                        {generatedPasswords.map((password, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="px-3 py-2 text-sm font-medium">
                              #{index + 1}
                            </td>
                            <td className="max-w-[300px] truncate px-3 py-2 font-mono text-sm">
                              {showPassword
                                ? password
                                : "•".repeat(password.length)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyPasswordAtIndex(index)}
                              >
                                <Copy20Regular className="h-3 w-3" />
                                <span className="sr-only">
                                  {t("copy-password-index", {
                                    index: index + 1,
                                  })}
                                </span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={generateAdvancedPassword}
                className="flex w-full items-center gap-2"
              >
                <ArrowClockwise20Regular className="h-4 w-4" />
                {t("generate-new-password")}
              </Button>
            </CardFooter>
          </Card>
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
