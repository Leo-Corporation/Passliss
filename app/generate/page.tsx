"use client"

import { useState } from "react"
import Link from "next/link"
import { usePresets } from "@/hooks/use-presets"
import { useSettings } from "@/hooks/use-settings"
import {
  Add16Regular,
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
  Info16Regular,
  LightbulbFilament48Regular,
  LockClosed20Regular,
  Settings20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons"
import { Close, DialogClose } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import OpenAI from "openai"
import { toast } from "sonner"

import { addActivity } from "@/lib/browser-storage"
import {
  generatePassword,
  generatePasswordByStrength,
  generatePasswordUsingPreset,
  getRandomPrompt,
  getStrengthInfo,
  PasswordPreset,
} from "@/lib/password"
import PasswordAnalysis from "@/components/password-analysis"
import PasswordStats from "@/components/password-stats"
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

export default function GeneratePage() {
  const { settings, setSettings } = useSettings()

  const t = useTranslations()
  const lang = t("lang")
  const [generatedPassword, setGeneratedPassword] = useState(
    generatePasswordByStrength(2, settings.customChars)
  )
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)
  const [passwordStats, setPasswordStats] = useState(
    getStrengthInfo(generatedPassword)
  )

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
  const [apiKey, setApiKey] = useState("")
  const [promptText, setPromptText] = useState("")
  const [aiPasswords, setAiPasswords] = useState<string[]>([])
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)

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

  const [showAI, setShowAI] = useState(
    !(
      settings.openaiKey == null ||
      settings.openaiKey == undefined ||
      settings.openaiKey == ""
    )
  )

  async function generateAiPassword() {
    setIsGeneratingAi(true)
    const openai = new OpenAI({
      apiKey: settings.openaiKey,
      dangerouslyAllowBrowser: true,
    })
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'GOAL: Generate ONLY 3 complex passwords according to the user prompt.\nOUTPUT: Use the following format (JSON array):\n{"passwords": ["", "", ""]}',
          },
          {
            role: "user",
            content: promptText,
          },
        ],
      })
      const res = completion.choices[0].message.content
      const obj = JSON.parse(res ?? "{}")
      if (!Array.isArray(obj.passwords)) {
        setAiPasswords(["An error has occurred, please try again"])
        return
      }
      setAiPasswords(obj.passwords)
      setGeneratedPassword(obj.passwords[0])
      setPasswordStats(getStrengthInfo(obj.passwords[0]))
      addActivity({
        date: new Date(),
        content: obj.passwords[0],
      })
    } catch (err) {
      setAiPasswords([(err as Error).message])
    }
    setIsGeneratingAi(false)
  }
  const [selectedPreset, setSelectedPreset] = useState<PasswordPreset | null>()
  const { presets } = usePresets()
  return (
    <div>
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
                <PasswordAnalysis generatedPassword={generatedPassword} />
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
                <PasswordAnalysis generatedPassword={generatedPassword} />
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
                    <span className="text-red-600">{t("remove-preset")}</span>
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
                <PasswordStats passwordAnalysis={passwordStats} />

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
        <TabsContent className="flex justify-center border-none" value="ai">
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
            <Card className="w-full max-w-250 sm:min-w-150 xl:min-w-200">
              <CardHeader>
                <CardTitle>{t("ai")}</CardTitle>
                <CardDescription>{t("generate-ai-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipContent>{t("ai-prompt-tooltip")}</TooltipContent>
                      <TooltipTrigger>
                        <Label
                          onClick={() => setPromptText(getRandomPrompt(lang))}
                          htmlFor="prompt-text"
                          className="decoration-foreground/50 cursor-pointer underline decoration-dotted underline-offset-2"
                        >
                          {t("enter-prompt")}
                        </Label>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="flex gap-2">
                    <Input
                      id="prompt-text"
                      placeholder={t("ai-prompt-placeholder")}
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={generateAiPassword}
                      disabled={isGeneratingAi || !promptText.trim()}
                      className="flex-shrink-0"
                    >
                      {isGeneratingAi ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t("ai-loading")}
                        </>
                      ) : (
                        <>
                          <Sparkle20Regular className="mr-2 h-4 w-4" />
                          {t("generate")}
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {t("ai-prompt-desc")}
                  </p>
                </div>

                {/* Generated Password Display */}
                {aiPasswords.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">{t("ai-suggestions")}</h3>
                    <div className="space-y-3">
                      {aiPasswords.map((password, index) => (
                        <div
                          key={index}
                          className="bg-secondary dark:bg-primary-foreground flex items-center justify-between rounded-md p-3"
                        >
                          <div className="space-y-1">
                            <div className="font-mono text-lg">
                              {showPassword
                                ? password
                                : "•".repeat(password.length)}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {t("suggestion-index", {
                                index: index + 1,
                              })}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setGeneratedPassword(password)
                                setPasswordStats(getStrengthInfo(password))
                              }}
                            >
                              {t("select")}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(password)
                                toast(t("copied"))
                              }}
                            >
                              <Copy20Regular className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Password Analysis */}
                {aiPasswords.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      {t("selected-password-analysis")}
                    </h3>

                    {/* Password Preview */}
                    {showPassword && (
                      <PasswordAnalysis generatedPassword={generatedPassword} />
                    )}

                    {/* Password Stats */}
                    <PasswordStats passwordAnalysis={passwordStats} />

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
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
