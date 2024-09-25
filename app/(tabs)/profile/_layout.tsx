import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { color, global } from "../../../constant";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: color.secondary,
        statusBarColor: "#E4E4E4",
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: color.primary,
        },
        headerStyle: {
          backgroundColor: "#E4E4E4",
        },
        statusBarStyle: "dark",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="chevron-back" size={24} color={color.secondary} />
            <Text style={{ color: color.secondary, fontSize: 14 }}>
              Kembali
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Akunku",
        }}
      />
    </Stack>
  );
}
