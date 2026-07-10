'use client';

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/shared/atoms/Button";
import { AuthModal } from "@/shared/organisms/Modal/AuthModal";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { username, isLoggedIn, isReady, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsAuthModalOpen(false);
  };

  if (!isReady) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between py-4 px-5 bg-[#d4d4d4]">
      <div>
        <Link href="/" className="flex items-center gap-0.5">
          <span className="text-2xl font-bold text-foreground">dev</span>
          <Image src="/icon.png" alt="dev37" width={32} height={32} />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="shrink-0 text-center md:order-last">
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <span className="text-sm font-bold text-foreground sm:text-base">
                {username}님 환영합니다!
              </span>
              <Button variant="secondary" size="small" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsAuthModalOpen(true)}
              className="text-center"
            >
              로그인
            </Button>
          )}
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
      />
    </header>
  );
};
