export default function StrengthCharacter(props: { char: string }) {
  let c = ""
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
  if (
    props.char.toUpperCase() === props.char &&
    !specialChars.includes(props.char) &&
    !numbers.includes(props.char)
  ) {
    c = "#FF2929"
  }
  // Check if props.char is lower case
  else if (
    props.char.toLowerCase() === props.char &&
    !specialChars.includes(props.char) &&
    !numbers.includes(props.char)
  ) {
    c = "#3B8AFF"
  }
  // Check if props.char is number
  else if (numbers.includes(props.char)) {
    c = "#007F5F"
  }
  // Check if props.char is contained in specialChars
  else if (specialChars.includes(props.char)) {
    c = "#9F2CF9"
  }
  return <span style={{ color: c }}>{props.char}</span>
}
