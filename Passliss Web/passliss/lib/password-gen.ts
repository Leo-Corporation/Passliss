import { CustomCharacters } from "@/types/settings"

export enum PasswordStrength {
  Low,
  Medium,
  Good,
  VeryGood,
  Unknown,
}

export function GeneratePassword(
  lower: boolean,
  upper: boolean,
  numbers: boolean,
  special: boolean,
  length: number,
  chars: CustomCharacters
): string {
  const lowerCaseLetters = chars.lowerCases
  const upperCaseLetters = chars.upperCases
  const nbrs = chars.numbers
  const specialChars = chars.special

  let final = ""
  if (lower) final += lowerCaseLetters
  if (upper) final += upperCaseLetters
  if (numbers) final += nbrs
  if (special) final += specialChars

  let finalPassword = ""
  for (let i = 0; i < length; i++) {
    finalPassword += final[Math.floor(Math.random() * final.length)]
  }
  return finalPassword
}

export function GeneratePasswordByStrength(
  strength: PasswordStrength,
  chars: CustomCharacters
): string {
  switch (strength) {
    case PasswordStrength.Low:
      return GeneratePassword(true, true, false, false, 9, chars)
    case PasswordStrength.Medium:
      return GeneratePassword(true, true, true, false, 12, chars)
    case PasswordStrength.Good:
      return GeneratePassword(true, true, true, false, 19, chars)
    case PasswordStrength.VeryGood:
      return GeneratePassword(true, true, true, true, 20, chars)
    default:
      return GeneratePassword(true, true, false, false, 9, chars)
  }
}
