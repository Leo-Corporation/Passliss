import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center rounded-md text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "font-bold justify-center bg-accent text-white hover:bg-accent/70 dark:hover:bg-accent/50",
        destructive:
          "justify-center bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "font-bold dark:hover:bg-slate-800 justify-center bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "justify-center bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        navselect:
          "justify-start bg-slate-200 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-800",
        navselect2:
          "justify-start bg-accent text-white hover:text-white dark:hover:bg-accent",
        ghost:
          "justify-center bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        nav: "justify-start bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        nav2: "justify-start bg-transparent hover:bg-[#99CFFF] dark:hover:bg-[#00529a]",
        link: "justify-center bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        destructiveghost:
          "justify-center bg-transparent hover:bg-red-100 dark:hover:bg-red-800 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent text-red-500",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
        nav: "px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
