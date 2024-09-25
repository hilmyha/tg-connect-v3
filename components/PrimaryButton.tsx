import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type ButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  loading: boolean;
};

export default function PrimaryButton({
  onPress,
  children,
  loading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={loading}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#40534C",
    padding: 12,
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
