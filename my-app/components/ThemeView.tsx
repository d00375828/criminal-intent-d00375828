import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { stylesFromTheme, useTheme } from "../contexts/Theme";

type ThemedViewProps = ViewProps & {
  variant?: "screen" | "card" | "none";
  fill?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export function ThemedView({
  variant = "none",
  fill = false,
  style,
  children,
  ...rest
}: ThemedViewProps) {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  const base =
    variant === "screen" ? S.screen : variant === "card" ? S.card : undefined;

  return (
    <View {...rest} style={[base, fill && { flex: 1 }, style]}>
      {children}
    </View>
  );
}
