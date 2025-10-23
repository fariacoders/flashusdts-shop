"use client"

import {
  type ThemeProviderProps,
  ThemeProvider,
  useTheme,
} from "next-themes"

export const useColorMode = useTheme

export function ColorModeProvider(props: Omit<ThemeProviderProps, "attribute">) {
  return <ThemeProvider attribute="class" {...props} />
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { resolvedTheme } = useColorMode()
  return resolvedTheme === "light" ? light : dark
}
