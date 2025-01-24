import { ChevronRight20Regular } from "@fluentui/react-icons"

export interface CardProps {
  title: string
  icon: string
  description: string
  link: string
}

export default function DashboardCard(props: CardProps) {
  return (
    <a
      href={props.link}
      className="group m-3 grid w-[350px] grid-cols-[auto_1fr_24px] items-center space-x-2 rounded-lg border border-accent bg-white p-5 text-black shadow-md shadow-accent-trans transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-trans dark:bg-slate-900 dark:text-white"
    >
      <p className="icon-f text-4xl text-accent">{props.icon}</p>
      <div>
        <h3 className="text-xl font-bold">{props.title}</h3>
        <p className="text-sm">{props.description}</p>
      </div>
      <p className="transition-all group-hover:translate-x-1">
        <ChevronRight20Regular color="#0088FF" />
      </p>
    </a>
  )
}
