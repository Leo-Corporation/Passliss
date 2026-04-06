export default function StrengthCharacter(props: Readonly<{ char: string }>) {
  let c = ""
  const specialChars = new Set([
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
  ])
  const numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  if (
    props.char.toUpperCase() === props.char &&
    !specialChars.has(props.char) &&
    !numbers.has(props.char)
  ) {
    c = "#FF2929"
  }
  // Check if props.char is lower case
  else if (
    props.char.toLowerCase() === props.char &&
    !specialChars.has(props.char) &&
    !numbers.has(props.char)
  ) {
    c = "#3B8AFF"
  }
  // Check if props.char is number
  else if (numbers.has(props.char)) {
    c = "#007F5F"
  }
  // Check if props.char is contained in specialChars
  else if (specialChars.has(props.char)) {
    c = "#9F2CF9"
  }
  return <span style={{ color: c }}>{props.char}</span>
}
