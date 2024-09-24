import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { logout } from "../services/authService";
import {
  getRefreshToken,
  removeToken,
  setToken,
} from "../services/tokenService";

const instance = axios.create({
  baseURL: "http://10.0.2.2:3000/api/v1",
});

// Menambahkan interceptor untuk menyisipkan token di setiap request
instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tangani refresh token di sini jika perlu
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cek apakah kita mendapatkan error 401 (Unauthorized)
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.status === "error"
    ) {
      const refreshTokenValue = await getRefreshToken();
      if (!refreshTokenValue) {
        // Tidak ada refresh token, logout atau redirect
        await removeToken();
        return Promise.reject(error);
      }

      try {
        // Mencoba untuk refresh token
        const refreshResponse = await instance.post("/auth/refresh-token", {
          token: refreshTokenValue,
        });

        if (refreshResponse.status === 200) {
          // Simpan token baru
          await setToken(refreshResponse.data.token);
          // Set header Authorization untuk request asli dan coba lagi
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        await removeToken(); // Hapus token jika refresh gagal
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
