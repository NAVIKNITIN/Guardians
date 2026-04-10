/**
 * Brand color tokens — single source of truth for hex values.
 * Mirror these in `app/globals.css` `@theme` for Tailwind utilities.
 */
export const colors = {
  primary: "#0a0a0a",
  secondary: "#525252",
  accent: "#a67c52",
  accentHover: "#8f6a45",
  textPrimary: "#0a0a0a",
  textSecondary: "#737373",
  textMuted: "#a3a3a3",
  textInverse: "#fafafa",
  background: "#ffffff",
  backgroundMuted: "#fafafa",
  backgroundSubtle: "#f5f5f4",
  border: "#e5e5e5",
  borderStrong: "#d4d4d4",
  bar: "#8e8383",
  footer: "#3d3838",
  footerDark: "#2a2626",
  overlay: "rgba(10, 10, 10, 0.45)",
} as const;

export type ColorToken = keyof typeof colors;
