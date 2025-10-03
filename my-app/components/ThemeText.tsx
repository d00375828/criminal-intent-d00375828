import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { stylesFromTheme, useTheme } from "../contexts/Theme";

export function ThemedTextInput(props: TextInputProps) {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);
  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.text + "88"}
      style={[S.input, props.style]}
    />
  );
}
