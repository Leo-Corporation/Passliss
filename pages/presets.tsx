import { useState } from "react"
import Head from "next/head"
import {
  Delete16Regular,
  List20Regular,
  ListBar20Regular,
} from "@fluentui/react-icons"
import { Close } from "@radix-ui/react-dialog"
import useTranslation from "next-translate/useTranslation"

import { GetPresets, SavePresets } from "@/lib/browser-storage"
import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function PresetsPage() {
  const { t } = useTranslation("common") // default namespace (optional)
  const [hasUpper, setHasUpper] = useState(false)
  const [hasLower, setHasLower] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasChars, setHasChars] = useState(false)
  const [length, setLength] = useState(12)

  const [minLower, setMinLower] = useState(0)
  const [maxLower, setMaxLower] = useState(10)
  const [useLowerRange, setUseLowerRange] = useState(false)

  const [minUpper, setMinUpper] = useState(0)
  const [maxUpper, setMaxUpper] = useState(10)
  const [useUpperRange, setUseUpperRange] = useState(false)

  const [minDigits, setMinDigits] = useState(0)
  const [maxDigits, setMaxDigits] = useState(10)
  const [useDigitsRange, setUseDigitsRange] = useState(false)

  const [minSpecial, setMinSpecial] = useState(0)
  const [maxSpecial, setMaxSpecial] = useState(10)
  const [useSpecialRange, setUseSpecialRange] = useState(false)

  const [presetName, setPresetName] = useState("My preset")

  const [presets, setPresets] = useState(GetPresets())
  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="presets">
        <div className="mb-2 flex items-center space-x-2">
          <List20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("presets")}</p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>{t("create-preset")}</Button>
            </DialogTrigger>
            <DialogContent className="gap-1">
              <DialogHeader>
                <DialogTitle>{t("new-preset")}</DialogTitle>
              </DialogHeader>{" "}
              <div className="flex items-center space-x-2">
                <Label htmlFor="NameTxt">{t("name")}</Label>
                <Input
                  defaultValue={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  value={presetName}
                  className="h-auto px-2 py-1"
                  id="NameTxt"
                />
              </div>
              <div className="space-y-2 rounded-md border border-slate-300 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center space-x-2 ">
                  <Switch
                    id="LowerChk"
                    onCheckedChange={setHasLower}
                    defaultChecked={hasLower}
                  />
                  <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                </div>
                {hasLower ? (
                  <div>
                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox
                        onCheckedChange={() => setUseLowerRange(!useLowerRange)}
                        id="LowerCaseRange"
                      ></Checkbox>
                      <Label htmlFor="LowerCaseRange">{t("use-range")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="">{t("min")}</Label>
                      <Input
                        disabled={!useLowerRange}
                        defaultValue={minLower}
                        onChange={(e) => setMinLower(parseInt(e.target.value))}
                        value={minLower}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                      <Label htmlFor="">{t("max")}</Label>
                      <Input
                        disabled={!useLowerRange}
                        defaultValue={maxLower}
                        onChange={(e) => setMaxLower(parseInt(e.target.value))}
                        value={maxLower}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="rounded-md border border-slate-300 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={setHasUpper}
                    defaultChecked={hasUpper}
                    id="UpperChk"
                  />
                  <Label htmlFor="UpperChk">{t("uppercases")}</Label>
                </div>
                {hasUpper ? (
                  <div>
                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox
                        onCheckedChange={() => setUseUpperRange(!useUpperRange)}
                        id="UpperCaseRange"
                      ></Checkbox>
                      <Label htmlFor="UpperCaseRange">{t("use-range")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="">{t("min")}</Label>
                      <Input
                        disabled={!useUpperRange}
                        defaultValue={minUpper}
                        onChange={(e) => setMinUpper(parseInt(e.target.value))}
                        value={minUpper}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                      <Label htmlFor="">{t("max")}</Label>
                      <Input
                        disabled={!useUpperRange}
                        defaultValue={maxUpper}
                        onChange={(e) => setMaxUpper(parseInt(e.target.value))}
                        value={maxUpper}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="rounded-md border border-slate-300 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={setHasNumber}
                    defaultChecked={hasNumber}
                    id="NbrChk"
                  />
                  <Label htmlFor="NbrChk">{t("nbrs")}</Label>
                </div>
                {hasNumber ? (
                  <div>
                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox
                        onCheckedChange={() =>
                          setUseDigitsRange(!useDigitsRange)
                        }
                        id="DigitsCaseRange"
                      ></Checkbox>
                      <Label htmlFor="DigitsCaseRange">{t("use-range")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="">{t("min")}</Label>
                      <Input
                        disabled={!useDigitsRange}
                        defaultValue={minDigits}
                        onChange={(e) => setMinDigits(parseInt(e.target.value))}
                        value={minDigits}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                      <Label htmlFor="">{t("max")}</Label>
                      <Input
                        disabled={!useDigitsRange}
                        defaultValue={maxDigits}
                        onChange={(e) => setMaxDigits(parseInt(e.target.value))}
                        value={maxDigits}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="rounded-md border border-slate-300 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="SpecialChk"
                    onCheckedChange={setHasChars}
                    defaultChecked={hasChars}
                  />
                  <Label htmlFor="SpecialChk">{t("specialchars")}</Label>
                </div>
                {hasChars ? (
                  <div>
                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox
                        onCheckedChange={() =>
                          setUseSpecialRange(!useSpecialRange)
                        }
                        id="SpecialCaseRange"
                      ></Checkbox>
                      <Label htmlFor="SpecialCaseRange">{t("use-range")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="">{t("min")}</Label>
                      <Input
                        disabled={!useSpecialRange}
                        defaultValue={minSpecial}
                        onChange={(e) =>
                          setMinSpecial(parseInt(e.target.value))
                        }
                        value={minSpecial}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                      <Label htmlFor="">{t("max")}</Label>
                      <Input
                        disabled={!useSpecialRange}
                        defaultValue={maxSpecial}
                        onChange={(e) =>
                          setMaxSpecial(parseInt(e.target.value))
                        }
                        value={maxSpecial}
                        type="number"
                        className="h-auto px-2 py-1"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="LengthTxt">{t("length")}</Label>
                <Input
                  defaultValue={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  value={length}
                  type="number"
                  className="h-auto px-2 py-1"
                  id="LengthTxt"
                />
              </div>
              <DialogFooter>
                <Close>
                  <Button
                    onClick={() => {
                      const newPresets = [
                        ...presets,
                        {
                          name: presetName,
                          lowerCases: {
                            included: hasLower,
                            min: minLower,
                            max: maxLower,
                            useRange: useLowerRange,
                          },
                          upperCases: {
                            included: hasUpper,
                            min: minUpper,
                            max: maxUpper,
                            useRange: useUpperRange,
                          },
                          numbers: {
                            included: hasNumber,
                            min: minDigits,
                            max: maxDigits,
                            useRange: useDigitsRange,
                          },
                          special: {
                            included: hasChars,
                            min: minSpecial,
                            max: maxSpecial,
                            useRange: useSpecialRange,
                          },
                          length: length,
                        },
                      ]
                      setPresets(newPresets)
                      SavePresets(newPresets)
                    }}
                  >
                    {t("create")}
                  </Button>
                </Close>
                <Close>
                  <Button variant="outline">{t("cancel")}</Button>
                </Close>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <ListBar20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("my-presets")}</p>
        </div>
        <div>
          {presets.map((el, i) => (
            <div
              key={i}
              className="my-2 grid grid-cols-[1fr,auto] items-center rounded-md border border-slate-300 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="font-semibold">{el.name}</p>
              <Button
                onClick={() => {
                  presets.splice(i, 1)
                  setPresets([...presets])
                  SavePresets(presets)
                }}
                variant="ghost"
              >
                <Delete16Regular />
              </Button>
            </div>
          ))}
        </div>
      </PageContent>
    </Layout>
  )
}
