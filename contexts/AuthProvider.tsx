import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  logout as logoutService,
} from "../services/authService";
import { getToken } from "../services/tokenService";
import { useRouter, useSegments } from "expo-router";

interface AuthProps {
  authenticated: boolean | null;
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
  const router = useRouter();
  const segments = useSegments();

  const checkAuthenticated = async () => {
    const token = await getToken();
    // Set authenticated hanya jika token ada dan valid
    setAuthenticated(!!token);
  };

  const login = async (username: string, password: string) => {
    try {
      await loginService(username, password);

      console.log("Login success");

      setAuthenticated(true); // Set authenticated ke true setelah login berhasil
      router.replace("(tabs)/home"); // Pastikan rute ini benar
    } catch (error) {
      console.error("Login failed", error);
      setAuthenticated(false); // Pastikan set ke false jika login gagal
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setAuthenticated(false);
      router.replace("(auth)/login"); // Pastikan rute ini benar
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
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
