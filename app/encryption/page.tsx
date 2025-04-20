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
import { toast } from "sonner"

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

  function onSelectChanged(val: string) {
    setAlgo(val)
  }

  const [copied, setCopied] = useState(false)
  const [algo, setAlgo] = useState(settings.encryptAlgo)
  const [hashAlgo, setHashAlgo] = useState(settings.hashAlgo ?? "md5")
  const [keyVis, setKeyVis] = useState(false)

  // Encrypt state
  const [textToEncrypt, setTextToEncrypt] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")
  const [encryptedText, setEncryptedText] = useState("")

  // Decrypt state
  const [textToDecrypt, setTextToDecrypt] = useState("")
  const [decryptionKey, setDecryptionKey] = useState("")
  const [decryptedText, setDecryptedText] = useState("")

  // Hash state
  const [textToHash, setTextToHash] = useState("")
  const [hashedText, setHashedText] = useState("")
  const [showCryptOptions, setShowCryptOptions] = useState(true)

  function encrypt() {
    if (!textToEncrypt || !encryptionKey) {
      toast(t("missing-information"), {
        description: t("missing-information-desc"),
      })
      return
    }
    try {
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
      toast(t("text-encrypted-title"), {
        description: t("text-encrypted-desc"),
      })
    } catch (error) {
      toast(t("text-encrypted-error"), {
        description: t("text-encrypted-error"),
      })
    }
  }

  function decrypt() {
    if (!textToDecrypt || !decryptionKey) {
      toast(t("missing-information"), {
        description: t("missing-information-desc"),
      })
      return
    }
    try {
      // Decrypt the text using the selected algorithm and key
      let decryptedText = ""
      switch (algo) {
        case "aes":
          decryptedText = hex2a(
            CryptoJS.AES.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        case "3des":
          decryptedText = hex2a(
            CryptoJS.TripleDES.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        case "3des":
          decryptedText = hex2a(
            CryptoJS.TripleDES.decrypt(textToDecrypt, decryptionKey).toString()
          )

          break
        case "rabbit":
          decryptedText = hex2a(
            CryptoJS.Rabbit.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        case "rc4":
          decryptedText = hex2a(
            CryptoJS.RC4Drop.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        default:
          break
      }
      setDecryptedText(decryptedText)
      if (decryptedText == "") {
        throw new Error("")
      }
      toast(t("text-decrypted-title"), {
        description: t("text-decrypted-desc"),
      })
    } catch (error) {
      toast(t("text-decrypted-error"))
    }
  }

  function hex2a(hex: string): string {
    let str = ""
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
  }

  function hashClick() {
    if (!textToHash) {
      toast(t("missing-information"), {
        description: t("missing-information-desc"),
      })
      return
    }
    switch (hashAlgo) {
      case "md5":
        setHashedText(CryptoJS.MD5(textToHash).toString())
        break
      case "sha-1":
        setHashedText(CryptoJS.SHA1(textToHash).toString())
        break
      case "sha-256":
        setHashedText(CryptoJS.SHA256(textToHash).toString())
        break
      case "sha-512":
        setHashedText(CryptoJS.SHA512(textToHash).toString())
        break
      case "sha-3":
        setHashedText(CryptoJS.SHA3(textToHash).toString())
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
    toast(t("copied"))
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
                          onClick={() =>
                            setEncryptionKey(
                              generatePasswordByStrength(2, {
                                lowerCases: "abcdefghijklmnopqrstuvwxyz",
                                upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                numbers: "01234567889",
                                special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
                              })
                            )
                          }
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
              <div className="space-y-2">
                <Label htmlFor="hash-algorithm">{t("encryption-algo")}</Label>
                <Select
                  defaultValue={settings.encryptAlgo}
                  onValueChange={onSelectChanged}
                >
                  <SelectTrigger>
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
        <TabsContent
          className="justify-center border-none data-[state=active]:flex"
          value="decrypt"
        >
          <Card className="w-full max-w-250">
            <CardHeader>
              <CardTitle>{t("decrypt")}</CardTitle>
              <CardDescription>{t("decrypt-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="text-to-decrypt">{t("encrypted-text")}</Label>
                <Textarea
                  id="text-to-decrypt"
                  placeholder={t("encrypt-text-placeholder")}
                  value={textToDecrypt}
                  onChange={(e) => setTextToDecrypt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decryption-key">{t("key")}</Label>
                <div className="flex space-x-2">
                  <Input
                    id="decryption-key"
                    type={keyVis ? "text" : "password"}
                    placeholder={t("key-placeholder")}
                    value={decryptionKey}
                    onChange={(e) => setDecryptionKey(e.target.value)}
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
                          onClick={() =>
                            setDecryptionKey(
                              generatePasswordByStrength(2, {
                                lowerCases: "abcdefghijklmnopqrstuvwxyz",
                                upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                numbers: "01234567889",
                                special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
                              })
                            )
                          }
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
              <div className="space-y-2">
                <Label htmlFor="hash-algorithm">{t("decryption-algo")}</Label>
                <Select
                  defaultValue={settings.encryptAlgo}
                  onValueChange={onSelectChanged}
                >
                  <SelectTrigger>
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
              </div>
              {decryptedText && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="decrypted-result">
                    {t("decrypted-text")}
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="decrypted-result"
                      value={decryptedText}
                      readOnly
                      className="min-h-[100px] pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(decryptedText)}
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
              <Button onClick={decrypt} className="w-full">
                {t("decrypt")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          value="hashing"
          className="justify-center border-none data-[state=active]:flex"
        >
          <Card className="w-full max-w-250">
            <CardHeader>
              <CardTitle>{t("hashing")}</CardTitle>
              <CardDescription>{t("hash-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-to-hash">{t("text-hash")}</Label>
                <Textarea
                  id="text-to-hash"
                  placeholder={t("hash-text-placeholder")}
                  value={textToHash}
                  onChange={(e) => setTextToHash(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hash-algorithm">{t("hashing-algo")}</Label>
                <Select
                  onValueChange={(v: string) => setHashAlgo(v)}
                  defaultValue={hashAlgo}
                >
                  <SelectTrigger>
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
              </div>
              {hashedText && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="hashed-result">{t("hashed-text")}</Label>
                  <div className="relative">
                    <Textarea
                      id="hashed-result"
                      value={hashedText}
                      readOnly
                      className="min-h-[100px] pr-10 font-mono text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(hashedText)}
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
              <Button onClick={hashClick} className="w-full">
                {t("hash")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
