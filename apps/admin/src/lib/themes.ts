/**
 * Theme Presets
 * 
 * 10 preset màu với gradient variants cho admin theme picker
 */

export type ThemePreset = {
  id: string
  name: string
  primaryHsl: string // HSL format: "hsl(210, 100%, 50%)"
  ringHsl: string
  brandGradient: string // CSS gradient string
}

export const themePresets: ThemePreset[] = [
  {
    id: "ocean",
    name: "Ocean",
    primaryHsl: "210 100% 50%",
    ringHsl: "210 100% 50%",
    brandGradient: "linear-gradient(135deg, hsl(210, 100%, 50%) 0%, hsl(210, 80%, 60%) 100%)",
  },
  {
    id: "forest",
    name: "Forest",
    primaryHsl: "142 76% 36%",
    ringHsl: "142 76% 36%",
    brandGradient: "linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(142, 70%, 45%) 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    primaryHsl: "25 95% 53%",
    ringHsl: "25 95% 53%",
    brandGradient: "linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(15, 90%, 60%) 100%)",
  },
  {
    id: "purple",
    name: "Purple",
    primaryHsl: "262 83% 58%",
    ringHsl: "262 83% 58%",
    brandGradient: "linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(262, 75%, 65%) 100%)",
  },
  {
    id: "pink",
    name: "Pink",
    primaryHsl: "330 81% 60%",
    ringHsl: "330 81% 60%",
    brandGradient: "linear-gradient(135deg, hsl(330, 81%, 60%) 0%, hsl(330, 75%, 68%) 100%)",
  },
  {
    id: "amber",
    name: "Amber",
    primaryHsl: "43 96% 56%",
    ringHsl: "43 96% 56%",
    brandGradient: "linear-gradient(135deg, hsl(43, 96%, 56%) 0%, hsl(38, 92%, 63%) 100%)",
  },
  {
    id: "emerald",
    name: "Emerald",
    primaryHsl: "160 84% 39%",
    ringHsl: "160 84% 39%",
    brandGradient: "linear-gradient(135deg, hsl(160, 84%, 39%) 0%, hsl(160, 78%, 48%) 100%)",
  },
  {
    id: "rose",
    name: "Rose",
    primaryHsl: "0 72% 51%",
    ringHsl: "0 72% 51%",
    brandGradient: "linear-gradient(135deg, hsl(0, 72%, 51%) 0%, hsl(0, 65%, 58%) 100%)",
  },
  {
    id: "indigo",
    name: "Indigo",
    primaryHsl: "239 84% 67%",
    ringHsl: "239 84% 67%",
    brandGradient: "linear-gradient(135deg, hsl(239, 84%, 67%) 0%, hsl(239, 78%, 74%) 100%)",
  },
  {
    id: "teal",
    name: "Teal",
    primaryHsl: "173 80% 40%",
    ringHsl: "173 80% 40%",
    brandGradient: "linear-gradient(135deg, hsl(173, 80%, 40%) 0%, hsl(173, 74%, 48%) 100%)",
  },
]

export const defaultTheme = themePresets[0] // Ocean

export function getThemePreset(id: string): ThemePreset | undefined {
  return themePresets.find((preset) => preset.id === id)
}
