import { Activities, Activity } from "@/types/activity"

export function GetActivity() {
  return JSON.parse(localStorage.getItem("activity"))
}

export function AddActivity(activity: Activity) {
  let a: Activities = GetActivity()
  if (!a) {
    a = {
      items: [activity],
    }
    localStorage.setItem("activity", JSON.stringify(a))

    return
  }

  a.items.push(activity)
  localStorage.setItem("activity", JSON.stringify(a))
}

export function SortActivities(activities: Activities): Activity[][] {
  let sorted: Activity[][] = [[], [], [], []]
  activities.items.forEach((element) => {
    if (new Date(element.date).toDateString() == new Date().toDateString()) {
      sorted[0].push(element)
    } else if (
      (new Date(element.date).getTime() - new Date().getTime()) / 86400000 <
      7
    ) {
      sorted[1].push(element)
    } else if (
      (new Date(element.date).getTime() - new Date().getTime()) / 86400000 <
      31
    ) {
      sorted[2].push(element)
    } else {
      sorted[3].push(element)
    }
  })
  return sorted
}