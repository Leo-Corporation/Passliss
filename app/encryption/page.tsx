"use client"

import { useState } from "react"
import {
  Check20Regular,
  Checkmark20Regular,
  Copy20Regular,
  Eye20Regular,
  EyeOff20Regular,
  Key20Regular,
  NumberSymbol20Regular,
  Password20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"
import CryptoJS from "crypto-js"
import { useTranslations } from "next-intl"

import { generatePasswordByStrength } from "@/lib/password"
import { defaultSettings, getSettings, Settings } from "@/lib/settings"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function EncryptionPage() {
  const t = useTranslations() // default namespace (optional)

  let settings: Settings = defaultSettings
  function loadSettings() {
    settings = getSettings()
  }
  loadSettings()

  if (settings.hashAlgo == null || settings.hashAlgo == undefined) {
    settings.hashAlgo = "md5"
  }

  const [algo, setAlgo] = useState(settings.encryptAlgo)

  function SelectChanged(val: string) {
    setAlgo(val)
  }

  const [copied, setCopied] = useState(false)

  // Encrypt state
  const [textToEncrypt, setTextToEncrypt] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")
  const [encryptedText, setEncryptedText] = useState("")

  const [d_text, setD_Text] = useState("")
  const [d_key, setD_Key] = useState("")
  const [h_text, setH_Text] = useState("")
  const [d_encrypted, setD_Encrypted] = useState("")
  const [hashedText, setHashedText] = useState("")
  const [showCryptOptions, setShowCryptOptions] = useState(true)
  const [hashAlgo, setHashAlgo] = useState(settings.hashAlgo)
  const [keyVis, setKeyVis] = useState(false)

  function encrypt() {
    switch (algo) {
      case "aes":
        setEncryptedText(
          CryptoJS.AES.encrypt(textToEncrypt, encryptionKey).toString()
        )
        break
      case "3des":
        setEncryptedText(
          CryptoJS.TripleDES.encrypt(textToEncrypt, encryptionKey).toString()
        )
        break
      case "rabbit":
        setEncryptedText(
          CryptoJS.Rabbit.encrypt(textToEncrypt, encryptionKey).toString()
        )
        break
      case "rc4":
        setEncryptedText(
          CryptoJS.RC4Drop.encrypt(textToEncrypt, encryptionKey).toString()
        )
        break
      default:
        break
    }
  }

  function decrypt() {
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

  function genKey() {
    setEncryptionKey(
      generatePasswordByStrength(2, {
        lowerCases: "abcdefghijklmnopqrstuvwxyz",
        upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "01234567889",
        special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
      })
    )
  }

  function hashClick() {
    switch (hashAlgo) {
      case "md5":
        setHashedText(CryptoJS.MD5(h_text).toString())
        break
      case "sha-1":
        setHashedText(CryptoJS.SHA1(h_text).toString())
        break
      case "sha-256":
        setHashedText(CryptoJS.SHA256(h_text).toString())
        break
      case "sha-512":
        setHashedText(CryptoJS.SHA512(h_text).toString())
        break
      case "sha-3":
        setHashedText(CryptoJS.SHA3(h_text).toString())
        break
      default:
        break
    }
  }

  // Copy to clipboard function
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main>
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
            <Password20Regular />
            <p className="font-semibold">{t("encrypt")}</p>
          </TabsTrigger>
          <TabsTrigger value="decrypt">
            <Translate20Regular />
            <p className="font-semibold">{t("decrypt")}</p>
          </TabsTrigger>
          <TabsTrigger value="hashing">
            <NumberSymbol20Regular />
            <p className="font-semibold">{t("hashing")}</p>
          </TabsTrigger>
          <Select
            defaultValue={settings.encryptAlgo}
            onValueChange={SelectChanged}
          >
            <SelectTrigger
              className={
                !showCryptOptions
                  ? "hidden"
                  : "text-foreground mx-1 h-auto px-2 py-1"
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
            onValueChange={(v: string) => setHashAlgo(v)}
            defaultValue={hashAlgo}
          >
            <SelectTrigger
              className={
                showCryptOptions
                  ? "hidden"
                  : "text-foreground mx-1 h-auto px-2 py-1"
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
          <Card className="w-full max-w-250">
            <CardHeader>
              <CardTitle> {t("encrypt")}</CardTitle>
              <CardDescription>{t("encrypt-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="text-to-encrypt">{t("text-to-encrypt")}</Label>
                <Textarea
                  id="text-to-encrypt"
                  placeholder={t("encrypt-text-placeholder")}
                  value={textToEncrypt}
                  onChange={(e) => setTextToEncrypt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="encryption-key">{t("key")}</Label>
                <div className="flex space-x-2">
                  <Input
                    id="encryption-key"
                    type={keyVis ? "text" : "password"}
                    placeholder={t("key-placeholder")}
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                  />
                  <Button
                    className="h-auto px-2 py-1"
                    variant="outline"
                    onClick={() => setKeyVis(!keyVis)}
                  >
                    {keyVis ? <EyeOff20Regular /> : <Eye20Regular />}
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto px-2 py-1"
                          id="GenKeyBtn"
                          onClick={genKey}
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
              </div>
              {encryptedText && (
                <div className="space-y-2">
                  <Label htmlFor="encrypted-result">
                    {t("encrypted-text")}
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="encrypted-result"
                      value={encryptedText}
                      readOnly
                      className="min-h-[100px] pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(encryptedText)}
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-4 w-4" />
                      ) : (
                        <Copy20Regular className="h-4 w-4" />
                      )}
                      <span className="sr-only">{t("copy-to-clipboard")}</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={encrypt} className="w-full">
                {t("encrypt")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="border-none" value="decrypt">
          <div className="w-full space-y-2">
            <div className="flex items-center space-x-3">
              <label htmlFor="DecryptKeyInput">{t("key")}</label>
              <Input
                type={keyVis ? "text" : "password"}
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
                variant="outline"
                onClick={() => setKeyVis(!keyVis)}
              >
                {keyVis ? <EyeOff20Regular /> : <Eye20Regular />}
              </Button>
              <Button
                className="h-auto px-2 py-1"
                id="DecryptBtn"
                onClick={decrypt}
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
    </main>
  )
}
