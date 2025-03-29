import { Info16Regular } from "@fluentui/react-icons"

export default function StrengthSuggestion(props: { content }) {
  return (
    <div className="flex items-center space-x-1">
      <Info16Regular />
      <p>{props.content}</p>
    </div>
  )
}
