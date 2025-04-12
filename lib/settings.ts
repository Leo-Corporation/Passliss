export interface Settings {
  passwordLengthOne: number
  passwordLengthTwo: number
  customChars: CustomCharacters
  encryptAlgo: string
  hashAlgo?: string
  hidePassword?: boolean
  defaultPasswordConfig?: DefaultPasswordConfig
  openaiKey?: string
}

export interface CustomCharacters {
  lowerCases: string
  upperCases: string
  numbers: string
  special: string
}

export interface DefaultPasswordConfig {
  lowerCases: boolean
  upperCases: boolean
  numbers: boolean
  special: boolean
}

export function getSettings(): Settings {
  const defaultSettings = {
    passwordLengthOne: 12,
    passwordLengthTwo: 19,
    encryptAlgo: "aes",
    customChars: {
      lowerCases: "abcdefghijklmnopqrstuvwxyz",
      upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "01234567889",
      special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
    },
    hidePassword: false,
    openaiKey: "",
  }
  if (typeof window !== "undefined") {
    const settings = localStorage.getItem("settings")
    if (settings) {
      return JSON.parse(settings) || defaultSettings
    } else {
      localStorage.setItem("settings", JSON.stringify(defaultSettings))
      return defaultSettings
    }
  }
  return defaultSettings
}

export function setSettings(settings: Settings) {
  if (typeof window !== "undefined") {
    localStorage.setItem("settings", JSON.stringify(settings))
  }
}
