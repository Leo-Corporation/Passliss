import Head from "next/head"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { PageContent } from "@/components/page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useTranslation from 'next-translate/useTranslation'
import { Slider } from "@/components/ui/slider"
import { GeneratePasswordByStrength } from "@/lib/password-gen"
import { CheckmarkCircleFilled, CheckmarkStarburstFilled, DismissCircle24Filled, DismissCircleFilled, WarningFilled } from "@fluentui/react-icons"
import ReactDOM from "react-dom"

export default function IndexPage() {
    const { t } = useTranslation("common") // default namespace (optional)
    let sliderVal = 2;
    function NewBtnClick() {
        let txt = document.getElementById("PasswordTxt");
        txt.innerHTML = GeneratePasswordByStrength(sliderVal);
    }

    function CopyBtn() {
        let txt = document.getElementById("PasswordTxt");
        navigator.clipboard.writeText(txt.innerHTML);
    }

    function SliderChange(newValue) {
        let p = document.getElementById("StrengthTxt");
        let txt = document.getElementById("PasswordTxt");
        txt.innerHTML = GeneratePasswordByStrength(newValue[0]);
        sliderVal = newValue[0];
        switch (newValue[0]) {
            case 0:
                p.innerHTML = t("strength-low");
                break;
            case 1:
                p.innerHTML = t("strength-medium");

                break;
            case 2:
                p.innerHTML = t("strength-good");

                break;
            case 3:
                p.innerHTML = t("strength-excellent");

                break;
            default:
                break;
        }
    }

    return (
        <Layout>
            <Head>
                <title>Passliss</title>
                <meta
                    name="description"
                    content="Passliss is a simple yet modern password generator."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContent page="generate">
                <Tabs defaultValue="simple">
                    <TabsList>
                        <TabsTrigger value="simple">{t("simple")}</TabsTrigger>
                        <TabsTrigger value="advanced">{t("advanced")}</TabsTrigger>
                    </TabsList>
                    <TabsContent className="border-none flex justify-center" value="simple">
                        <div className="flex flex-col items-center w-full">
                            <p className="text-xl font-bold m-5" id="PasswordTxt"></p>
                            <div className="flex space-x-2">
                                <Button className="py-1 px-2 h-auto" onClick={NewBtnClick}>New</Button>
                                <Button className="py-1 px-2 h-auto" variant="outline" onClick={CopyBtn}>Copy</Button>
                            </div>
                            <Slider id="StrengthSlider" onValueChange={SliderChange} defaultValue={[2]} max={3} step={1} className="m-5 sm:w-[50%]" />
                            <div id="StrengthTxt"></div>
                        </div>
                    </TabsContent>
                    <TabsContent className="border-none" value="advanced">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Advanced
                        </p>

                    </TabsContent>
                </Tabs>
            </PageContent>
        </Layout>
    )
}
