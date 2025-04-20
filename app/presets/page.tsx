"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Add16Regular,
  List20Regular,
  ListBar20Regular,
} from "@fluentui/react-icons"
import { Close } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"

import { getPresets, savePresets } from "@/lib/browser-storage"
import { PasswordPreset } from "@/lib/password"
import PresetItem from "@/components/preset-item"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function PresetsPage() {
  const t = useTranslations()
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

  const [presets, setPresets] = useState(getPresets())

  function importPresets(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return // check if files are selected
    if (event.target.files.length === 0) return // check if no files are selected
    let file = event.target.files[0] // get the selected file
    let reader = new FileReader() // create a FileReader object
    reader.onload = function (event) {
      let text: string = event.target?.result as string // get the file content as text
      let json: PasswordPreset[] = JSON.parse(text) // parse the text as JSON

      let merge = [...presets, ...json]
      setPresets(merge)
      savePresets(merge)
    }
    reader.readAsText(file) // read the file as text
  }
  return (
    <main>
      <div className="mb-2 flex items-center space-x-2">
        <List20Regular primaryFill="#0088FF" className="text-white" />
        <p className="ml-2 font-bold">{t("presets")}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Dialog>
          <DialogTrigger className="hidden sm:block">
            <Button className="my-2 h-auto space-x-2 px-2 py-1 font-bold">
              <Add16Regular />
              <span>{t("create-preset")}</span>
            </Button>
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
              <div className="flex items-center space-x-2">
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
                      onCheckedChange={() => setUseDigitsRange(!useDigitsRange)}
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
                      onChange={(e) => setMinSpecial(parseInt(e.target.value))}
                      value={minSpecial}
                      type="number"
                      className="h-auto px-2 py-1"
                    />
                    <Label htmlFor="">{t("max")}</Label>
                    <Input
                      disabled={!useSpecialRange}
                      defaultValue={maxSpecial}
                      onChange={(e) => setMaxSpecial(parseInt(e.target.value))}
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
                  disabled={!hasChars && !hasLower && !hasUpper && !hasNumber}
                  onClick={() => {
                    if (!hasChars && !hasLower && !hasUpper && !hasNumber)
                      return
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
                    savePresets(newPresets)
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
        <Drawer>
          <DrawerTrigger className="block sm:hidden">
            {" "}
            <Button className="my-2 h-auto space-x-2 px-2 py-1 font-bold">
              <Add16Regular />
              <span>{t("create-preset")}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="space-y-2 px-2">
            <DrawerHeader>
              <DrawerTitle>{t("new-preset")}</DrawerTitle>
            </DrawerHeader>
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
              <div className="flex items-center space-x-2">
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
                      onCheckedChange={() => setUseDigitsRange(!useDigitsRange)}
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
                      onChange={(e) => setMinSpecial(parseInt(e.target.value))}
                      value={minSpecial}
                      type="number"
                      className="h-auto px-2 py-1"
                    />
                    <Label htmlFor="">{t("max")}</Label>
                    <Input
                      disabled={!useSpecialRange}
                      defaultValue={maxSpecial}
                      onChange={(e) => setMaxSpecial(parseInt(e.target.value))}
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
            <DrawerFooter>
              <div className="flex items-center justify-center space-x-2">
                <DrawerClose>
                  <Button
                    disabled={!hasChars && !hasLower && !hasUpper && !hasNumber}
                    onClick={() => {
                      if (!hasChars && !hasLower && !hasUpper && !hasNumber)
                        return
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
                      savePresets(newPresets)
                    }}
                  >
                    {t("create")}
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button variant="outline">{t("cancel")}</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {presets.length > 0 && (
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "nav",
              className: "text-center",
            })}
            href={
              "data:text/plain;charset=UTF-8," +
              encodeURIComponent(
                typeof window !== "undefined"
                  ? (localStorage.getItem("passliss-presets") ?? "[]")
                  : "{msg: 'an error occurred'}"
              )
            }
            download={"passliss-presets.json"}
          >
            {t("export")}
          </Link>
        )}
        <Button
          variant="outline"
          size="nav"
          onClick={() =>
            (
              document.getElementById("FileSelector") as HTMLInputElement
            ).click()
          }
        >
          {t("import")}
        </Button>
        <Input
          type="file"
          id="FileSelector"
          accept="application/json"
          className="hidden"
          onChange={importPresets}
        ></Input>
      </div>
      <div className="mb-2 flex items-center space-x-2">
        <ListBar20Regular primaryFill="#0088FF" className="text-white" />
        <p className="ml-2 font-bold">{t("my-presets")}</p>
      </div>
      <div className="flex flex-wrap">
        {presets && presets.length === 0 && (
          <div className="mt-10 flex w-full flex-col items-center justify-center text-center">
            <p className="icon text-7xl">{"\uFD81"}</p>
            <h4 className="text-xl font-bold">{t("no-activity")}</h4>
            <p>{t("no-presets-desc")}</p>
          </div>
        )}
        {presets.map((el: PasswordPreset, i: number) => (
          <PresetItem
            id={i}
            preset={el}
            delete={() => {
              presets.splice(i, 1)
              setPresets([...presets])
              savePresets(presets)
            }}
            edit={(preset: PasswordPreset) => {
              let p = presets
              p[i] = preset
              setPresets([...p])
              savePresets(p)
            }}
          />
        ))}
      </div>
    </main>
  )
}
