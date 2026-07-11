import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import "@/globals.css";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

const ogImage = {
  url: "/icon.png",
  width: 512,
  height: 512,
  alt: SITE_NAME,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["게임", "웹게임", "미니게임", "포털", "dev37"],
  authors: [{ name: "dev37" }],
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [ogImage],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [ogImage.url],
  },
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
          <AuthProvider>
            <Header />
            <div className="max-w-[1280px] mx-auto pt-20">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
