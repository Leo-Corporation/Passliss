import { useEffect, useState } from "react"
import { Copy16Regular } from "@fluentui/react-icons"

import { getPasswordStrength } from "@/lib/password"
import { Button } from "./ui/button"

export default function PasswordItem(props: { content: string }) {
  function Copy() {
    navigator.clipboard.writeText(props.content)
  }

  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("")
  function LoadIcon() {
    switch (getPasswordStrength(props.content)) {
      case 0:
        setIcon("\uF36E")
        setColor("red")
        break
      case 1:
        setIcon("\uF882")
        setColor("#FF7B00")
        break
      case 2:
        setIcon("\uF299")
        setColor("#68EA00")
        break
      case 3:
        setIcon("\uF6EA")
        setColor("#00BF07")
        break
      default:
        setIcon("\uF4AB")
        setColor("#E2E8F0")
        break
    }
  }
  useEffect(() => {
    LoadIcon()
  }, [LoadIcon])

  return (
    <div className="my-2 grid h-auto min-w-[150px] grid-cols-[24px_1fr_24px] rounded-md border-0 bg-white px-2 py-1 shadow-md dark:bg-slate-800">
      <p className="icon-f" style={{ color: color }}>
        {icon}
      </p>
      <p>{props.content}</p>
      <Button onClick={Copy} variant="outline" className="h-auto p-0">
        <Copy16Regular />
      </Button>
    </div>
  )
}
