import { Copy16Regular } from "@fluentui/react-icons"

import { Button, buttonVariants } from "./ui/button"

export default function PasswordItem(props: { content: string }) {
  function Copy() {
    navigator.clipboard.writeText(props.content)
  }

  return (
    <div className="my-2 grid h-auto min-w-[150px] grid-cols-[1fr,24px] rounded-md border-0 bg-white px-2 py-1 shadow-md dark:bg-slate-800">
      <p>{props.content}</p>
      <Button onClick={Copy} variant="outline" className="h-auto p-0">
        <Copy16Regular />
      </Button>
    </div>
  )
}
