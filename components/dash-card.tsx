import Link from "next/link"
import { ArrowRight20Regular } from "@fluentui/react-icons"

import { Button } from "./ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

export interface CardProps {
  title: string
  icon: string
  description: string
  goto: string
  link: string
}

export default function DashboardCard(props: CardProps) {
  return (
    <Card key={props.title} className="flex h-full flex-col">
      <CardHeader>
        <div className="icon-f text-primary mb-2 text-3xl">{props.icon}</div>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link
            href={props.link}
            className="flex items-center justify-center gap-2"
          >
            {props.goto}
            <ArrowRight20Regular className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
