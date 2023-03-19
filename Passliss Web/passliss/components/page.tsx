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

    function GetWelcomeMessage(): string {
        let hour = new Date().getHours(); // Get the current hour
        if (hour >= 21 || hour <= 7) {
            // If between 9PM & 7AM
            return t("night"); // Return the correct value
        } else if (hour >= 7 && hour <= 12) {
            // If between 7AM - 12PM
            return t("hello"); // Return the correct value
        } else if (hour >= 12 && hour <= 17) {
            // If between 12PM - 5PM
            return t("afternoon"); // Return the correct value
        } else if (hour >= 17 && hour <= 21) {
            // If between 5PM - 9PM
            return t("evening"); // Return the correct value
        }
    }
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
                                <p className="font-bold ml-2">{t("home")}</p>
                            </Link>

                            <Link className={buttonVariants({
                                size: "sm",
                                variant: page == "activity" ? "navselect" : "nav",
                                className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                            })} href={"/activity"}>
                                <div className="p-1 rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#9A21E0]">
                                    <History20Filled className="text-white" />
                                </div>
                                <p className="font-bold ml-2">{t("activity")}</p>
                            </Link>

                            <Link className={buttonVariants({
                                size: "sm",
                                variant: page == "settings" ? "navselect" : "nav",
                                className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                            })} href={"/settings"}>
                                <div className="p-1 rounded-lg bg-gradient-to-br from-[#B1B1B1] to-[#343C51]">
                                    <Settings20Filled className="text-white" />
                                </div>
                                <p className="font-bold ml-2">{t("settings")}</p>
                            </Link>
                            <h3 className="font-bold m-2 text-xs">{t("tools")}</h3>
                            <Link className={buttonVariants({
                                size: "nav",
                                variant: page == "generate" ? "navselect2" : "nav2",
                                className: "text-[#0088FF] w-full mx-2 my-1",
                            })} href={"/generate"}>
                                <LockClosed20Regular />

                                <p className="font-bold ml-2">{t("generate")}</p>
                            </Link>
                            <Link className={buttonVariants({
                                size: "nav",
                                variant: page == "strength" ? "navselect2" : "nav2",
                                className: "text-[#0088FF] w-full mx-2 my-1",
                            })} href={"/strength"}>
                                <Shield20Regular />

                                <p className="font-bold ml-2">{t("strength")}</p>
                            </Link>
                            <Link className={buttonVariants({
                                size: "nav",
                                variant: page == "crypt" ? "navselect2" : "nav2",
                                className: "text-[#0088FF] w-full mx-2 my-1",
                            })} href={"/encryption"}>
                                <Translate20Regular />

                                <p className="font-bold ml-2">{t("encryption")}</p>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div>
                    <h1 className='font-bold text-4xl'>{t("title")}</h1>
                    <p className='font-bold'>{GetWelcomeMessage()}</p>
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
                        <p className="font-bold ml-2">{t("home")}</p>
                    </Link>

                    <Link className={buttonVariants({
                        size: "sm",
                        variant: page == "activity" ? "navselect" : "nav",
                        className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                    })} href={"/activity"}>
                        <div className="p-[5px] rounded-md bg-gradient-to-br from-[#6F00FF] to-[#9A21E0]">
                            <History20Filled className="text-white" />
                        </div>
                        <p className="font-bold ml-2">{t("activity")}</p>
                    </Link>

                    <Link className={buttonVariants({
                        size: "sm",
                        variant: page == "settings" ? "navselect" : "nav",
                        className: " text-black dark:text-white h-auto pr-3 pl-0 w-full my-1 mx-2",
                    })} href={"/settings"}>
                        <div className="p-[5px] rounded-md bg-gradient-to-br from-[#B1B1B1] to-[#343C51]">
                            <Settings20Filled className="text-white" />
                        </div>
                        <p className="font-bold ml-2">{t("settings")}</p>
                    </Link>
                    <h3 className="font-bold m-2 text-xs">{t("tools")}</h3>
                    <Link className={buttonVariants({
                        size: "nav",
                        variant: page == "generate" ? "navselect2" : "nav2",
                        className: "text-[#0088FF] w-full mx-2 my-1",
                    })} href={"/generate"}>
                        <LockClosed20Regular />

                        <p className="font-bold ml-2">{t("generate")}</p>
                    </Link>
                    <Link className={buttonVariants({
                        size: "nav",
                        variant: page == "strength" ? "navselect2" : "nav2",
                        className: "text-[#0088FF] w-full mx-2 my-1",
                    })} href={"/strength"}>
                        <Shield20Regular />

                        <p className="font-bold ml-2">{t("strength")}</p>
                    </Link>
                    <Link className={buttonVariants({
                        size: "nav",
                        variant: page == "crypt" ? "navselect2" : "nav2",
                        className: "text-[#0088FF] w-full mx-2 my-1",
                    })} href={"/encryption"}>
                        <Translate20Regular />

                        <p className="font-bold ml-2">{t("encryption")}</p>
                    </Link>
                </nav>
                <div className="md:col-start-2 col-span-5 p-2">{children}</div>
            </section>
        </>
    )
}