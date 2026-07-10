"use client";

import { SnakeGameTemplate } from "@/components/games/Snake";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";

export default function SnakeGamePage() {
  return (
    <>
      <Header/>
      <SnakeGameTemplate />
      <Footer />
    </>
  );
}
