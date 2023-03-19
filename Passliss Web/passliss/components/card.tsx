export interface CardProps {
    title: string,
    icon: string,
    description: string,
    link: string
}


export default function DashboardCard(props: CardProps) {
    return (
        <a href={props.link} className="m-3 p-5 rounded-lg bg-white dark:bg-slate-800 text-black dark:text-white flex space-x-2 w-[350px] items-center">
            <p className="icon-f text-4xl text-[#0088FF]">{props.icon}</p>
            <div>
                <h3 className="text-xl font-bold">{props.title}</h3>
                <p className="text-sm">{props.description}</p>
            </div>
        </a>
    )
}