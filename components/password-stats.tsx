import clsx from "clsx"
import { useTranslations } from "next-intl"

import { PasswordAnalysis } from "@/lib/password"

export interface PasswordStatsProps {
  passwordAnalysis: PasswordAnalysis
  showLength?: boolean
  className?: string
}

export default function PasswordStats({
  passwordAnalysis,
  showLength = false,
  className = "",
}: PasswordStatsProps) {
  const t = useTranslations()
  return (
    <div className={clsx("grid grid-cols-2 gap-4", className)}>
      <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
        <div className="text-sm text-blue-600">{t("lowercases")}</div>
        <div className="text-xl font-bold">{passwordAnalysis.lowercase}</div>
      </div>
      <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
        <div className="text-sm text-red-600">{t("uppercases")}</div>
        <div className="text-xl font-bold">{passwordAnalysis.uppercase}</div>
      </div>
      <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
        <div className="text-sm text-green-600">{t("nbrs")}</div>
        <div className="text-xl font-bold">{passwordAnalysis.numbers}</div>
      </div>
      <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
        <div className="text-sm text-purple-600">{t("specialchars")}</div>
        <div className="text-xl font-bold">{passwordAnalysis.special}</div>
      </div>
      {showLength && (
        <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
          <div className="text-sm">{t("length")}</div>
          <div className="text-xl font-bold">{passwordAnalysis.length}</div>
        </div>
      )}
    </div>
  )
}
