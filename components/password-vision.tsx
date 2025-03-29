import { useState } from "react"
import { Eye16Regular, EyeOff16Regular } from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

import StrengthCharacter from "./strength-character"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export default function PasswordVisionText(props: { content: string }) {
  const [visionToggle, setVisionToggle] = useState(false)
  const t = useTranslations() // default namespace (optional)
  return (
    <div className="flex items-center">
      <p className="m-5 mr-0 text-xl font-bold">
        {visionToggle ? (
          <>
            {props.content.split("").map((c, i) => (
              <StrengthCharacter char={c} key={i} />
            ))}
          </>
        ) : (
          props.content
        )}
      </p>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                setVisionToggle(!visionToggle)
              }}
              variant="outline"
              className="m-2 h-auto p-1"
            >
              {visionToggle ? <EyeOff16Regular /> : <Eye16Regular />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("advanced-vision")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
