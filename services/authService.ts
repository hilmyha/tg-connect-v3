import instance from "../utils/axios";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "./tokenService";

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await instance.post("/auth/register", {
      email,
      username,
      password,
    });

    const res = response.data;

    return res;
  } catch (error: any) {
    // Ambil pesan kesalahan dari respons API
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message); // Melempar pesan kesalahan dari API
    } else {
      throw new Error("Register failed"); // Pesan kesalahan umum jika tidak ada respons
    }
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await instance.post("/auth/login", { username, password });

    const res = response.data;
    await setToken(res.data.token);
    await setRefreshToken(res.data.refreshToken);

    return res;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    await removeToken(); // Hapus token dari SecureStore
    await removeRefreshToken(); // Hapus refresh token dari SecureStore
  } catch (error) {
    console.error("Logout failed", error);
  }
};
