export default function PromptItem(props: { prompt: string }) {
  function SetText() {
    ;(document.getElementById("prompt-txt") as HTMLInputElement).value =
      props.prompt
  }
  return (
    <p
      onClick={SetText}
      className="my-2 mr-4 ml-0 cursor-pointer rounded-lg border border-blue-600 bg-white px-2 py-1 text-sm text-blue-600 shadow-xs transition-all hover:translate-y-[-4px] dark:bg-blue-950 dark:text-white"
    >
      {props.prompt}
    </p>
  )
}
