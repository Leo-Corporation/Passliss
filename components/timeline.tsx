import { useState } from "react"
import useTranslation from "next-translate/useTranslation"

import { Activity } from "@/types/activity"
import { GetActivity, SortActivities } from "@/lib/browser-storage"
import ActivityItem from "./activity-item"

export interface TimelineProps {
  date: number
  items: Activity[]
  hide: boolean
  index: number
  refreshEvent: Function
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

  return (
    <section>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="border-l border-slate-400 dark:border-slate-600">
        {els.map((el, i) => (
          <ActivityItem
            timeline_index={props.index}
            index={i}
            key={i}
            deleteEvent={deleteElement}
            activity={el}
            hide={props.hide}
          />
        ))}
      </div>
    </section>
  )
}
