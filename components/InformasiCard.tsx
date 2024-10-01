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
  info: {
    id: string;
    title: string;
    date: string;
    description: string;
  };
  onPress: () => void;
  loading: boolean;
};

export default function InformasiCard({ info, loading, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {loading ? (
        <>
          <View
            style={[
              styles.row,
              { padding: 14, backgroundColor: color.gray, width: "60%", borderRadius: 8 },
            ]}
          />
          <Text
            style={[
              global.text,
              { fontSize: 12, color: color.gray, backgroundColor: color.gray, borderRadius: 8 },
            ]}
          />
          <Text
            style={[
              global.text,
              { color: color.gray, backgroundColor: color.gray, borderRadius: 8 },
            ]}
          />
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Ionicons
              name="information-circle"
              size={24}
              color={color.primary}
            />
            <Text style={styles.title}>{info.title}</Text>
          </View>
          <Text style={[global.text, { fontSize: 12 }]}>
            {new Date(info.date).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text style={[global.text, { color: color.primary }]}>
            {info.description}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.light,
    padding: 16,
    gap: 5,
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
