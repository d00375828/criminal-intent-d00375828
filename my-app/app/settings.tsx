import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing, stylesFromTheme, THEMES, useTheme } from "../contexts/Theme";

export default function SettingsScreen() {
  const nav = useNavigation();
  const { theme, setThemeName } = useTheme();
  const S = stylesFromTheme(theme);

  useLayoutEffect(() => {
    nav.setOptions({
      title: "Settings",
      headerRight: undefined,
      headerBackVisible: false,
      headerLeft: () => (
        <Pressable
          onPress={() => nav.goBack()}
          hitSlop={8}
          style={{ paddingHorizontal: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.tint} />
        </Pressable>
      ),
    });
  }, [nav, theme.tint]);

  return (
    <SafeAreaView style={[S.screen, { padding: spacing.md }]}>
      <Stack.Screen options={{ headerShown: true }} />

      <Text
        style={[
          S.textHeading,
          {
            marginBottom: spacing.xl,
            textAlign: "center",
            alignSelf: "center",
          },
        ]}
      >
        Themes
      </Text>

      <View style={{ gap: spacing.md }}>
        {Object.entries(THEMES).map(([key, t]) => (
          <Pressable
            key={key}
            style={[
              S.button,
              {
                borderWidth: theme.name === t.name ? 2 : 0,
                borderColor: theme.tint,
              },
            ]}
            onPress={() => setThemeName(key as keyof typeof THEMES)}
          >
            <Text style={S.buttonText}>{t.name}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
