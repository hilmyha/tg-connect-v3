import instance from "../utils/axios";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "./tokenService";

export const login = async (username: string, password: string) => {
  try {
    const response = await instance.post("/auth/login", { username, password });

    const res = response.data;
    console.log("Login success", res);

    await setToken(res.data.token); // Simpan token ke SecureStore
    console.log("Token: ", res.data.token);

    await setRefreshToken(res.data.refreshToken); // Simpan refresh token ke SecureStore
    console.log("Refresh Token: ", res.data.refreshToken);

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
