export default function PromptItem(props: { prompt: string }) {
  function SetText() {
    ;(document.getElementById("prompt-txt") as HTMLInputElement).value =
      props.prompt
  }
  return (
    <p
      onClick={SetText}
      className="my-2 ml-0 mr-4 cursor-pointer rounded-lg border border-blue-600 bg-blue-400 px-2 py-1 text-sm shadow-sm transition-all hover:translate-y-[-4px] dark:bg-blue-950"
    >
      {props.prompt}
    </p>
  )
}
