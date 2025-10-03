import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable } from "react-native";
import { spacing, useTheme } from "../contexts/Theme";

export function PhotoPickerButton({
  onPicked,
  width = 72,
}: {
  onPicked: (uri: string) => void;
  width?: number;
}) {
  const { theme } = useTheme();

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as any,
      quality: 0.7,
      selectionLimit: 1,
    });
    if (!res.canceled && res.assets?.[0]?.uri) onPicked(res.assets[0].uri);
  };

  return (
    <Pressable
      onPress={pick}
      accessibilityLabel="Pick Photo"
      style={{
        backgroundColor: theme.buttonBg,
        paddingVertical: spacing.sm,
        width,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Ionicons name="camera-outline" size={18} color={theme.text} />
    </Pressable>
  );
}
