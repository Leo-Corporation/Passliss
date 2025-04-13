import { PasswordPreset } from "./password"

export interface Activity {
  date: Date
  content: string
}

export interface Activities {
  items: Activity[]
}

export function getActivity() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("activity") ?? "[]") || { items: [] }
  }
  return { items: [] }
}

export function addActivity(activity: Activity) {
  let a: Activities = getActivity()
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

export function sortActivities(activities: Activities): Activity[][] {
  const sorted: Activity[][] = [[], [], [], []]
  activities.items.forEach((element) => {
    if (new Date(element.date).toDateString() == new Date().toDateString()) {
      sorted[0].push(element)
    } else if (
      (new Date().getTime() - new Date(element.date).getTime()) / 86400000 <
      7
    ) {
      sorted[1].push(element)
    } else if (
      (new Date().getTime() - new Date(element.date).getTime()) / 86400000 <
      31
    ) {
      sorted[2].push(element)
    } else {
      sorted[3].push(element)
    }
  })
  return sorted
}

export function getPresets(): PasswordPreset[] {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("passliss-presets") ?? "[]") || []
  }
  return []
}

export function savePresets(presets: PasswordPreset[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("passliss-presets", JSON.stringify(presets))
  }
}

export function addPreset(preset: PasswordPreset) {
  if (typeof window !== "undefined") {
    const presets = getPresets()
    presets.push(preset)
    savePresets(presets)
  }
}
