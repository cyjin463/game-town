"use client";

import { useCallback, useEffect, useState } from "react";

const TOKEN_KEY = "auth_token";
const USERNAME_KEY = "auth_username";

export interface AuthSession {
  username: string;
  token: string;
}

export function useAuth() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem(USERNAME_KEY) ?? "");
    setToken(localStorage.getItem(TOKEN_KEY) ?? "");
    setIsReady(true);
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

  return {
    username,
    isLoggedIn: Boolean(username && token),
    isReady,
    login,
    logout,
  };
}
