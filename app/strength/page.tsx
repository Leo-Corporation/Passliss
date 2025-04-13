"use client"

import { useState } from "react"
import { Lightbulb20Regular, Shield20Regular } from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

import { getPasswordStrength, getStrengthInfo } from "@/lib/password"
import StrengthCharacter from "@/components/strength-character"
import StrengthSuggestion from "@/components/strength-suggestion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function StrengthPage() {
  const t = useTranslations()
  const [password, setPassword] = useState("")
  const [nbLowerCases, setNbLowerCases] = useState(0)
  const [nbUpperCases, setNbUpperCases] = useState(0)
  const [nbDigits, setNbDigits] = useState(0)
  const [nbSpecialChars, setNbSpecialChars] = useState(0)
  const [length, setLength] = useState(0)
  const [strengthColor, setStrengthColor] = useState("#E2E8F0")
  const [strengthIcon, setStrengthIcon] = useState("\uF4AB")
  const [strengthTxt, setStrengthTxt] = useState(
    t("enterpwrstrength").toString()
  )
  const [suggestions, setSuggestions] = useState<string[]>([])

  function getStrength(password: string) {
    // Get the strength of the password and update the UI depending on the result
    switch (getPasswordStrength(password)) {
      case 0:
        setStrengthTxt(t("strength-low"))
        setStrengthIcon("\uF36E")
        setStrengthColor("red")
        break
      case 1:
        setStrengthTxt(t("strength-medium"))
        setStrengthIcon("\uF882")
        setStrengthColor("#FF7B00")
        break
      case 2:
        setStrengthTxt(t("strength-good"))
        setStrengthIcon("\uF299")
        setStrengthColor("#68EA00")
        break
      case 3:
        setStrengthTxt(t("strength-excellent"))
        setStrengthIcon("\uF6EA")
        setStrengthColor("#00BF07")
        break
      default:
        setStrengthTxt(t("enterpwrstrength"))
        setStrengthIcon("\uF4AB")
        setStrengthColor("#E2E8F0")
        break
    }
    if (!password) {
      setStrengthTxt(t("enterpwrstrength"))
      setStrengthIcon("\uF4AB")
      setStrengthColor("#E2E8F0")
    }

    // Load the details panel
    const info = getStrengthInfo(password)
    setNbUpperCases(info.uppercases)
    setNbLowerCases(info.lowercases)
    setNbDigits(info.numbers)
    setNbSpecialChars(info.specialchars)
    setLength(password.length)

    // Load the suggestions panel
    let suggestions = []
    if (info.lowercases < 2)
      suggestions.push(t("strength-suggestion-lowercase"))
    if (info.uppercases < 2)
      suggestions.push(t("strength-suggestion-uppercase"))
    if (info.numbers < 2) suggestions.push(t("strength-suggestion-digit"))
    if (info.specialchars < 2)
      suggestions.push(t("strength-suggestion-special"))
    if (password.length < 10) suggestions.push(t("strength-suggestion-length"))
    if (suggestions.length < 1) suggestions.push(t("strength-no-suggestions"))
    setSuggestions(suggestions)
  }

  return (
    <main>
      <div className="mb-2 flex items-center space-x-2">
        <Shield20Regular primaryFill="#0088FF" className="text-white" />
        <p className="ml-2 font-bold">{t("strength")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="m-5 flex flex-col items-center">
          <Input
            placeholder={t("password")}
            onChange={(e) => {
              setPassword(e.target.value)
              getStrength(e.target.value)
            }}
            value={password}
            id="PasswordTxt"
          />
          <p
            className="icon-f m-2 text-6xl"
            id="StrengthIconTxt"
            style={{ color: strengthColor }}
          >
            {strengthIcon}
          </p>
          <p className="text-center font-bold" id="PasswordStrengthTxt">
            {strengthTxt}
          </p>
        </div>

        <Card className="mt-5 mr-5">
          <CardContent>
            <p className="text-center text-xl font-bold" id="PasswordContainer">
              {password.split("").map((el, i) => (
                <StrengthCharacter char={el} key={i} />
              ))}
            </p>
            <div className="grid grid-cols-2">
              <p className="font-bold text-[#FF2929]">{t("uppercases")}</p>
              <p className="font-bold text-[#FF2929]" id="UppercaseTxt">
                {nbUpperCases}
              </p>
              <p className="font-bold text-[#3B8AFF]">{t("lowercases")}</p>
              <p className="font-bold text-[#3B8AFF]" id="LowercaseTxt">
                {nbLowerCases}
              </p>
              <p className="font-bold text-[#007F5F]">{t("nbrs")}</p>
              <p className="font-bold text-[#007F5F]" id="NumbersTxt">
                {nbDigits}
              </p>
              <p className="font-bold text-[#9F2CF9]">{t("specialchars")}</p>
              <p className="font-bold text-[#9F2CF9]" id="SpecialTxt">
                {nbSpecialChars}
              </p>
              <p className="font-bold">{t("length")}</p>
              <p className="font-bold" id="LengthTxt">
                {length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      {password ? (
        <>
          <div className="mb-2 flex items-center space-x-2">
            <Lightbulb20Regular primaryFill="#0088FF" className="text-white" />
            <p className="ml-2 font-bold">{t("strength-suggestions")}</p>
          </div>
          <div>
            {suggestions.map((el, i) => (
              <StrengthSuggestion content={el} key={i} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  )
}
