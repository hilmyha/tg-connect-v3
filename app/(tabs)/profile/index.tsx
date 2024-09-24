import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getRefreshToken, getToken } from "../../../services/tokenService";
import { getUser, getUserById } from "../../../services/userService";
import { useLocalSearchParams } from "expo-router";

export default function index() {
  const { logout, setAuthenticated, userId } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mengambil data user berdasarkan userId yang didapat dari AuthProvider
  useEffect(() => {
    const getUserData = async () => {
      if (!userId) {
        return;
      }

      try {
        setLoading(true);
        const response = await getUserById(userId);
        console.log("User Profile: ", response.data);
        setUser(response.data);
      } catch (error: any) {
        console.error("Failed to get user", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [userId, setAuthenticated]);

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

  return (
    <View>
      {user ? (
        <View>
          <Text>Profile</Text>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity onPress={handleLogout} disabled={loading}>
        <Text>{loading ? "Loading..." : "Logout"}</Text>
      </TouchableOpacity>
    </View>
  );
}
