export interface Settings {
  passwordLengthOne: number
  passwordLengthTwo: number
  customChars: CustomCharacters
  encryptAlgo: string
  hidePassword?: boolean
}

export interface CustomCharacters {
  lowerCases: string
  upperCases: string
  numbers: string
  special: string
}
