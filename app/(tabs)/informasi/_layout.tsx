import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { color } from "../../../constant";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: color.primary,
        statusBarColor: color.primary,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: color.primary,
        },
        headerStyle: {
          backgroundColor: color.primary,
        },
        statusBarStyle: "dark",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="chevron-back" size={24} color={color.light} />
            <Text style={{ color: color.light, fontSize: 14 }}>
              Kembali
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
