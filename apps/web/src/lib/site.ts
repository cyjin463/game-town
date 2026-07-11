export const SITE_NAME = "dev37 게임 타운";
export const SITE_DESCRIPTION = "즐거운 웹게임들을 만나보세요!";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
