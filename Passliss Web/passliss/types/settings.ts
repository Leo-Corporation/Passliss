export interface Settings {
  passwordLengthOne: number
  passwordLengthTwo: number
  customChars: CustomCharacters
  encryptAlgo: string
}

export interface CustomCharacters {
  lowerCases: string
  upperCases: string
  numbers: string
  special: string
}
