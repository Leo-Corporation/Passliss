export interface Settings {
  passwordLengthOne: number
  passwordLengthTwo: number
  customChars: CustomCharacters
  encryptAlgo: string
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
