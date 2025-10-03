// Crime Details

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateModal } from "../../components/DateModal";
import { PhotoPickerButton } from "../../components/PhotoPicker";
import { SolvedToggle } from "../../components/Solved";
import { ThemedTextInput } from "../../components/ThemeText";
import { spacing, stylesFromTheme, useTheme } from "../../contexts/Theme";
import { Crime, getCrime, upsertCrime } from "../../lib/storage";

export default function CrimeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nav = useNavigation();
  const router = useRouter();
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  const [dateOpen, setDateOpen] = useState(false);

  useLayoutEffect(() => {
    nav.setOptions({
      title: "Crime Detail",
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
      headerRight: () => (
        <Pressable
          onPress={() => router.push("/settings")}
          style={{ marginRight: 8 }}
        >
          <Ionicons name="settings-outline" size={24} color={theme.tint} />
        </Pressable>
      ),
    });
  }, [nav, router, theme.tint]);

  useEffect(() => {
    getCrime(id).then((c) => {
      if (!c) return;
      setTitle(c.title);
      setDetails(c.details);
      setDate(new Date(c.dateISO));
      setSolved(c.solved);
      setPhotoUri(c.photoUri);
    });
  }, [id]);

  const onSave = async () => {
    const payload: Crime = {
      id,
      title: title.trim(),
      details: details.trim(),
      dateISO: date.toISOString(),
      solved,
      photoUri,
    };
    await upsertCrime(payload);
    Alert.alert("Saved", "This crime was uploaded successfully.");
  };

  return (
    <SafeAreaView style={[S.screen, { padding: spacing.md }]}>
      <View
        style={{
          flexDirection: "row",
          gap: spacing.md,
          alignItems: "flex-start",
        }}
      >
        <View style={{ width: 72, alignItems: "center" }}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{ width: 72, height: 72, borderRadius: 8 }}
            />
          ) : (
            <View
              style={[
                S.card,
                {
                  width: 72,
                  height: 72,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            />
          )}
          <View style={{ height: spacing.sm }} />
          <PhotoPickerButton onPicked={setPhotoUri} width={72} />
        </View>

        <View style={{ flex: 1, gap: spacing.sm }}>
          <Text style={S.textSubheading}>Title</Text>
          <ThemedTextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>
      </View>

      <View style={{ height: spacing.md }} />

      <Text style={S.textSubheading}>Details</Text>
      <ThemedTextInput
        value={details}
        onChangeText={setDetails}
        placeholder="What happened?"
        multiline
        style={{ minHeight: 90, textAlignVertical: "top" }}
      />

      <View style={{ height: spacing.md }} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={[S.button, { flex: 1, marginRight: spacing.sm }]}
          onPress={() => setDateOpen(true)}
        >
          <Text style={S.buttonText}>{date.toDateString()}</Text>
        </Pressable>

        <SolvedToggle value={solved} onChange={setSolved} />
      </View>

      <View style={{ height: spacing.lg }} />

      <Pressable style={S.button} onPress={onSave}>
        <Text style={S.buttonText}>Save</Text>
      </Pressable>

      <DateModal
        visible={dateOpen}
        value={date}
        onChange={setDate}
        onClose={() => setDateOpen(false)}
      />
    </SafeAreaView>
  );
}
