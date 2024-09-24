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
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "#677D6A",
          }}
        >
          <View
            style={{
              backgroundColor: "#E4E4E4",
              gap: 16,
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: 200,
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
            }}
          >
            <Text
              style={{
                color: "#40534C",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Daftarkan diri anda
            </Text>
            <TextInput
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                height: 52,
                padding: 12,
              }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                height: 52,
                padding: 12,
              }}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                height: 52,
                padding: 12,
              }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                height: 52,
                padding: 12,
              }}
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {error ? (
              <Text style={{ color: "red", marginVertical: -8 }}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={{
                backgroundColor: "#40534C",
                padding: 12,
                borderRadius: 12,
                height: 52,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={{ color: "#fff" }}>
                {loading ? "Loading..." : "Login"}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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
