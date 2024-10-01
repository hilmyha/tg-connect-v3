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
        headerTintColor: color.secondary,
        statusBarColor: color.secondary,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: color.secondary,
        },
        headerStyle: {
          backgroundColor: color.secondary,
        },
        statusBarStyle: "light",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="chevron-back" size={24} color={color.light} />
            <Text style={{ color: color.light, fontSize: 14 }}>Kembali</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}
