import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"
import { LayoutProps } from "./layout"
import { buttonVariants } from "./ui/button"
import { Home24Filled, Settings24Filled, History24Filled, LockClosed24Regular, Shield24Regular, Translate24Regular } from '@fluentui/react-icons';


export function PageContent({ children }: LayoutProps) {
    const { t } = useTranslation("common") // default namespace (optional)
    return (

        <section className="grid grid-cols-4 xl:grid-cols-5">
            <nav>
                <h3 className="font-bold m-2">{t("pinned")}</h3>
                <Link className={buttonVariants({
                    size: "sm",
                    variant: "nav",
                    className: " text-slate-700 dark:text-slate-400 h-auto pr-3 pl-0 w-full m-2",
                })} href={"/home"}>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#0088FF] to-[#2153E0]">
                        <Home24Filled className="text-white" />
                    </div>
                    <p className="ml-2">{t("home")}</p>
                </Link>

                <Link className={buttonVariants({
                    size: "sm",
                    variant: "nav",
                    className: " text-slate-700 dark:text-slate-400 h-auto pr-3 pl-0 w-full m-2",
                })} href={"/activity"}>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#9A21E0]">
                        <History24Filled className="text-white" />
                    </div>
                    <p className="ml-2">{t("activity")}</p>
                </Link>

                <Link className={buttonVariants({
                    size: "sm",
                    variant: "nav",
                    className: " text-slate-700 dark:text-slate-400 h-auto pr-3 pl-0 w-full m-2",
                })} href={"/settings"}>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#B1B1B1] to-[#343C51]">
                        <Settings24Filled className="text-white" />
                    </div>
                    <p className="ml-2">{t("settings")}</p>
                </Link>
                <h3 className="font-bold m-2">{t("tools")}</h3>
                <Link className={buttonVariants({
                    size: "sm",
                    variant: "nav",
                    className: " text-slate-700 dark:text-slate-400 px-3 w-full mx-2 my-1",
                })} href={"/generate"}>
                    <LockClosed24Regular className="text-white" />

                    <p className="ml-2">{t("generate")}</p>
                </Link>
                <Link className={buttonVariants({
                    size: "sm",
                    variant: "nav",
                    className: " text-slate-700 dark:text-slate-400 px-3 w-full mx-2 my-1",
                })} href={"/strength"}>
                    <Shield24Regular
                        className="text-white" />

                    <p className="ml-2">{t("strength")}</p>
                </Link>
                <Link className={buttonVariants({
                    size: "sm",
                    variant: "nav",
                    className: " text-slate-700 dark:text-slate-400 px-3 w-full mx-2 my-1",
                })} href={"/encryption"}>
                    <Translate24Regular className="text-white" />

                    <p className="ml-2">{t("encryption")}</p>
                </Link>
            </nav>
            <div className="col-start-1">{children}</div>
        </section>
    )

}