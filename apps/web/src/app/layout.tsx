import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "게임 포털",
  description: "즐거운 웹게임들을 만나보세요!",
  keywords: ["게임", "웹게임", "미니게임", "포털"],
  authors: [{ name: "Your Name" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryProvider>
          <div className="max-w-[1280px] mx-auto">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
