import { PasswordPreset } from "@/lib/password"
import { useLocalStorage } from "./use-localStorage"

export function usePresets() {
  const [presets, setPresets] = useLocalStorage<PasswordPreset[]>(
    "passliss-presets",
    []
  )

  return {
    presets,
    setPresets,
  }
}
