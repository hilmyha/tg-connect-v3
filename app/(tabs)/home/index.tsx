import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getRefreshToken, getToken } from "../../../services/tokenService";

export default function index() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error: any) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  const checkToken = async () => {
    const token = await getToken();
    const refreshToken = await getRefreshToken();
    console.log("Token: ", token, "Refresh Token: ", refreshToken);
  };

  return (
    <View>
      <Text>index</Text>

      <TouchableOpacity onPress={handleLogout} disabled={loading}>
        <Text>{loading ? "Loading..." : "Logout"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={checkToken}>
        <Text>Check tokentod</Text>
      </TouchableOpacity>
    </View>
  );
}
