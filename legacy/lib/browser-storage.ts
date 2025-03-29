import { Activities, Activity } from "@/types/activity"
import { Settings } from "@/types/settings"
import { PasswordPreset } from "./password-preset"

export function GetActivity() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("activity")) || { items: [] }
  }
  return { items: [] }
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

export function GetSettings(): Settings {
  if (typeof window !== "undefined") {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        // default object
        passwordLengthOne: 12,
        passwordLengthTwo: 19,
        encryptAlgo: "aes",
        customChars: {
          lowerCases: "abcdefghijklmnopqrstuvwxyz",
          upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          numbers: "01234567889",
          special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
        },
        hidePassword: false,
        openaiKey: "",
      }
    )
  }
  return {
    // default object
    passwordLengthOne: 12,
    passwordLengthTwo: 19,
    encryptAlgo: "aes",
    customChars: {
      lowerCases: "abcdefghijklmnopqrstuvwxyz",
      upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "01234567889",
      special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
    },
    hidePassword: false,
    openaiKey: "",
  }
}

export function SetSettings(settings: Settings) {
  if (typeof window !== "undefined") {
    localStorage.setItem("settings", JSON.stringify(settings))
  }
}

export function GetPresets(): PasswordPreset[] {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("passliss-presets")) || []
  }
  return []
}

export function SavePresets(presets: PasswordPreset[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("passliss-presets", JSON.stringify(presets))
  }
}

export function AddPreset(preset: PasswordPreset) {
  if (typeof window !== "undefined") {
    let presets = GetPresets()
    presets.push(preset)
    SavePresets(presets)
  }
}
