export const TOKEN_KEY = "auth_token";
export const USERNAME_KEY = "auth_username";
export const AUTH_LOGOUT_EVENT = "auth:logout";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
}
