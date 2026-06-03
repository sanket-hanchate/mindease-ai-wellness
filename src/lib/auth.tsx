import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const TOKEN_KEY = "mindease.token";
const STORAGE_KEY = "mindease.user";

export interface User {
  fullName: string;
  email: string;
  gender?: string;
  phone?: string;
  maritalStatus?: string;
  profession?: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  register: (
    user: User & { password: string }
  ) => Promise<void>;
  logout: () => void;
  updateUser: (u: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  const persist = (u: User | null) => {
    setUser(u);

    if (u) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(u)
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem(TOKEN_KEY)
          : null;

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          logoutUser();
          return;
        }

        const userData = await res.json();

        setUser(userData);
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );

        logoutUser();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,

    login: async (
      email,
      password
    ) => {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Login failed"
        );
      }

      localStorage.setItem(
        TOKEN_KEY,
        data.token
      );

      persist(data.user);
      setIsLoading(false);
    },

    register: async ({
      password,
      ...u
    }) => {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...u,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Registration failed"
        );
      }
    },

    logout: logoutUser,

    updateUser: (patch) => {
      if (!user) return;

      const next = {
        ...user,
        ...patch,
      };

      persist(next);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
}