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
          <Text style={global.textSecondary}>
            
          </Text>
          <View style={{ gap: 10 }}>
            <SecondaryButton
              onPress={() => console.log("Edit Profile")}
              title="Pengaturan Profil"
              iconName="settings-sharp"
              color={color.primary}
              loading={loading}
            />
            <SecondaryButton
              onPress={() => console.log("Ajuan")}
              title="Ajukan Permasalahan"
              iconName="cloud-upload"
              color={color.primary}
              loading={loading}
            />
            <SecondaryButton
              onPress={() => console.log("Panduan")}
              title="Panduan Aplikasi"
              iconName="document-text"
              color={color.primary}
              loading={loading}
            />
          </View>

          {
            // Jika user adalah admin, tampilkan menu ini
            user?.is_admin === true && (
              <>
                <Text style={global.textSecondary}>Administrator</Text>
                <View style={{ gap: 10 }}>
                  <SecondaryButton
                    onPress={() => console.log("Edit Profile")}
                    title="Rekapitulasi"
                    iconName="podium"
                    color={color.blue}
                    loading={loading}
                  />
                  <SecondaryButton
                    onPress={() => console.log("Ajuan")}
                    title="Kelola Pengurus"
                    iconName="people"
                    color={color.blue}
                    loading={loading}
                  />
                </View>
              </>
            )
          }

          <Text style={global.textSecondary}>Keluar aplikasi</Text>
          <SecondaryButton
            onPress={handleLogout}
            title="Keluar"
            iconName="exit"
            color={color.red}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
