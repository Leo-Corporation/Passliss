"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none items-center select-none",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <SliderPrimitive.Range className="bg-accent absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="bg-accent dark:bg-accent block size-5 rounded-full border-2 border-slate-900 transition-colors focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
