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
      className="m-3 flex w-[350px] items-center space-x-2 rounded-lg bg-white p-5 text-black shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800 dark:text-white"
    >
      <p className="icon-f text-4xl text-[#0088FF]">{props.icon}</p>
      <div>
        <h3 className="text-xl font-bold">{props.title}</h3>
        <p className="text-sm">{props.description}</p>
      </div>
    </a>
  )
}
