import { CustomCharacters } from "./settings"

export enum PasswordStrength {
  VeryWeak,
  Weak,
  Moderate,
  Strong,
  VeryStrong,
  None,
}

export interface PasswordAnalysis {
  lowercase: number
  uppercase: number
  numbers: number
  special: number
  length: number
  score: number
}

export function generatePassword(
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

export function generatePasswordByStrength(
  strength: PasswordStrength,
  chars: CustomCharacters
): string {
  switch (strength) {
    case PasswordStrength.VeryWeak:
      return generatePassword(true, true, false, false, 6, chars)
    case PasswordStrength.Weak:
      return generatePassword(true, true, true, false, 9, chars)
    case PasswordStrength.Moderate:
      return generatePassword(true, true, true, false, 11, chars)
    case PasswordStrength.Strong:
      return generatePassword(true, true, true, true, 16, chars)
    case PasswordStrength.VeryStrong:
      return generatePassword(true, true, true, true, 20, chars)
    default:
      return generatePassword(true, true, false, false, 9, chars)
  }
}

export function getRandomPrompts(numPrompts: number, lng: string): string[] {
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

export function generatePasswordUsingPreset(
  preset: PasswordPreset,
  customChars: CustomCharacters
): string {
  let result = ""
  let remainingLength = preset.length

  const characterTypes = [
    { name: "lowerCases", settings: preset.lowerCases },
    { name: "upperCases", settings: preset.upperCases },
    { name: "numbers", settings: preset.numbers },
    { name: "special", settings: preset.special },
  ]

  const prioritizedTypes = characterTypes.filter(
    (type) => type.settings.useRange
  )
  const nonPrioritizedTypes = characterTypes.filter(
    (type) => !type.settings.useRange
  )

  prioritizedTypes.forEach((type) => {
    if (type.settings.included) {
      const availableChars = getAvailableChars(type.name, customChars)
      const length = getRandomLength(
        type.settings.min,
        type.settings.max,
        remainingLength
      )
      result += addChars(availableChars, length)
      remainingLength -= length
    }
  })

  nonPrioritizedTypes.forEach((type) => {
    if (type.settings.included) {
      const availableChars = getAvailableChars(type.name, customChars)
      const length = getRandomLength(0, remainingLength, remainingLength)
      result += addChars(availableChars, length)
      remainingLength -= length
    }
  })

  // Shuffle password characters
  result = shuffle(result)

  return result
}

function getAvailableChars(type: string, chars: CustomCharacters): string {
  switch (type) {
    case "lowerCases":
      return chars.lowerCases
    case "upperCases":
      return chars.upperCases
    case "numbers":
      return chars.numbers
    case "special":
      return chars.special
    default:
      return ""
  }
}

function addChars(charSet: string, length: number): string {
  let password = ""

  const getRandomChar = (charSet: string) => {
    const index = Math.floor(Math.random() * charSet.length)
    return charSet.charAt(index)
  }

  for (let i = 0; i < length; i++) {
    password += getRandomChar(charSet)
  }

  return password
}

function getRandomLength(min: number, max: number, remaining: number): number {
  min = Math.min(min, remaining)
  max = Math.min(max, remaining)
  return min + Math.floor(Math.random() * (max - min + 1))
}

function shuffle(str: string): string {
  const arr = str.split("")
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join("")
}

export function getPasswordScore(pwd: string): number {
  // Count character types
  const lowercase = (pwd.match(/[a-z]/g) || []).length
  const uppercase = (pwd.match(/[A-Z]/g) || []).length
  const numbers = (pwd.match(/[0-9]/g) || []).length
  const special = (pwd.match(/[^a-zA-Z0-9]/g) || []).length
  const length = pwd.length

  // Calculate score (simple algorithm)
  let score = 0
  if (length > 0) {
    // Base score from length (up to 40 points)
    score += Math.min(length * 4, 40)

    // Points for character variety
    if (lowercase > 0) score += 5
    if (uppercase > 0) score += 10
    if (numbers > 0) score += 10
    if (special > 0) score += 15

    // Bonus for mixed character types
    const typesUsed = [
      lowercase > 0,
      uppercase > 0,
      numbers > 0,
      special > 0,
    ].filter(Boolean).length
    score += (typesUsed - 1) * 10
  }

  // Cap at 100
  score = Math.min(score, 100)
  return score
}

export function getPasswordStrength(pwd: string): PasswordStrength {
  const score = getPasswordScore(pwd)
  if (score === 0) return PasswordStrength.None
  if (score < 30) return PasswordStrength.VeryWeak
  if (score < 50) return PasswordStrength.Weak
  if (score < 70) return PasswordStrength.Moderate
  if (score < 90) return PasswordStrength.Strong
  return PasswordStrength.VeryStrong
}
export function getStrengthInfo(pwd: string): PasswordAnalysis {
  const lowercase = (pwd.match(/[a-z]/g) || []).length
  const uppercase = (pwd.match(/[A-Z]/g) || []).length
  const numbers = (pwd.match(/[0-9]/g) || []).length
  const special = (pwd.match(/[^a-zA-Z0-9]/g) || []).length

  return {
    lowercase: lowercase,
    uppercase: uppercase,
    numbers: numbers,
    special: special,
    length: pwd.length,
    score: getPasswordScore(pwd),
  }
}
