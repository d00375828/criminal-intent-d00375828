import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { spacing, stylesFromTheme, useTheme } from "../contexts/Theme";

export function DateModal({
  visible,
  value,
  onChange,
  onClose,
}: {
  visible: boolean;
  value: Date;
  onChange: (d: Date) => void;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000080",
          justifyContent: "center",
          padding: spacing.lg,
        }}
      >
        <View
          style={[
            {
              padding: spacing.md,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#00000010",
            },
            { backgroundColor: theme.card },
          ]}
        >
          <Text style={S.textHeading}>Pick Date</Text>
          <DateTimePicker
            value={value}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            themeVariant={theme.name.startsWith("d") ? "dark" : "light"}
            {...(Platform.OS === "ios"
              ? {
                  textColor: theme.name.startsWith("D") ? "#d3d3d3" : "#000000",
                }
              : {})}
            onChange={(_, d) => d && onChange(d)}
          />

          <View style={{ alignItems: "flex-end", marginTop: spacing.sm }}>
            <Pressable onPress={onClose}>
              <Text style={[S.textSubheading, { color: theme.tint }]}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
