import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getUserById } from "../../../services/userService";
import { global } from "../../../constant";
import HomeHeader from "../../../components/HomeHeader";
import CategoryNavigation from "../../../components/CategoryNavigation";
import { Ionicons } from "@expo/vector-icons";
import { getInformasi } from "../../../services/informasiService";
import InformasiCard from "../../../components/InformasiCard";
import { router, useFocusEffect } from "expo-router";

export default function index() {
  const { setAuthenticated, userId } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [informasi, setInformasi] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (!userId) {
      return;
    }

    try {
      setLoading(true);
      // Mengambil data user dan informasi secara paralel
      const [userResponse, informasiResponse] = await Promise.all([
        getUserById(userId),
        getInformasi(),
      ]);

      setUser(userResponse.data);
      setInformasi(informasiResponse.data);
    } catch (error: any) {
      console.error("Failed to get user", error);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData(); // Memanggil fungsi refresh saat tab difokuskan
    }, [userId])
  );

  const onRefresh = async () => {
    // Cek apakah userId valid (tidak null)
    if (!userId) {
      setRefreshing(false);
      return;
    }

    setRefreshing(true);
    try {
      // Panggil ulang data saat refresh
      const [userResponse, informasiResponse] = await Promise.all([
        getUserById(userId), // Pastikan userId adalah string
        getInformasi(),
      ]);

      setUser(userResponse.data);
      setInformasi(informasiResponse.data);
    } catch (error: any) {
      console.error("Failed to refresh data", error);
    } finally {
      setRefreshing(false); // Hentikan loading setelah refresh selesai
    }
  };

  return (
    <SafeAreaView style={[global.background, { flex: 1 }]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[global.container, { marginTop: 24 }]}>
          <HomeHeader user={user} loading={loading} />

          <CategoryNavigation />

          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF" }}>
            Informasi terbaru
          </Text>

          <View style={{ gap: 16 }}>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <InformasiCard
                    key={index}
                    loading={true} // Tetapkan loading true untuk skeleton
                    info={{ id: "", title: "", date: "", description: "" }} // Placeholder data kosong untuk skeleton
                    onPress={() => {}}
                  />
                ))
              : informasi
                  ?.sort(
                    (a: any, b: any) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                  ) // Sort dari yang terbaru
                  .slice(0, 3) // Ambil 3 data pertama
                  .map((info: any, index: number) => (
                    <InformasiCard
                      key={info.id}
                      info={info}
                      loading={loading}
                      onPress={() =>
                        router.push({
                          pathname: "(pages)/informasi/detail",
                          params: { id: info.id },
                        })
                      }
                    />
                  ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
