import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: "#fff",
        headerTransparent: true,
        headerShadowVisible: false,
        statusBarColor: "#677D6A",
        statusBarStyle: "light",
      }}
    />
  );
}
