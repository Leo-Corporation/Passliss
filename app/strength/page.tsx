"use client"

import { useEffect, useState } from "react"
import {
  Checkmark20Regular,
  Dismiss20Regular,
  Eye20Regular,
  EyeOff20Regular,
  Shield20Regular,
} from "@fluentui/react-icons"
import { Label } from "@radix-ui/react-label"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function StrengthPage() {
  const t = useTranslations()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [analysis, setAnalysis] = useState({
    lowercase: 0,
    uppercase: 0,
    numbers: 0,
    special: 0,
    length: 0,
    score: 0,
  })
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Analyze password whenever it changes
  useEffect(() => {
    analyzePassword(password)
  }, [password])
  function analyzePassword(pwd: string) {
    // Count character types
    const lowercase = (pwd.match(/[a-z]/g) || []).length
    const uppercase = (pwd.match(/[A-Z]/g) || []).length
    const numbers = (pwd.match(/[0-9]/g) || []).length
    const special = (pwd.match(/[^a-zA-Z0-9]/g) || []).length
    const length = pwd.length

    // Calculate score (simple algorithm)
    let score = 0
    if (length > 0) {
      // Base score from length (up to 40 points)
      score += Math.min(length * 4, 40)

      // Points for character variety
      if (lowercase > 0) score += 5
      if (uppercase > 0) score += 10
      if (numbers > 0) score += 10
      if (special > 0) score += 15

      // Bonus for mixed character types
      const typesUsed = [
        lowercase > 0,
        uppercase > 0,
        numbers > 0,
        special > 0,
      ].filter(Boolean).length
      score += (typesUsed - 1) * 10
    }

    // Cap at 100
    score = Math.min(score, 100)

    // Generate suggestions
    const newSuggestions = []
    if (length < 8) {
      newSuggestions.push(t("strength-suggestion-length"))
    }
    if (lowercase === 0) {
      newSuggestions.push(t("strength-suggestion-lowercase"))
    }
    if (uppercase === 0) {
      newSuggestions.push(t("strength-suggestion-uppercase"))
    }
    if (numbers === 0) {
      newSuggestions.push(t("strength-suggestion-digit"))
    }
    if (special === 0) {
      newSuggestions.push(t("strength-suggestion-special"))
    }
    if (
      length > 0 &&
      (lowercase === length ||
        uppercase === length ||
        numbers === length ||
        special === length)
    ) {
      newSuggestions.push(t("strength-suggestion-mix"))
    }

    // Check for common patterns
    if (/^[0-9]+$/.test(pwd)) {
      newSuggestions.push(t("strength-suggestion-only-numbers"))
    }
    if (/^[a-zA-Z]+$/.test(pwd)) {
      newSuggestions.push(t("strength-suggestion-only-letters"))
    }
    if (/(.)\1{2,}/.test(pwd)) {
      newSuggestions.push(t("strength-suggestion-only-repeating"))
    }

    setAnalysis({
      lowercase,
      uppercase,
      numbers,
      special,
      length,
      score,
    })

    setSuggestions(newSuggestions)
  }

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
    if (!password) return null

    return (
      <div className="mt-2 font-mono text-lg break-all">
        {password.split("").map((char, index) => {
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
  return (
    <main>
      <div className="mb-2 flex items-center space-x-2">
        <Shield20Regular primaryFill="#0088FF" className="text-white" />
        <p className="ml-2 font-bold">{t("strength")}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Password Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("enter-password")}</CardTitle>
            <CardDescription>{t("password-desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enterpwrstrength")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff20Regular className="h-4 w-4" />
                    ) : (
                      <Eye20Regular className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>

              {password && (
                <div className="space-y-2">
                  <Label>{t("advanced-vision")}</Label>
                  <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
                    {renderColoredPassword()}
                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <span className="text-blue-600">{t("lowercases")}</span>
                      <span className="text-red-600">{t("uppercases")}</span>
                      <span className="text-green-600">{t("nbrs")}</span>
                      <span className="text-purple-600">
                        {t("specialchars")}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>
                      {t("strength")}: {getStrengthLabel(analysis.score)}
                    </Label>
                    <span>{analysis.score}%</span>
                  </div>
                  <Progress
                    value={analysis.score}
                    bg={getStrengthColor(analysis.score)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("password-analysis")}</CardTitle>
            <CardDescription>{t("password-analysis-desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Character counts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-4">
                  <div className="text-muted-foreground text-sm">
                    {t("length")}
                  </div>
                  <div className="text-2xl font-bold">{analysis.length}</div>
                </div>
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-4">
                  <div className="text-sm text-blue-600">{t("lowercases")}</div>
                  <div className="text-2xl font-bold">{analysis.lowercase}</div>
                </div>
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-4">
                  <div className="text-sm text-red-600">{t("uppercases")}</div>
                  <div className="text-2xl font-bold">{analysis.uppercase}</div>
                </div>
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-4">
                  <div className="text-sm text-green-600">{t("nbrs")}</div>
                  <div className="text-2xl font-bold">{analysis.numbers}</div>
                </div>
                <div className="bg-secondary dark:bg-primary-foreground rounded-md p-4">
                  <div className="text-sm text-purple-600">
                    {t("specialchars")}
                  </div>
                  <div className="text-2xl font-bold">{analysis.special}</div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <h3 className="font-medium">{t("strength-suggestions")}</h3>
                {suggestions.length > 0 ? (
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Dismiss20Regular className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : password ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Checkmark20Regular className="h-5 w-5" />
                    <span>{t("strength-no-suggestions")}</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Enter a password to see suggestions
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
