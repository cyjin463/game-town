"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSession } from "@/lib/api/auth";
import {
  AUTH_LOGOUT_EVENT,
  TOKEN_KEY,
  USERNAME_KEY,
  clearAuthSession,
} from "@/lib/auth-storage";

export interface AuthSession {
  username: string;
  token: string;
}

interface AuthContextValue {
  username: string;
  isLoggedIn: boolean;
  isReady: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      setIsReady(true);
      return;
    }

    getSession()
      .then(({ username: sessionUsername }) => {
        setUsername(sessionUsername);
        setToken(storedToken);
        localStorage.setItem(USERNAME_KEY, sessionUsername);
      })
      .catch(() => {
        clearAuthSession();
        setUsername("");
        setToken("");
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUsername("");
      setToken("");
    };

    window.addEventListener(AUTH_LOGOUT_EVENT, handleLogout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleLogout);
  }, []);

  const login = useCallback(({ username, token }: AuthSession) => {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    setUsername(username);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername("");
    setToken("");
  }, []);

  const value = useMemo(
    () => ({
      username,
      isLoggedIn: Boolean(username && token),
      isReady,
      login,
      logout,
    }),
    [username, token, isReady, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
