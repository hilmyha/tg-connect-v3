import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
