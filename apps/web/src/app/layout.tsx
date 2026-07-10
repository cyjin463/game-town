import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import "@/globals.css";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "dev37 게임 타운",
    template: "%s | dev37 게임 타운",
  },
  description: "즐거운 웹게임들을 만나보세요!",
  keywords: ["게임", "웹게임", "미니게임", "포털", "dev37"],
  authors: [{ name: "dev37" }],
  applicationName: "dev37 게임 타운",
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
          <Header />
          <div className="max-w-[1280px] mx-auto pt-20">
            {children}
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
