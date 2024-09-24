import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getUserById } from "../../../services/userService";

export default function index() {
  const { setAuthenticated, userId } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : user ? (
        <View>
          <Text>Selamat pagi {user.username}</Text>
        </View>
      ) : (
        <Text>User not found</Text>
      )}
    </View>
  );
}
