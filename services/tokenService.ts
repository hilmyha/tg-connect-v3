import * as SecureStore from "expo-secure-store";

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
  console.log("Token saved to SecureStore:", token); // Log token yang disimpan
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    console.log("Retrive: ", token);
    return token;
  } catch (error: any) {
    console.error("Failed to get token", error);
    return null;
  }
};

export const setRefreshToken = async (refreshToken: string) => {
  await SecureStore.setItemAsync("refreshToken", refreshToken);
};

export const removeRefreshToken = async () => {
  await SecureStore.deleteItemAsync("refreshToken");
};

export const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync("refreshToken");
  } catch (error: any) {
    console.error("Failed to get refresh token", error);
    return null;
  }
};
