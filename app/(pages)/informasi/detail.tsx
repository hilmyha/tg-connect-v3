import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { color, global, tabUndangan } from "../../../constant";
import { getInformasiById } from "../../../services/informasiService";
import { useLocalSearchParams } from "expo-router";
import Undangan from "../../../components/Undangan";
import { getUserById } from "../../../services/userService";
import PrimaryButton from "../../../components/PrimaryButton";
import { useAuth } from "../../../contexts/AuthProvider"; // Import useAuth
import { Ionicons } from "@expo/vector-icons";

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [informasi, setInformasi] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // Mengambil data informasi
        const response = await getInformasiById(id);
        setInformasi(response.data);

        // Mengambil data user
        if (response.data.user_id) {
          const userResponse = await getUserById(response.data.user_id);
          setUser(userResponse.data);
        }
      } catch (error: any) {
        console.error("Failed to get informasi", error);
      } finally {
        setLoading(false); // Pastikan loading state diset di sini
      }
    };

    getData();
  }, []);

  const isCurrentUser = userId === informasi?.user_id;

  return (
    <SafeAreaView style={[global.background, { flex: 1 }]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }} // Flex grow untuk memastikan ScrollView bisa expand
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={[
            global.container,
            {
              paddingHorizontal: 0,
              paddingBottom: 0,
              paddingTop: 24,
              flex: 1, // Tambahkan flex: 1 di sini untuk memastikan View mengisi sisa layar
            },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 24, color: color.light, fontWeight: "bold" }}
            >
              {informasi?.title}
            </Text>
            <Text style={[global.text, { fontSize: 12, color: color.light }]}>
              {
                // Format tanggal
                new Date(informasi?.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }
            </Text>
          </View>

          {/* Konten utama */}
          <View
            style={{
              flex: 1, // Pastikan flex: 1 untuk mengisi sisa layar
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
              backgroundColor: color.light,
              gap: 24,
              padding: 24,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "113%",
                alignItems: "center",
                top: 0,
                left: 0,
              }}
            >
              <View
                style={{
                  backgroundColor: "#D1D1D1",
                  width: 200,
                  height: 6,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                flex: 1, // Ini juga flex: 1 untuk mengisi konten di dalamnya
                padding: 16,
                gap: 8,
                borderRadius: 12,
                backgroundColor: color.white,
              }}
            >
              {loading ? (
                <View
                  style={{
                    minHeight: 360,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} color={color.light} />
                </View>
              ) : (
                <Undangan informasi={informasi} />
              )}
            </View>

            {isCurrentUser && (
              <View style={{ gap: 8 }}>
                <PrimaryButton
                  onPress={() => console.log("Pressed")}
                  loading={loading}
                >
                  <Ionicons name="create" size={20} color="#fff" />
                  <Text style={{ color: "#fff" }}>
                    {loading ? "Loading..." : "Edit"}
                  </Text>
                </PrimaryButton>
                <PrimaryButton
                  onPress={() => console.log("Pressed")}
                  loading={loading}
                >
                  <Ionicons name="trash" size={20} color="#fff" />
                  <Text style={{ color: "#fff" }}>
                    {loading ? "Loading..." : "Hapus"}
                  </Text>
                </PrimaryButton>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
