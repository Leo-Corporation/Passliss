"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, useSettings } from "@/hooks/use-settings"
import { ArrowClockwise20Regular } from "@fluentui/react-icons"
import { Check, Copy, Eye, EyeOff } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { generatePasswordByStrength } from "@/lib/password"
import DashboardCard from "@/components/dash-card"
import PasswordAnalysis from "@/components/password-analysis"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const t = useTranslations()

  const { settings } = useSettings()

  const [password, setPassword] = useState(
    generatePasswordByStrength(2, settings.customChars)
  )
  const [showPassword, setShowPassword] = useState(settings.hidePassword)
  const [copied, setCopied] = useState(false)

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

  function copy() {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
    toast(t("copied"))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t("title")}</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          {t("title-desc")}
        </p>
      </section>

      {/* Quick Password Generator */}
      <section className="mb-16">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>{t("quick-password-gen")}</CardTitle>
            <CardDescription>{t("quick-password-gen-desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Generated Password Display */}
            <div className="space-y-2">
              <Label htmlFor="quick-password">{t("password")}</Label>
              <div className="relative">
                <Input
                  id="quick-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
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
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copy}
                    className="h-full"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Password Preview */}
            {showPassword && <PasswordAnalysis generatedPassword={password} />}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() =>
                setPassword(generatePasswordByStrength(2, settings.customChars))
              }
              className="flex w-full items-center gap-2"
            >
              <ArrowClockwise20Regular className="h-4 w-4" />
              {t("generate-new-password")}
            </Button>
          </CardFooter>
        </Card>
      </section>
      {/* Features Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">{t("explore")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((el) => {
            return (
              <DashboardCard
                key={el.title}
                goto={t("go-to", { page: el.title })}
                link={el.link}
                title={el.title}
                description={el.description}
                icon={el.icon}
              />
            )
          })}
        </div>
      </section>
      {/* About Section */}
      <section className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold">{t("about")}</h2>
        <p className="text-muted-foreground mb-6">{t("about-home-desc")}</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="https://leocorporation.dev/store/passliss">
              {t("learn-more")}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/generate">{t("get-started")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
