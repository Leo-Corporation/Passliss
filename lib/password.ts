import { CustomCharacters } from "./settings"
import { containsLowerCases, containsUpperCases } from "./string"

export enum PasswordStrength {
  Low,
  Medium,
  Good,
  VeryGood,
  Unknown,
}

export interface StrengthInfo {
  lowercases: number
  uppercases: number
  specialchars: number
  numbers: number
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
    case PasswordStrength.Low:
      return generatePassword(true, true, false, false, 9, chars)
    case PasswordStrength.Medium:
      return generatePassword(true, true, true, false, 12, chars)
    case PasswordStrength.Good:
      return generatePassword(true, true, true, false, 19, chars)
    case PasswordStrength.VeryGood:
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

let Numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
let SpecialCaracters: string[] = [
  ";",
  ":",
  "!",
  "/",
  "§",
  "ù",
  "*",
  "$",
  "%",
  "µ",
  "£",
  ")",
  "=",
  "+",
  "*",
  "-",
  "&",
  "é",
  "'",
  "(",
  "-",
  "è",
  "_",
  "ç",
  "<",
  ">",
  "?",
  "^",
  "¨",
]
let ForbidenCaracters: string[] = [
  "123",
  "456",
  "789",
  "password",
  "mdp",
  "pswr",
  "000",
  "admin",
  "111",
  "222",
  "333",
  "444",
  "555",
  "666",
  "777",
  "888",
  "999",
  "123456789",
]

export function getPasswordStrength(password: string): PasswordStrength {
  let length = password.length // Length
  let pswrScore = 0 // Score

  if (length == 0) {
    return PasswordStrength.Unknown
  }

  if (length >= 0 && length <= 5) {
    // If the length of the password is between 0 & 5
    pswrScore += 1 // Add 1
  } else if (length >= 6 && length <= 10) {
    // If the length of the password is between 6 & 10
    pswrScore += 2 // Add 2
  } else if (length >= 11 && length <= 15) {
    // If the length of the password is between 11 & 15
    pswrScore += 5 // Add 5
  } else if (length > 15) {
    pswrScore += 10 // Add 10
  }

  for (let i = 0; i < Numbers.length; i++) {
    for (let j = 0; j < length; j++) {
      pswrScore += password[j].toString().includes(Numbers[i]) ? 1 : 0
    }
  }

  for (let i = 0; i < SpecialCaracters.length; i++) {
    for (let j = 0; j < length; j++) {
      pswrScore += password[j].toString().includes(SpecialCaracters[i]) ? 4 : 0
    }
  }

  for (let i = 0; i < ForbidenCaracters.length; i++) {
    pswrScore -= password.includes(ForbidenCaracters[i]) ? 10 : 0
  }

  if (containsLowerCases(password) && containsUpperCases(password)) {
    pswrScore += 2 // Add2
  } else {
    pswrScore -= 5 // Sub 5
  }
  let regex = /(.)\1{3,}/

  if (regex.test(password)) {
    pswrScore -= 5 // Sub 5
  }

  if (pswrScore < 3) {
    return PasswordStrength.Low // Return low password strength
  } else if (pswrScore >= 3 && pswrScore <= 7) {
    return PasswordStrength.Medium // Return medium password strength
  } else if (pswrScore >= 8 && pswrScore <= 12) {
    return PasswordStrength.Good // Return good password strength
  } else if (pswrScore >= 13) {
    return PasswordStrength.VeryGood // Return excellent password strength
  } else {
    return PasswordStrength.Good // Return good password strength
  }
}
export function getStrengthInfo(password: string): StrengthInfo {
  let uC = 0
  let lC = 0
  let n = 0
  let sC = 0

  let specialChars = [
    ";",
    ":",
    "!",
    "/",
    "§",
    "ù",
    "*",
    "$",
    "%",
    "µ",
    "£",
    ")",
    "=",
    "+",
    "*",
    "-",
    "&",
    "é",
    "'",
    "(",
    "-",
    "è",
    "_",
    "ç",
    "<",
    ">",
    "?",
    "^",
    "¨",
  ]
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  for (let i = 0; i < password.length; i++) {
    // Check if char is upper case
    if (
      password[i].toUpperCase() === password[i] &&
      !specialChars.includes(password[i]) &&
      !numbers.includes(password[i])
    ) {
      uC++
    }
    // Check if char is lower case
    else if (
      password[i].toLowerCase() === password[i] &&
      !specialChars.includes(password[i]) &&
      !numbers.includes(password[i])
    ) {
      lC++
    }
    // Check if char is number
    else if (numbers.includes(password[i])) {
      n++
    }
    // Check if char is contained in specialChars
    else if (specialChars.includes(password[i])) {
      sC++
    }
  }

  return {
    lowercases: lC,
    uppercases: uC,
    numbers: n,
    specialchars: sC,
  }
}
