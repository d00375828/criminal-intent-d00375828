import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { spacing, stylesFromTheme, useTheme } from "../contexts/Theme";
import { Crime } from "../lib/storage";

export function CrimeItem({
  crime,
  onPress,
}: {
  crime: Crime;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          padding: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.tint,
          flexDirection: "row",
          alignItems: "center",
        },
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={S.textHeading} numberOfLines={1}>
          {crime.title || "(Untitled Crime)"}
        </Text>
        <Text style={S.textSubheading}>
          {new Date(crime.dateISO).toDateString()}
        </Text>
      </View>
      {crime.solved && (
        <MaterialCommunityIcons name="handcuffs" size={22} color={theme.tint} />
      )}
    </Pressable>
  );
}
