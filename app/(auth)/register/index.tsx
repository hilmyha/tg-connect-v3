import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getRefreshToken, getToken } from "../../../services/tokenService";
import { router } from "expo-router";
import InputText from "../../../components/InputText";
import PrimaryButton from "../../../components/PrimaryButton";
import { auth, global } from "../../../constant";

export default function index() {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    if (!email || !username || !password || !confirmPassword) {
      setError("Semua kolom harus diisi.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      setLoading(false);
      return;
    }
    try {
      const response = await register(email, username, password);
      console.log("Register success", response);
    } catch (error: any) {
      console.error("Register failed di UI", error.message); // Log error ke konsol
      setError(error.message); // Set error message dari API
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={auth.container}>
          <View style={[global.container, auth.section]}>
            <Text style={global.headerTitle}>Daftarkan diri anda</Text>
            <InputText
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              type="email-address"
            />
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
            <InputText
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              type="password"
            />

            {error ? <Text style={auth.textError}>{error}</Text> : null}

            <PrimaryButton onPress={handleRegister} loading={loading}>
              <Text style={auth.text}>{loading ? "Loading..." : "Daftar"}</Text>
            </PrimaryButton>

            <View style={auth.row}>
              <Text>Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => router.push("(auth)/login")}>
                <Text style={{ color: "#40534C" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
