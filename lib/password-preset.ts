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

export function generatePasswordUsingPreset(preset: PasswordPreset): string {
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
      const availableChars = getAvailableChars(type.name)
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
      const availableChars = getAvailableChars(type.name)
      const length = getRandomLength(0, remainingLength, remainingLength)
      result += addChars(availableChars, length)
      remainingLength -= length
    }
  })

  // Shuffle password characters
  result = shuffle(result)

  return result
}

function getAvailableChars(type: string): string {
  switch (type) {
    case "lowerCases":
      return "abcdefghijklmnopqrstuvwxyz"
    case "upperCases":
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    case "numbers":
      return "0123456789"
    case "special":
      return "!@#$%^&*()-_=+"
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
