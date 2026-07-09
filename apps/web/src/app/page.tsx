"use client";

import { HomeTemplate } from "@/components/templates";
import { AuthModal } from "@/components/organisms";
import { Header } from "@/shared/Header";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function HomePage() {
  const { username, isLoggedIn, isReady, login, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={logout}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
      <HomeTemplate username={username} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
      />
    </>
  );
}
