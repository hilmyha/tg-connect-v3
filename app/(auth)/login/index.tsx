import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function index() {
  const { setUser } = useAuth();

  const handleLogin = () => {
    setUser({ name: "Haidar" });
  };

  return (
    <View
      style={{
        // make sure to add this style to center the button
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
