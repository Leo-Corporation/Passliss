import { useState } from "react"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import { PasswordStrength } from "@/lib/password-gen"
import { GetPasswordStrength } from "@/lib/password-strength"
import ActivityItem from "./activity-item"

export interface TimelineProps {
  date: number
  items: Activity[]
  hide: boolean
  index: number
  refreshEvent: Function
  filter: string
  advancedVision: boolean
}

export default function Timeline(props: TimelineProps) {
  const { t } = useTranslation("common")
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
    let a = SortActivities(GetActivity())
    setEls(a[props.index])
    props.refreshEvent()
  }

  function matchFilter(password: string): boolean {
    if (props.filter === "all") return true
    let strength: PasswordStrength = GetPasswordStrength(password)
    switch (strength) {
      case PasswordStrength.VeryGood:
        return props.filter === "verygood"
      case PasswordStrength.Good:
        return props.filter === "good"
      case PasswordStrength.Medium:
        return props.filter === "medium"
      case PasswordStrength.Low:
        return props.filter === "low"
      default:
        return true
    }
  }

  return (
    <section>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="border-l border-slate-400 dark:border-slate-600">
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
