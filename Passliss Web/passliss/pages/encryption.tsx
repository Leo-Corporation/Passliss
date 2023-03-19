import Head from "next/head"

import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import useTranslation from 'next-translate/useTranslation'
import { Translate20Regular } from "@fluentui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
var CryptoJS = require("crypto-js");


export default function EncryptionPage() {
    const { t } = useTranslation("common") // default namespace (optional)
    let algo = "aes";

    function SelectChanged(val) {
        algo = val;
    }

    function Encrypt() {
        let text = (document.getElementById("ToEncrypt") as HTMLInputElement).value;
        let key = (document.getElementById("EncryptKeyInput") as HTMLTextAreaElement).value;
        let result = document.getElementById("Encrypted") as HTMLTextAreaElement;

        switch (algo) {
            case "aes":
                result.value = CryptoJS.AES.encrypt(text, key);
                break;
            case "3des":
                result.value = CryptoJS.TripleDES.encrypt(text, key);

            default:
                break;
        }
    }

    function Decrypt() {
        let text = (document.getElementById("ToDecrypt") as HTMLInputElement).value;
        let key = (document.getElementById("DecryptKeyInput") as HTMLTextAreaElement).value;
        let result = document.getElementById("Decrypted") as HTMLTextAreaElement;

        switch (algo) {
            case "aes":
                result.value = hex2a(CryptoJS.AES.decrypt(text, key).toString());
                break;
            case "3des":
                result.value = hex2a(CryptoJS.TripleDES.decrypt(text, key).toString());

            default:
                break;
        }
    }

    function hex2a(hex: string): string {
        let str = "";
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
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
            <PageContent page="crypt">
                <div className="flex space-x-2 items-center mb-2">
                    <Translate20Regular primaryFill="#0088FF" className="text-white" />

                    <p className="font-bold ml-2">{t("encryption")}</p>
                </div>
                <Tabs defaultValue="encrypt">
                    <TabsList>
                        <TabsTrigger value="encrypt">{t("encrypt")}</TabsTrigger>
                        <TabsTrigger value="decrypt">{t("decrypt")}</TabsTrigger>
                        <Select defaultValue="aes" onValueChange={SelectChanged}>
                            <SelectTrigger className="h-auto">
                                <SelectValue placeholder={t("algorithm")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem defaultChecked={true} value="aes">AES</SelectItem>
                                <SelectItem value="3des">3DES</SelectItem>
                            </SelectContent>
                        </Select>
                    </TabsList>
                    <TabsContent className="border-none data-[state=active]:flex justify-center" value="encrypt">
                        <div className="w-full space-y-2">
                            <div className="flex items-center space-x-3">
                                <label htmlFor="EncryptKeyInput">{t("key")}</label>
                                <Input id="EncryptKeyInput" />
                                <Button id="EncryptBtn" onClick={Encrypt}>{t("encrypt")}</Button>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="ToEncrypt">{t("text-to-encrypt")}</label>
                                <Textarea id="ToEncrypt" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="Encrypted">{t("encrypted-text")}</label>
                                <Textarea id="Encrypted" />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent className="border-none" value="decrypt">
                        <div className="w-full space-y-2">
                            <div className="flex items-center space-x-3">
                                <label htmlFor="DecryptKeyInput">{t("key")}</label>
                                <Input id="DecryptKeyInput" />
                                <Button id="DecryptBtn" onClick={Decrypt}>{t("decrypt")}</Button>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="ToDecrypt">{t("text-to-decrypt")}</label>
                                <Textarea id="ToDecrypt" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="Decrypted">{t("decrypted-text")}</label>
                                <Textarea id="Decrypted" />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Layout>
    )
}