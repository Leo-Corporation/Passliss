export interface Activity {
  date: Date
  content: string
}

export interface Activities {
  items: Activity[]
}

export function getActivity() {
  if (typeof window !== "undefined") {
    const activity = localStorage.getItem("activity")
    if (activity) {
      return JSON.parse(activity) || { items: [] }
    }
    localStorage.setItem("activity", JSON.stringify({ items: [] }))
    return { items: [] }
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
