import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getRefreshToken, getToken } from "../../../services/tokenService";
import { router } from "expo-router";
import InputText from "../../../components/InputText";
import PrimaryButton from "../../../components/PrimaryButton";
import { auth, global } from "../../../constant";

export default function index() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    if (!username || !password) {
      setError("Username dan password harus diisi.");
      setLoading(false);
      return;
    }
    try {
      await login(username, password);
    } catch (error: any) {
      console.error("Login failed di UI", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={auth.container}>
          <View style={[global.container, auth.section]}>
            <Text style={global.headerTitle}>Selamat datang kembali!</Text>
            <InputText
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <InputText
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              type="password"
            />

            {error ? <Text style={auth.textError}>{error}</Text> : null}

            <PrimaryButton onPress={handleLogin} loading={loading}>
              <Text style={auth.text}>{loading ? "Loading..." : "Masuk"}</Text>
            </PrimaryButton>

            <View style={auth.row}>
              <Text>Belum punya akun? </Text>
              <TouchableOpacity onPress={() => router.push("(auth)/register")}>
                <Text style={{ color: "#40534C" }}>Registrasi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
