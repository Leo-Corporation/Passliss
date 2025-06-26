"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import clsx from "clsx"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  bg?: string
}

function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={clsx(
          "h-full w-full flex-1 transition-all",
          props.bg ?? "bg-primary"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
