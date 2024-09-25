import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: "#fff",
        headerTransparent: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#677D6A",
        },
        statusBarColor: "#677D6A",
        statusBarStyle: "light",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={{ color: "white", fontSize: 14 }}>Kembali</Text>
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
