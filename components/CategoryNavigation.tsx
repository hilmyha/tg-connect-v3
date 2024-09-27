import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { color, global } from "../constant";
import CategoryButton from "./CategoryButton";
import { Ionicons } from "@expo/vector-icons";

// data navigasi kategori
const categories = [
  {
    iconame: "people",
    title: "Warga",
    link: "(pages)/warga",
  },
  {
    iconame: "shield-checkmark",
    title: "Pengurus",
    link: "(pages)/informasipengurus",
  },
  {
    iconame: "megaphone",
    title: "Panic Button",
    link: "(pages)/panic/create",
  },
  {
    iconame: "cloud-upload",
    title: "Dokumen Warga",
    link: "(pages)/panic/create",
  },
  {
    iconame: "time",
    title: "History",
    link: "(pages)/panic/create",
  },
  {
    iconame: "car",
    title: "Cek Nopol",
    link: "(pages)/panic/create",
  },
];

export default function CategoryNavigation() {
  return (
    <View style={global.navButtonContainer}>
      {
        // looping data kategori
        categories.map((category, index) => (
          <CategoryButton
            key={index}
            onPress={() => console.log(category.link)}
            loading={false}
          >
            <View style={styles.container}>
              <Ionicons
                name={category.iconame as keyof typeof Ionicons.glyphMap}
                size={24}
                color={color.gray}
              />
            </View>
            <Text style={styles.text}>{category.title}</Text>
          </CategoryButton>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 12,
    marginBottom: 6,
  },
  text: {
    color: "#FFFFFF",
  },
});
