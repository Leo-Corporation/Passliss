export interface PasswordPreset {
  name: string
  lowerCases: PasswordCharacterSettings
  upperCases: PasswordCharacterSettings
  numbers: PasswordCharacterSettings
  special: PasswordCharacterSettings
  length: number
}
export interface PasswordCharacterSettings {
  included: boolean
  useRange: boolean
  min: number
  max: number
}
