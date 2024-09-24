import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getRefreshToken, getToken } from "../../../services/tokenService";

export default function index() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Mulai loading
    try {
      await login(username, password);
    } catch (error: any) {
      Alert.alert("Login Error", error.message); // Menampilkan alert jika login gagal
    } finally {
      setLoading(false); // Menghentikan loading
    }
  };

  const checkToken = async () => {
    const token = await getToken();
    const refreshToken = await getRefreshToken();
    console.log("Token: ", token, "Refresh Token: ", refreshToken);
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} disabled={loading}>
        <Text>{loading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={checkToken}>
        <Text>Check tokentod</Text>
      </TouchableOpacity>
    </View>
  );
}
