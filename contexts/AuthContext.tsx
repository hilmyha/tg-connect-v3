import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Define the User type
 */
type User = {
  name: string;
};

/**
 * Define the AuthType type
 */
type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

/**
 * Buat AuthContext untuk menyimpan informasi user yang sedang login
 */
const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

/**
 * Custom hook untuk mengakses informasi user yang sedang login
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Fungsi untuk menjaga route tertentu agar hanya bisa diakses oleh user yang sudah login
 */
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  // Cek apakah route yang sedang diakses berada di dalam grup "(auth)"
  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    console.log("Current segments:", segments);
    console.log("User:", user);

    if (!user && !inAuthGroup) {
      console.log("Redirecting to (auth)/login");
      router.replace("(auth)/login");
    } else if (user && inAuthGroup) {
      console.log("Redirecting to (tabs)/home");
      router.replace("(tabs)/home");
    }
  }, [user, segments]);
}

/**
 * Buat AuthProvider untuk menyimpan informasi user yang sedang login
 */
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useProtectedRoute(user);

  const authContext: AuthType = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
