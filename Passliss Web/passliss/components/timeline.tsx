import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import ActivityItem from "./activity-item"

export interface TimelineProps {
  date: number
  items: Activity[]
}

export default function Timeline(props: TimelineProps) {
  const { t } = useTranslation("common")
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

  return (
    <section>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="border-l border-slate-400 dark:border-slate-600">
        {props.items.map((el) => (
          <ActivityItem activity={el} />
        ))}
      </div>
    </section>
  )
}
