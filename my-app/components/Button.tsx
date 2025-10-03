import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { stylesFromTheme, useTheme } from "../contexts/Theme";

export function Button({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <Pressable style={[S.button, style]} onPress={onPress}>
      <Text style={S.buttonText}>{title}</Text>
    </Pressable>
  );
}
