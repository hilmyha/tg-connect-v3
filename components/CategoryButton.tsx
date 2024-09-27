import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type ButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  loading: boolean;
};

export default function CategoryButton({
  onPress,
  children,
  loading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: "30%",
      }}
      onPress={onPress}
      disabled={loading}
    >
      <>{children}</>
    </TouchableOpacity>
  );
}
