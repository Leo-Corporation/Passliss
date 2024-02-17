import { useState } from "react"
import Head from "next/head"
import {
  Key20Regular,
  NumberSymbol20Regular,
  Password20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"
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

  if (settings.hashAlgo == null || settings.hashAlgo == undefined) {
    settings.hashAlgo = "md5"
  }

  const [algo, setAlgo] = useState(settings.encryptAlgo)

  function SelectChanged(val) {
    setAlgo(val)
  }

  const [text, setText] = useState("")
  const [key, setKey] = useState("")
  const [encrypted, setEncrypted] = useState("")
  const [d_text, setD_Text] = useState("")
  const [d_key, setD_Key] = useState("")
  const [h_text, setH_Text] = useState("")
  const [d_encrypted, setD_Encrypted] = useState("")
  const [hashedText, setHashedText] = useState("")
  const [showCryptOptions, setShowCryptOptions] = useState(true)
  const [hashAlgo, setHashAlgo] = useState(settings.hashAlgo)

  function Encrypt() {
    switch (algo) {
      case "aes":
        setEncrypted(CryptoJS.AES.encrypt(text, key))
        break
      case "3des":
        setEncrypted(CryptoJS.TripleDES.encrypt(text, key))
        break
      case "rabbit":
        setEncrypted(CryptoJS.Rabbit.encrypt(text, key))
        break
      case "rc4":
        setEncrypted(CryptoJS.RC4Drop.encrypt(text, key))
        break
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
        break
      case "rabbit":
        setD_Encrypted(hex2a(CryptoJS.Rabbit.decrypt(d_text, d_key).toString()))
        break
      case "rc4":
        setD_Encrypted(
          hex2a(CryptoJS.RC4Drop.decrypt(d_text, d_key).toString())
        )
        break
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

  function hashClick() {
    switch (hashAlgo) {
      case "md5":
        setHashedText(CryptoJS.MD5(h_text))
        break
      case "sha-1":
        setHashedText(CryptoJS.SHA1(h_text))
        break
      case "sha-256":
        setHashedText(CryptoJS.SHA256(h_text))
        break
      case "sha-512":
        setHashedText(CryptoJS.SHA512(h_text))
        break
      case "sha-3":
        setHashedText(CryptoJS.SHA3(h_text))
        break
      default:
        break
    }
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
        <Tabs
          onValueChange={(v) => setShowCryptOptions(v != "hashing")}
          defaultValue="encrypt"
        >
          <TabsList>
            <TabsTrigger value="encrypt">
              <span className="grid grid-cols-[1fr,auto] gap-2">
                <Password20Regular />
                <span>{t("encrypt")}</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="decrypt">
              <span className="grid grid-cols-[1fr,auto] gap-2">
                <Translate20Regular />
                <span>{t("decrypt")}</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="hashing">
              <span className="grid grid-cols-[1fr,auto] gap-2">
                <NumberSymbol20Regular />
                <span>{t("hashing")}</span>
              </span>
            </TabsTrigger>
            <Select
              defaultValue={settings.encryptAlgo}
              onValueChange={SelectChanged}
            >
              <SelectTrigger
                className={
                  !showCryptOptions ? "hidden" : "mx-1 h-auto px-2 py-1"
                }
              >
                <SelectValue placeholder={t("algorithm")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultChecked={true} value="aes">
                  AES
                </SelectItem>
                <SelectItem value="3des">3DES</SelectItem>
                <SelectItem value="rabbit">Rabbit</SelectItem>
                <SelectItem value="rc4">RC4Drop</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(v) => setHashAlgo(v)}
              defaultValue={hashAlgo}
            >
              <SelectTrigger
                className={
                  showCryptOptions ? "hidden" : "mx-1 h-auto px-2 py-1"
                }
              >
                <SelectValue placeholder={t("hashing-algo")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultChecked={true} value="md5">
                  MD5
                </SelectItem>
                <SelectItem value="sha-1">SHA-1</SelectItem>
                <SelectItem value="sha-256">SHA-256</SelectItem>
                <SelectItem value="sha-512">SHA-512</SelectItem>
                <SelectItem value="sha-3">SHA-3</SelectItem>
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
          <TabsContent value="hashing" className="border-none">
            <div className="w-full space-y-2">
              <div className="space-y-2">
                <label htmlFor="ToHash">{t("text-hash")}</label>
                <div className="flex items-center">
                  <Textarea
                    id="ToHash"
                    defaultValue={d_text}
                    onChange={() =>
                      setH_Text(
                        (document.getElementById("ToHash") as HTMLInputElement)
                          .value
                      )
                    }
                  />
                  <Button
                    className="ml-4 h-auto px-2 py-1"
                    id="HashBtn"
                    onClick={hashClick}
                  >
                    {t("hash")}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="Hashed">{t("hashed-text")}</label>
                <Textarea readOnly={true} id="Hashed" value={hashedText} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </Layout>
  )
}
