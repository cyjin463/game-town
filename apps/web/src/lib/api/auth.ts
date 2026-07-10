import { apiFetch } from "./client";
import type { AuthMeResponse, AuthResponse, LoginRequest, RegisterRequest } from "./types";

export function getSession() {
  return apiFetch<AuthMeResponse>("/api/auth/me");
}

export function login(data: LoginRequest) {
  return apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function register(data: RegisterRequest) {
  return apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
