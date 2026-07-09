"use client";

import React, { useState } from "react";
import { AuthModal } from "@/components/organisms";
import { Button } from "@/components/atoms/Button";
import { SnakePreview } from "@/components/atoms/SnakePreview";
import { SnakeGame } from "@/games/snake/SnakeGame";

const features = [
  "🎮 방향키로 지렁이 조작",
  "🍎 먹이를 먹어서 성장",
  "🚧 점수에 따라 장애물 생성",
  "⚡ 속도가 점점 빨라짐",
];

export const HomeTemplate: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="w-full max-w-5xl px-4 py-6 sm:px-6">
      <header className="mb-8 text-center">
        <div className="mb-2 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="order-first w-full md:order-none md:flex-1">
            <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm sm:text-4xl">
              지렁이 게임 Pixel
            </h1>
          </div>
          <div className="shrink-0 md:order-last">
            {isLoggedIn ? (
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <span className="text-sm font-bold text-gray-800 sm:text-base">
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
              >
                로그인
              </Button>
            )}
          </div>
        </div>
      </header>

      <main>
        {isPlaying ? (
          <SnakeGame autoStart onExit={() => setIsPlaying(false)} />
        ) : (
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-xl md:flex-row md:items-center md:p-8">
            <div className="shrink-0">
              <div className="flex h-32 w-32 items-center justify-center rounded-xl border-4 border-zinc-800 bg-gray-100 sm:h-40 sm:w-40">
                <SnakePreview />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                지렁이 게임
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                클래식한 스네이크 게임을 웹에서 즐겨보세요!
              </p>
              <ul className="mb-6 list-none space-y-1">
                {features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-600 sm:text-base">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="large"
                onClick={() => setIsPlaying(true)}
                className="mt-2"
              >
                게임 시작
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-10 text-center text-sm text-gray-600">
        <p>&copy; 2024 게임 포털. 모든 권리 보유.</p>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};
