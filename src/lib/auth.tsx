import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  fullName: string;
  email: string;
  gender?: string;
  phone?: string;
  maritalStatus?: string;
  profession?: string;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, _password: string) => Promise<void>;
  register: (user: User & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (u: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "mindease.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextValue = {
    user,
    login: async (email) => {
      const existing = localStorage.getItem("mindease.registered:" + email);
      if (existing) persist(JSON.parse(existing));
      else persist({ fullName: email.split("@")[0], email });
    },
    register: async ({ password: _p, ...u }) => {
      localStorage.setItem("mindease.registered:" + u.email, JSON.stringify(u));
      persist(u);
    },
    logout: () => persist(null),
    updateUser: (patch) => {
      if (!user) return;
      const next = { ...user, ...patch };
      persist(next);
      localStorage.setItem("mindease.registered:" + next.email, JSON.stringify(next));
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
