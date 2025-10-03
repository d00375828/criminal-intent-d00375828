import ExpoCheckbox from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";
import { spacing, stylesFromTheme, useTheme } from "../contexts/Theme";

export function SolvedToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ExpoCheckbox
        value={value}
        onValueChange={onChange}
        color={value ? theme.tint : undefined}
      />
      <Text style={[S.textSubheading, { marginLeft: spacing.xs }]}>Solved</Text>
    </View>
  );
}
