import { View, Text } from "react-native";
import React from "react";
import { color, global, tabScreen } from "../constant";
import { Ionicons } from "@expo/vector-icons";

type ProfileHeaderProps = {
  user: {
    username: string;
    email: string;
  };
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <View style={[global.container, tabScreen.profileSection]}>
      <View
        style={{
          padding: 60,
          backgroundColor: color.primary,
          borderRadius: 100,
        }}
      />
      {user ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={global.headerTitle}>{user.username}</Text>
            <Ionicons size={24} name="checkmark-circle" color={color.blue} />
          </View>
          <Text style={[global.text, { textAlign: "center" }]}>
            {user.email}
          </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
