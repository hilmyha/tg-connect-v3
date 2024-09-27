import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { color, global } from "../constant";
import { Ionicons } from "@expo/vector-icons";

type ButtonProps = {
  onPress: () => void;
  info: {
    title: string;
    date: string;
    description: string;
  };
  loading: boolean;
};

export default function InformasiCard({ info, loading }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={color.primary} />
      ) : (
        <View>
          <View style={styles.row}>
            <Ionicons
              name="information-circle"
              size={24}
              color={color.primary}
            />
            <Text style={styles.title}>{info.title}</Text>
          </View>
          <Text style={[global.text, { fontSize: 12 }]}>{info.date}</Text>
          <Text style={[global.text, { color: color.primary }]}>
            {info.description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.light,
    padding: 16,
    gap: 8,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: color.primary,
  },
  text: {
    color: color.primary,
  },
});
