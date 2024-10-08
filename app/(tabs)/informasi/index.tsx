import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { global } from "../../../constant";
import Header from "../../../components/Header";
import { getInformasi } from "../../../services/informasiService";
import InformasiCard from "../../../components/InformasiCard";
import { router, useFocusEffect } from "expo-router";

export default function index() {
  const [informasi, setInformasi] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      // Mengambil data informasi
      const informasiResponse = await getInformasi();
      setInformasi(informasiResponse.data);
    } catch (error: any) {
      console.error("Failed to get informasi", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await getData();
    } catch (error: any) {
      console.error("Failed to refresh informasi", error);
    } finally {
      setRefreshing(false);
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
        <Header title="Informasi" subtitle="Berita kegiatan sekitar" />
        <View style={global.container}>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <InformasiCard
                  key={index}
                  loading={true} // Tetapkan loading true untuk skeleton
                  info={{ id: "", title: "", date: "", description: "" }} // Placeholder data kosong untuk skeleton
                  onPress={() => {}}
                />
              ))
            : informasi?.map((info: any, index: number) => (
                <InformasiCard
                  key={index}
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
      </ScrollView>
    </SafeAreaView>
  );
}
