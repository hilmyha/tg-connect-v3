import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { color, global } from "../constant";

type HomeHeaderProps = {
  user: {
    username: string;
  } | null; // Mengijinkan user untuk null saat data belum ada
  loading: boolean;
};

// buat sambutan waktu pagi, siang, sore, atau malam
const getGreeting = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 4 && hour < 10) {
    return "Pagi";
  } else if (hour >= 10 && hour < 14) {
    return "Siang";
  } else if (hour >= 14 && hour < 19) {
    return "Sore";
  } else if (hour >= 19 || hour < 4) {
    return "Malam";
  }
};

export default function HomeHeader({ user, loading }: HomeHeaderProps) {
  return (
    <View>
      {loading ? (
        <View style={[{ backgroundColor: color.light, padding: 16, width: "60%", borderRadius: 8 }]} />
      ) : user ? (
        <Text
          style={[
            global.textHeader,
            { color: "#FFFF", fontSize: 32, textTransform: "capitalize" },
          ]}
        >
          {getGreeting()}, {user.username}
        </Text>
      ) : (
        <Text style={[global.textHeader, { color: "#FFFF", fontSize: 32 }]}>
          {getGreeting()}, Pengunjung
        </Text>
      )}
      <Text style={[global.text, { color: "#FFFF" }]}>
        Ada yang bisa kami bantu?
      </Text>
    </View>
  );
}
