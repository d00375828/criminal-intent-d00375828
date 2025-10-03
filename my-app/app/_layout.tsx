import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider, useTheme } from "../contexts/Theme";

function LayoutInner() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme.name.startsWith("d") ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTitleStyle: { color: theme.text },
          headerTintColor: theme.tint,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}
