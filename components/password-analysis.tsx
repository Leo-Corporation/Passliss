"use client"

import { useTranslations } from "next-intl"

export interface PasswordAnalysisProps {
  generatedPassword: string
}

export default function PasswordAnalysis(props: PasswordAnalysisProps) {
  const t = useTranslations()
  const { generatedPassword } = props
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
  return (
    <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
      {renderColoredPassword()}
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="text-blue-600">{t("lowercases")}</span>
        <span className="text-red-600">{t("uppercases")}</span>
        <span className="text-green-600">{t("nbrs")}</span>
        <span className="text-purple-600">{t("specialchars")}</span>
      </div>
    </div>
  )
}
