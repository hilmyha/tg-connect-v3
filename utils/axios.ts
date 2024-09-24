import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  setToken,
} from "../services/tokenService";
import { router } from "expo-router";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Buat tipe kustom untuk JWT Payload yang mencakup userId
interface CustomJwtPayload extends JwtPayload {
  id?: string; // Sesuaikan dengan struktur token Anda
}

const instance = axios.create({
  baseURL: "http://10.0.2.2:3000/api/v1",
  headers: {
    "Content-Type": "application/json", // change according header type accordingly
  },
});

// Menambahkan interceptor untuk menyisipkan token di setiap request
instance.interceptors.request.use(
  async (config) => {
    console.log("Request Interceptor Called");
    const token = await getToken();
    console.log("Using Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      // Jika token adalah JWT, ambil userId dari token
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        console.log("Decoded Token:", decodedToken);

        // Menambahkan userId ke config.headers
        config.headers.userId = decodedToken?.id;
        console.log("User ID:", decodedToken?.id);

        // Menambahkan userId ke config.data
        config.data = {
          ...config.data,
          userId: decodedToken?.id,
        };
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response
instance.interceptors.response.use(
  (response) => {
    console.log("Interceptor response:", response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();
      console.log("Trying to refresh token with:", refreshToken); // Log refresh token

      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://10.0.2.2:3000/api/v1/auth/refresh-token",
            {
              refreshToken: refreshToken,
            }
          );

          console.log("Refresh token response:", response.data); // Log respons dari server

          // Simpan token baru
          const newAccessToken = response.data.data.token;
          await setToken(newAccessToken);
          console.log("New Access Token Set:", newAccessToken); // Log token baru yang disimpan

          // Set header Authorization untuk request asli dan coba lagi
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest); // Ulangi request asli dengan token baru
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
          await removeToken(); // Hapus token jika refresh gagal
          await removeRefreshToken(); // Hapus refresh token jika refresh gagal
          router.replace("(auth)/login"); // Redirect ke halaman login
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
