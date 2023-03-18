import Head from "next/head"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { PageContent } from "@/components/page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useTranslation from 'next-translate/useTranslation'
import { Slider } from "@/components/ui/slider"
import { GeneratePassword, GeneratePasswordByStrength } from "@/lib/password-gen"
import { Password20Regular } from "@fluentui/react-icons"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"


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

    function AreOptionsChecked() {
        let lower = document.getElementById("LowerChk").getAttribute("aria-checked") == "true";
        let upper = document.getElementById("UpperChk").getAttribute("aria-checked") == "true";
        let nbr = document.getElementById("NbrChk").getAttribute("aria-checked") == "true";
        let special = document.getElementById("SpecialChk").getAttribute("aria-checked") == "true";
        return lower || upper || nbr || special;
    }

    function MultiplePasswordClick() {
        if (!AreOptionsChecked()) return;

        let amount: number = parseInt((document.getElementById("AmountTxt") as HTMLInputElement).value);
        let text = document.getElementById("TextArea") as HTMLTextAreaElement

        text.value = ""; // clear

        let lower = document.getElementById("LowerChk").getAttribute("aria-checked") == "true";
        let upper = document.getElementById("UpperChk").getAttribute("aria-checked") == "true";
        let nbr = document.getElementById("NbrChk").getAttribute("aria-checked") == "true";
        let special = document.getElementById("SpecialChk").getAttribute("aria-checked") == "true";
        let length = (document.getElementById("LengthTxt") as HTMLInputElement).value;


        for (let i = 0; i < amount; i++) {
            text.value += GeneratePassword(lower, upper, nbr, special, +length) + "\n";
        }
    }

    function NewBtnAdvancedClick() {
        if (!AreOptionsChecked()) return;

        let txt = document.getElementById("APasswordTxt");
        let lower = document.getElementById("LowerChk").getAttribute("aria-checked") == "true";
        let upper = document.getElementById("UpperChk").getAttribute("aria-checked") == "true";
        let nbr = document.getElementById("NbrChk").getAttribute("aria-checked") == "true";
        let special = document.getElementById("SpecialChk").getAttribute("aria-checked") == "true";
        let length = (document.getElementById("LengthTxt") as HTMLInputElement).value;

        txt.innerHTML = GeneratePassword(lower, upper, nbr, special, +length);
    }

    function CopyAdvancedBtn() {
        let txt = document.getElementById("APasswordTxt");
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
                            <p className="text-xl font-bold m-5" id="PasswordTxt">{GeneratePasswordByStrength(2)}</p>
                            <div className="flex space-x-2">
                                <Button className="py-1 px-2 h-auto" onClick={NewBtnClick}>New</Button>
                                <Button className="py-1 px-2 h-auto" variant="outline" onClick={CopyBtn}>Copy</Button>
                            </div>
                            <Slider id="StrengthSlider" onValueChange={SliderChange} defaultValue={[2]} max={3} step={1} className="m-5 sm:w-[50%]" />
                            <div id="StrengthTxt">{t("strength-good")}</div>
                        </div>
                    </TabsContent>
                    <TabsContent className="border-none" value="advanced">
                        <div className="flex flex-col items-center w-full">
                            <div className="max-w-full overflow-auto">
                                <p className="text-xl font-bold m-5" id="APasswordTxt">{GeneratePasswordByStrength(2)}</p>
                            </div>
                            <div className="flex space-x-2">
                                <Button className="py-1 px-2 h-auto" onClick={NewBtnAdvancedClick}>New</Button>
                                <Button className="py-1 px-2 h-auto" variant="outline" onClick={CopyAdvancedBtn}>Copy</Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="py-1 px-2 h-auto" variant="outline">
                                            <Password20Regular className="m-0 p-0" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>{t("multipasswords")}</DialogTitle>
                                            <DialogDescription>
                                                {t("multipasswords-desc")}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <div className="flex space-x-2 items-center">
                                                <Label htmlFor="AmountTxt">{t("amount")}</Label>
                                                <Input defaultValue={12} type="number" className="h-auto px-2 py-1" id="AmountTxt" />
                                                <Button className="py-1 px-2 h-auto" onClick={MultiplePasswordClick}>{t("generate")}</Button>

                                            </div>
                                            <div className="flex-col flex space-x-2 ">
                                                <Label htmlFor="TextArea">{t("results")}</Label>
                                                <Textarea className="mt-2 px-2 py-1" id="TextArea" />
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="grid md:grid-cols-2 grid-rows-4 m-5">
                                <div className="col-end-1 flex items-center space-x-2">
                                    <Switch id="LowerChk" defaultChecked={true} />
                                    <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                                </div>
                                <div className="col-start-2 flex space-x-2 items-center">
                                    <Label htmlFor="LengthTxt">{t("length")}</Label>
                                    <Input defaultValue={12} type="number" className="h-auto px-2 py-1" id="LengthTxt" />
                                </div>
                                <div className="col-end-1 flex items-center space-x-2">
                                    <Switch defaultChecked={true} id="UpperChk" />
                                    <Label htmlFor="UpperChk">{t("uppercases")}</Label>
                                </div>
                                <div className="col-end-1 flex items-center space-x-2">
                                    <Switch defaultChecked={true} id="NbrChk" />
                                    <Label htmlFor="NbrChk">{t("nbrs")}</Label>
                                </div>
                                <div className="col-end-1 flex items-center space-x-2">
                                    <Switch id="SpecialChk" />
                                    <Label htmlFor="SpecialChk">{t("specialchars")}</Label>
                                </div>

                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Layout>
    )
}
