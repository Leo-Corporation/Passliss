import { StrengthInfo } from "@/types/strength-info"
import { PasswordStrength } from "./password-gen"
import { containsLowerCases, containsUpperCases } from "./string"

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

export function GetPasswordStrength(password: string): PasswordStrength {
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
