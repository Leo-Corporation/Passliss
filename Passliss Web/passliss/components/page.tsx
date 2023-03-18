import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { Settings20Filled, History20Filled, LockClosed24Regular, Shield24Regular, Translate24Regular, Navigation24Regular, Home20Filled, LockClosed20Regular, Translate20Regular, Shield20Regular } from '@fluentui/react-icons';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';

export interface PageProps {
    children: React.ReactNode,
    page: string
}

export function PageContent({ children, page }: PageProps) {
    const { t } = useTranslation("common")
    return (
        <>
            <header className='p-2 pt-5 flex space-x-2'>
                <Sheet>
                    <SheetTrigger>
                        <Button className="md:hidden" variant="ghost">
                            <Navigation24Regular />
                        </Button>
                    </SheetTrigger>
                    <SheetContent position='left' size='content'>
                        <nav>
                            <h3 className="font-bold m-2 text-xs">{t("pinned")}</h3>
                            <Link className={buttonVariants({
                                size: "sm",
                                variant: page == "home" ? "navselect" : "nav",
                                className: "text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                            })} href={"/home"}>
                                <div className="p-1 rounded-lg bg-gradient-to-br from-[#0088FF] to-[#2153E0]">
                                    <Home20Filled className="text-white" />
                                </div>
                                <p className="ml-2">{t("home")}</p>
                            </Link>

                            <Link className={buttonVariants({
                                size: "sm",
                                variant: page == "activity" ? "navselect" : "nav",
                                className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                            })} href={"/activity"}>
                                <div className="p-1 rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#9A21E0]">
                                    <History20Filled className="text-white" />
                                </div>
                                <p className="ml-2">{t("activity")}</p>
                            </Link>

                            <Link className={buttonVariants({
                                size: "sm",
                                variant: page == "settings" ? "navselect" : "nav",
                                className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                            })} href={"/settings"}>
                                <div className="p-1 rounded-lg bg-gradient-to-br from-[#B1B1B1] to-[#343C51]">
                                    <Settings20Filled className="text-white" />
                                </div>
                                <p className="ml-2">{t("settings")}</p>
                            </Link>
                            <h3 className="font-bold m-2 text-xs">{t("tools")}</h3>
                            <Link className={buttonVariants({
                                size: "nav",
                                variant: page == "generate" ? "navselect2" : "nav2",
                                className: "text-[#0088FF] w-full mx-2 my-1",
                            })} href={"/generate"}>
                                <LockClosed20Regular className="text-[#0088FF]" />

                                <p className="ml-2">{t("generate")}</p>
                            </Link>
                            <Link className={buttonVariants({
                                size: "nav",
                                variant: page == "strength" ? "navselect2" : "nav2",
                                className: "text-[#0088FF] w-full mx-2 my-1",
                            })} href={"/strength"}>
                                <Shield20Regular
                                    className="text-[#0088FF]" />

                                <p className="ml-2">{t("strength")}</p>
                            </Link>
                            <Link className={buttonVariants({
                                size: "nav",
                                variant: page == "crypt" ? "navselect2" : "nav2",
                                className: "text-[#0088FF] w-full mx-2 my-1",
                            })} href={"/encryption"}>
                                <Translate20Regular className="text-[#0088FF]" />

                                <p className="ml-2">{t("encryption")}</p>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div>
                    <h1 className='font-bold text-4xl'>{t("title")}</h1>
                    <p className='font-bold'>{t("hello")}</p>
                </div>
            </header>
            <section className="grid grid-cols-4 xl:grid-cols-5">
                <nav className='hidden md:block m-2'>
                    <h3 className="font-bold m-2 text-xs">{t("pinned")}</h3>
                    <Link className={buttonVariants({
                        size: "sm",
                        variant: page == "home" ? "navselect" : "nav",
                        className: "text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                    })} href={"/home"}>
                        <div className="p-[5px] rounded-md bg-gradient-to-br from-[#0088FF] to-[#2153E0]">
                            <Home20Filled className="text-white" />
                        </div>
                        <p className="ml-2">{t("home")}</p>
                    </Link>

                    <Link className={buttonVariants({
                        size: "sm",
                        variant: page == "activity" ? "navselect" : "nav",
                        className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                    })} href={"/activity"}>
                        <div className="p-[5px] rounded-md bg-gradient-to-br from-[#6F00FF] to-[#9A21E0]">
                            <History20Filled className="text-white" />
                        </div>
                        <p className="ml-2">{t("activity")}</p>
                    </Link>

                    <Link className={buttonVariants({
                        size: "sm",
                        variant: page == "settings" ? "navselect" : "nav",
                        className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                    })} href={"/settings"}>
                        <div className="p-[5px] rounded-md bg-gradient-to-br from-[#B1B1B1] to-[#343C51]">
                            <Settings20Filled className="text-white" />
                        </div>
                        <p className="ml-2">{t("settings")}</p>
                    </Link>
                    <h3 className="font-bold m-2 text-xs">{t("tools")}</h3>
                    <Link className={buttonVariants({
                        size: "nav",
                        variant: page == "generate" ? "navselect2" : "nav2",
                        className: "text-[#0088FF] w-full mx-2 my-1",
                    })} href={"/generate"}>
                        <LockClosed20Regular className="text-[#0088FF]" />

                        <p className="ml-2">{t("generate")}</p>
                    </Link>
                    <Link className={buttonVariants({
                        size: "nav",
                        variant: page == "strength" ? "navselect2" : "nav2",
                        className: "text-[#0088FF] w-full mx-2 my-1",
                    })} href={"/strength"}>
                        <Shield20Regular
                            className="text-[#0088FF]" />

                        <p className="ml-2">{t("strength")}</p>
                    </Link>
                    <Link className={buttonVariants({
                        size: "nav",
                        variant: page == "crypt" ? "navselect2" : "nav2",
                        className: "text-[#0088FF] w-full mx-2 my-1",
                    })} href={"/encryption"}>
                        <Translate20Regular className="text-[#0088FF]" />

                        <p className="ml-2">{t("encryption")}</p>
                    </Link>
                </nav>
                <div className="md:col-start-2 col-span-5 p-2">{children}</div>
            </section>
        </>
    )
}