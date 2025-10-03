import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TextStyle, ViewStyle } from "react-native";

type Theme = {
  name: string;
  bg: string;
  text: string;
  card: string;
  tint: string;
  buttonBg: string;
  inputBg: string;
};

export const THEMES: Record<string, Theme> = {
  lBlue: {
    name: "Blue",
    bg: "#F5FEFF",
    text: "#0A1F24",
    card: "#FFFFFF",
    tint: "#00A8E8",
    buttonBg: "#E6F9FD",
    inputBg: "#F0FAFC",
  },
  lTan: {
    name: "Tan",
    bg: "#FFFDF7",
    text: "#1C1A12",
    card: "#FFFFFF",
    tint: "#D4A017",
    buttonBg: "#FFF4D6",
    inputBg: "#FFF8E8",
  },
  lPurple: {
    name: "Purple",
    bg: "#FBF8FF",
    text: "#1B1226",
    card: "#FFFFFF",
    tint: "#8E7CC3",
    buttonBg: "#F1EBFF",
    inputBg: "#F8F3FF",
  },
  dTeal: {
    name: "Teal",
    bg: "#0A1E21",
    text: "#E2F7F9",
    card: "#132D31",
    tint: "#2BD9D9",
    buttonBg: "#0F2529",
    inputBg: "#18373D",
  },
  dBurgundy: {
    name: "Burgundy",
    bg: "#1A0D10",
    text: "#F8E8EC",
    card: "#2A1418",
    tint: "#E94F73",
    buttonBg: "#2A1B20",
    inputBg: "#3A2228",
  },
  dMystery: {
    name: "Mystery",
    bg: "#121820",
    text: "#E0E6ED",
    card: "#1B232D",
    tint: "#5DA9E9",
    buttonBg: "#1A2430",
    inputBg: "#212C38",
  },
};

type ThemeCtx = {
  theme: Theme;
  setThemeName: (name: keyof typeof THEMES) => void;
};
const ThemeContext = createContext<ThemeCtx | null>(null);

const THEME_KEY = "theme_name_v1";
const DEFAULT_NAME: keyof typeof THEMES = "lBlue";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<keyof typeof THEMES>(DEFAULT_NAME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored && THEMES[stored]) setName(stored as keyof typeof THEMES);
      setReady(true);
    })();
  }, []);

  const setThemeName = async (n: keyof typeof THEMES) => {
    setName(n);
    await AsyncStorage.setItem(THEME_KEY, n);
  };

  const value = useMemo(() => ({ theme: THEMES[name], setThemeName }), [name]);

  if (!ready) return null;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export const stylesFromTheme = (t: Theme) => ({
  screen: { flex: 1, backgroundColor: t.bg } as ViewStyle,
  card: {
    backgroundColor: t.card,
    borderRadius: 12,
    padding: spacing.md,
  } as ViewStyle,

  textHeading: {
    color: t.text,
    fontSize: 20,
    fontWeight: "700",
  } as TextStyle,
  textSubheading: {
    color: t.text,
    fontSize: 16,
    fontWeight: "600",
  } as TextStyle,
  textBody: {
    color: t.text,
    fontSize: 15,
  } as TextStyle,
  textMuted: {
    color: t.text + "99",
    fontSize: 14,
  } as TextStyle,

  input: {
    backgroundColor: t.inputBg,
    color: t.text,
    padding: spacing.sm,
    borderRadius: 8,
  } as TextStyle,

  button: {
    backgroundColor: t.buttonBg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  } as ViewStyle,
  buttonText: {
    color: t.text,
    fontWeight: "600",
    fontSize: 16,
  } as TextStyle,
});
