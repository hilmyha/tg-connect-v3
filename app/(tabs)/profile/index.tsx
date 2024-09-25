import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ScrollViewBase,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getRefreshToken, getToken } from "../../../services/tokenService";
import { getUser, getUserById } from "../../../services/userService";
import { router, useLocalSearchParams } from "expo-router";
import { color, global, tabScreen } from "../../../constant";
import { Ionicons } from "@expo/vector-icons";
import ProfileHeader from "../../../components/ProfileHeader";
import SecondaryButton from "../../../components/SecondaryButton";

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
      // make alert to confirm logout
      Alert.alert("Logout", "Apakah anda yakin ingin keluar?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await logout();
          },
        },
      ]);
    } catch (error: any) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[global.background, { flex: 1 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ProfileHeader user={user} />
        <View style={global.container}>
          {user ? (
            <View>
              <Text>Profile</Text>
              <Text>Username: {user.username}</Text>
              <Text>Email: {user.email}</Text>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}

          <Text style={global.textSecondary}>Administrator</Text>

          <SecondaryButton
            onPress={handleLogout}
            title="Logout"
            iconName="exit"
            color={color.red}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
