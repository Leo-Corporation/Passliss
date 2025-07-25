"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Activity, getActivity, sortActivities } from "@/lib/browser-storage"
import { getPasswordStrength, PasswordStrength } from "@/lib/password"
import ActivityItem from "./activity-item"

export interface TimelineProps {
  date: number
  items: Activity[]
  hide: boolean
  index: number
  refreshEvent: () => void
  filter: string
  advancedVision: boolean
}

export default function Timeline(props: TimelineProps) {
  const t = useTranslations()
  const [els, setEls] = useState(props.items)
  let title = ""
  switch (props.date) {
    case 0:
      title = t("today")
      break
    case 1:
      title = t("week")
      break
    case 2:
      title = t("month")
      break
    case 3:
      title = t("older")
      break
    default:
      title = t("today")
      break
  }

  function deleteElement() {
    const a = sortActivities(getActivity())
    setEls(a[props.index])
    props.refreshEvent()
  }

  function matchFilter(password: string): boolean {
    if (props.filter === "all") return true
    const strength: PasswordStrength = getPasswordStrength(password)
    switch (strength) {
      case PasswordStrength.VeryStrong:
        return props.filter === "verystrong"
      case PasswordStrength.Strong:
        return props.filter === "strong"
      case PasswordStrength.Moderate:
        return props.filter === "moderate"
      case PasswordStrength.Weak:
        return props.filter === "weak"
      case PasswordStrength.VeryWeak:
        return props.filter === "veryweak"
      default:
        return true
    }
  }

  return (
    <section>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="border-l">
        {els.map((el, i) => (
          <>
            {matchFilter(el.content) && (
              <ActivityItem
                advancedVision={props.advancedVision}
                timeline_index={props.index}
                index={i}
                key={i}
                deleteEvent={deleteElement}
                activity={el}
                hide={props.hide}
              />
            )}
          </>
        ))}
      </div>
    </section>
  )
}
