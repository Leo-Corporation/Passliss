import { useState } from "react"
import Head from "next/head"
import { Key20Regular, Translate20Regular } from "@fluentui/react-icons"
import useTranslation from "next-translate/useTranslation"

import { Settings } from "@/types/settings"
import { GetSettings } from "@/lib/browser-storage"
import { GeneratePasswordByStrength } from "@/lib/password-gen"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

var CryptoJS = require("crypto-js")

export default function EncryptionPage() {
  const { t } = useTranslation("common") // default namespace (optional)

  let settings: Settings = undefined
  function LoadSettings() {
    settings = GetSettings()
  }
  LoadSettings()

  let algo = settings.encryptAlgo

  function SelectChanged(val) {
    algo = val
  }

  const [text, setText] = useState("")
  const [key, setKey] = useState("")
  const [encrypted, setEncrypted] = useState("")
  const [d_text, setD_Text] = useState("")
  const [d_key, setD_Key] = useState("")
  const [d_encrypted, setD_Encrypted] = useState("")
  function Encrypt() {
    switch (algo) {
      case "aes":
        setEncrypted(CryptoJS.AES.encrypt(text, key))
        break
      case "3des":
        setEncrypted(CryptoJS.TripleDES.encrypt(text, key))

      default:
        break
    }
  }

  function Decrypt() {
    switch (algo) {
      case "aes":
        setD_Encrypted(hex2a(CryptoJS.AES.decrypt(d_text, d_key).toString()))
        break
      case "3des":
        setD_Encrypted(
          hex2a(CryptoJS.TripleDES.decrypt(d_text, d_key).toString())
        )

      default:
        break
    }
  }

  function hex2a(hex: string): string {
    let str = ""
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
  }

  function GenKey() {
    let keyTxt = document.getElementById("EncryptKeyInput") as HTMLInputElement
    keyTxt.value = GeneratePasswordByStrength(2, {
      lowerCases: "abcdefghijklmnopqrstuvwxyz",
      upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "01234567889",
      special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
    })
  }

  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="crypt">
        <div className="mb-2 flex items-center space-x-2">
          <Translate20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("encryption")}</p>
        </div>
        <Tabs defaultValue="encrypt">
          <TabsList>
            <TabsTrigger value="encrypt">{t("encrypt")}</TabsTrigger>
            <TabsTrigger value="decrypt">{t("decrypt")}</TabsTrigger>
            <Select
              defaultValue={settings.encryptAlgo}
              onValueChange={SelectChanged}
            >
              <SelectTrigger className="mx-1 h-auto px-2 py-1">
                <SelectValue placeholder={t("algorithm")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultChecked={true} value="aes">
                  AES
                </SelectItem>
                <SelectItem value="3des">3DES</SelectItem>
              </SelectContent>
            </Select>
          </TabsList>
          <TabsContent
            className="justify-center border-none data-[state=active]:flex"
            value="encrypt"
          >
            <div className="w-full space-y-2">
              <div className="flex items-center space-x-3">
                <label htmlFor="EncryptKeyInput">{t("key")}</label>
                <Input
                  type="password"
                  className="h-auto px-2 py-1"
                  id="EncryptKeyInput"
                  defaultValue={key}
                  onChange={() =>
                    setKey(
                      (
                        document.getElementById(
                          "EncryptKeyInput"
                        ) as HTMLTextAreaElement
                      ).value
                    )
                  }
                />
                <Button
                  className="h-auto px-2 py-1"
                  id="EncryptBtn"
                  onClick={Encrypt}
                >
                  {t("encrypt")}
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-auto px-2 py-1"
                        id="GenKeyBtn"
                        onClick={GenKey}
                      >
                        <Key20Regular />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("generate-key")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                <label htmlFor="ToEncrypt">{t("text-to-encrypt")}</label>
                <Textarea
                  id="ToEncrypt"
                  defaultValue={text}
                  onChange={() =>
                    setText(
                      (document.getElementById("ToEncrypt") as HTMLInputElement)
                        .value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Encrypted">{t("encrypted-text")}</label>
                <Textarea readOnly={true} id="Encrypted" value={encrypted} />
              </div>
            </div>
          </TabsContent>
          <TabsContent className="border-none" value="decrypt">
            <div className="w-full space-y-2">
              <div className="flex items-center space-x-3">
                <label htmlFor="DecryptKeyInput">{t("key")}</label>
                <Input
                  type="password"
                  className="h-auto px-2 py-1"
                  id="DecryptKeyInput"
                  defaultValue={d_key}
                  onChange={() =>
                    setD_Key(
                      (
                        document.getElementById(
                          "DecryptKeyInput"
                        ) as HTMLInputElement
                      ).value
                    )
                  }
                />
                <Button
                  className="h-auto px-2 py-1"
                  id="DecryptBtn"
                  onClick={Decrypt}
                >
                  {t("decrypt")}
                </Button>
              </div>
              <div className="space-y-2">
                <label htmlFor="ToDecrypt">{t("text-to-decrypt")}</label>
                <Textarea
                  id="ToDecrypt"
                  defaultValue={d_text}
                  onChange={() =>
                    setD_Text(
                      (document.getElementById("ToDecrypt") as HTMLInputElement)
                        .value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Decrypted">{t("decrypted-text")}</label>
                <Textarea readOnly={true} id="Decrypted" value={d_encrypted} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </Layout>
  )
}
