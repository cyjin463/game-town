import type { ApiErrorBody } from "./types";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = (await res.json().catch(() => ({}))) as ApiErrorBody;
    throw new ApiError(error.message || "요청에 실패했습니다.");
  }

  return res.json() as Promise<T>;
}
