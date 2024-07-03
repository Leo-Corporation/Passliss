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

export function GetRandomPrompts(numPrompts: number, lng: string): string[] {
  const prompts =
    lng === "fr"
      ? [
          "Mot de passe sécurisé avec des minuscules",
          "Mot de passe facile à prononcer",
          "Mot de passe fort sur le thème des ordinateurs",
          "Mot de passe difficile à casser",
          "Mot de passe contenant des caractères spéciaux",
          "Mot de passe se terminant par -ber",
          "Mot de passe original mais facile à retenir",
          "Mot de passe sur le thème de Matrix",
          "Mot de passe avec des symboles mais facile à retenir",
          "Facile à retenir lié aux sports",
        ]
      : [
          "Secure password with lowercases",
          "Easy to pronounce password",
          "Strong password about computers",
          "Hard to crack password",
          "Password containing special characters",
          "Password ending with -ber",
          "Original yet easy to remember password",
          "Matrix themed password",
          "Password with symbols but easy to remember",
          "Easy to remember related to sports",
        ]
  const randomPrompts = []
  for (let i = 0; i < numPrompts; i++) {
    const randomIndex = Math.floor(Math.random() * prompts.length)
    randomPrompts.push(prompts[randomIndex])
    prompts.splice(randomIndex, 1)
  }
  return randomPrompts
}
