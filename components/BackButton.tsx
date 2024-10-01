import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { color } from "../constant";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton() {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Ionicons name="chevron-back" size={24} color={color.light} />
      <Text style={{ color: color.light, fontSize: 14 }}>Kembali</Text>
    </TouchableOpacity>
  );
}
