import { clearAuthSession, getAuthToken } from "@/lib/auth-storage";
import type { ApiErrorBody } from "./types";

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set("Content-Type", "application/json");

  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(path, {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401 && token) {
      clearAuthSession();
    }

    const error = (await res.json().catch(() => ({}))) as ApiErrorBody;
    throw new ApiError(error.message || "요청에 실패했습니다.");
  }

  return res.json() as Promise<T>;
}
