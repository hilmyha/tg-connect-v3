import React, { createContext, useContext, useEffect, useState } from "react";
import {
  register as registerService,
  login as loginService,
  logout as logoutService,
} from "../services/authService";
import { getToken } from "../services/tokenService";
import { useRouter, useSegments } from "expo-router";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
interface AuthProps {
  authenticated: boolean | null;
  userId: string | null;
  setAuthenticated: (value: boolean) => void;
  register: (email: string, username: string, password: string) => Promise<any>;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const checkAuthenticated = async () => {
    const token = await getToken();
    if (token) {
      setAuthenticated(true);

      // Decode token untuk mendapatkan userId
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUserId(decodedToken.id); // Simpan userId dari token
    } else {
      setAuthenticated(false);
      setUserId(null); // Reset userId jika tidak ada token
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      await registerService(email, username, password);
      router.replace("(auth)/login");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      await loginService(username, password);
      console.log("Login success");
      await checkAuthenticated();
      setAuthenticated(true); // Set authenticated ke true setelah login berhasil
      router.replace("(tabs)/home");
    } catch (error: any) {
      throw new Error(error.message);
      setAuthenticated(false); // Pastikan set ke false jika login gagal
    }
  };

  const logout = async () => {
    try {
      setUserId(null);
      setAuthenticated(false);
      await logoutService();
      router.replace("(auth)/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    console.log("Authenticated:", authenticated);
    console.log("Segments:", segments);

    const inAuthGroup = segments[0] === "(auth)";

    if (authenticated === true && inAuthGroup) {
      router.replace("(tabs)/home");
    } else if (authenticated === null && !inAuthGroup) {
      router.replace("(auth)/login");
    }
  }, [authenticated, segments, router]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        userId,
        setAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
