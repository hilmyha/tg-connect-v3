import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type SecondaryButtonProps = {
  onPress: () => void;
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  color?: string;
  loading: boolean;
};

export default function SecondaryButton({
  onPress,
  title,
  iconName,
  color,
  loading,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.sparation}>
        <Ionicons name={iconName} size={20} color="white" />
        <Text style={{ color: "white", fontSize: 15 }}>
          {loading ? "Loading..." : title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#40534C",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sparation: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
