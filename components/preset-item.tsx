import { useState } from "react"
import {
  Add16Regular,
  Check20Regular,
  Checkmark16Regular,
  Delete16Regular,
  Edit16Regular,
  Info16Regular,
} from "@fluentui/react-icons"
import { Close } from "@radix-ui/react-dialog"
import useTranslation from "next-translate/useTranslation"

import { GetPresets, SavePresets } from "@/lib/browser-storage"
import { PasswordPreset } from "@/lib/password-preset"
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

export interface PresetItemProps {
  delete: Function
  id: number
  preset: PasswordPreset
  edit: Function
}

export default function PresetItem(props: PresetItemProps) {
  const { t } = useTranslation("common") // default namespace (optional)
  const [hasUpper, setHasUpper] = useState(props.preset.upperCases.included)
  const [hasLower, setHasLower] = useState(props.preset.lowerCases.included)
  const [hasNumber, setHasNumber] = useState(props.preset.numbers.included)
  const [hasChars, setHasChars] = useState(props.preset.special.included)
  const [length, setLength] = useState(props.preset.length)

  const [minLower, setMinLower] = useState(props.preset.lowerCases.min)
  const [maxLower, setMaxLower] = useState(props.preset.lowerCases.max)
  const [useLowerRange, setUseLowerRange] = useState(
    props.preset.lowerCases.useRange
  )

  const [minUpper, setMinUpper] = useState(props.preset.upperCases.min)
  const [maxUpper, setMaxUpper] = useState(props.preset.upperCases.max)
  const [useUpperRange, setUseUpperRange] = useState(
    props.preset.upperCases.useRange
  )

  const [minDigits, setMinDigits] = useState(props.preset.numbers.min)
  const [maxDigits, setMaxDigits] = useState(props.preset.numbers.max)
  const [useDigitsRange, setUseDigitsRange] = useState(
    props.preset.numbers.useRange
  )

  const [minSpecial, setMinSpecial] = useState(props.preset.special.min)
  const [maxSpecial, setMaxSpecial] = useState(props.preset.special.max)
  const [useSpecialRange, setUseSpecialRange] = useState(
    props.preset.special.useRange
  )

  const [presetName, setPresetName] = useState(props.preset.name)
  return (
    <div
      key={props.id}
      className="m-2 grid w-full grid-cols-[1fr,auto] grid-rows-[auto,1fr] items-center rounded-md border border-accent bg-accent/10 px-4 py-2 hover:bg-accent-trans dark:bg-accent/10 sm:w-[300px]"
    >
      <p className="font-bold">{props.preset.name}</p>

      <div className="flex">
        <div>
          <Dialog>
            <DialogTrigger className="hidden sm:block">
              <Button variant="ghost" className="h-6 space-x-2 p-1 font-bold">
                <Edit16Regular />
              </Button>
            </DialogTrigger>
            <DialogContent className="gap-1">
              <DialogHeader>
                <DialogTitle>{t("edit-preset")}</DialogTitle>
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
                    disabled={!hasChars && !hasLower && !hasUpper && !hasNumber}
                    onClick={() => {
                      if (!hasChars && !hasLower && !hasUpper && !hasNumber)
                        return
                      props.edit({
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
                      })
                    }}
                  >
                    {t("edit")}
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
              <Button variant="ghost" className="h-6 space-x-2 p-1 font-bold">
                <Edit16Regular />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="space-y-2 px-2">
              <DrawerHeader>
                <DrawerTitle>{t("edit-preset")}</DrawerTitle>
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
              <DrawerFooter>
                <div className="flex items-center justify-center space-x-2">
                  <DrawerClose>
                    <Button
                      onClick={() => {
                        if (!hasChars && !hasLower && !hasUpper && !hasNumber)
                          return
                        props.edit({
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
                        })
                      }}
                      disabled={
                        !hasChars && !hasLower && !hasUpper && !hasNumber
                      }
                    >
                      {t("edit")}
                    </Button>
                  </DrawerClose>
                  <DrawerClose>
                    <Button variant="outline">{t("cancel")}</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <Button
          className="h-6 p-1"
          onClick={() => {
            props.delete()
          }}
          variant="ghost"
        >
          <Delete16Regular />
        </Button>
      </div>
      <div className="text-sm">
        <p className="flex items-center space-x-2  font-bold">
          <Info16Regular />
          <span>{t("info")}</span>
        </p>
        {hasUpper && (
          <p className=" space-x-2 text-[#FF2929]">
            <Checkmark16Regular />
            <span>
              {t("uppercases")} {useUpperRange && `(${minUpper}-${maxUpper})`}
            </span>
          </p>
        )}
        {hasLower && (
          <p className="space-x-2 text-[#3B8AFF]">
            <Checkmark16Regular />
            <span>
              {t("lowercases")} {useLowerRange && `(${minLower}-${maxLower})`}
            </span>
          </p>
        )}
        {hasNumber && (
          <p className="space-x-2 text-[#007F5F]">
            <Checkmark16Regular />
            <span>
              {t("nbrs")} {useDigitsRange && `(${minDigits}-${maxDigits})`}
            </span>
          </p>
        )}
        {hasChars && (
          <p className="space-x-2 text-[#9F2CF9]">
            <Checkmark16Regular />
            <span>
              {t("specialchars")}{" "}
              {useSpecialRange && `(${minSpecial}-${maxSpecial})`}
            </span>
          </p>
        )}
        <p className="space-x-2">
          <Checkmark16Regular />
          <span>
            {t("length")}: {length}
          </span>
        </p>
      </div>
    </div>
  )
}
