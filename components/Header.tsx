import { View, Text } from "react-native";
import React from "react";
import { color, global } from "../constant";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View
      style={{
        backgroundColor: color.primary,
        paddingBottom: 24,
        paddingHorizontal: 24,
        borderBottomRightRadius: 32,
      }}
    >
      <Text style={[global.textHeader, { color: color.light }]}>{title}</Text>
      <Text style={{ color: color.light }}>{subtitle}</Text>
    </View>
  );
}
