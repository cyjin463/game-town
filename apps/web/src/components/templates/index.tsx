"use client";

import React, { useState } from "react";
import { Leaderboard } from "@/components/molecules/Leaderboard";
import { Button } from "@/shared/atoms/Button";
import { SnakePreview } from "@/shared/atoms/SnakePreview";
import { SnakeGame } from "@/games/snake/SnakeGame";

const features = [
  "🎮 방향키로 지렁이 조작",
  "🍎 먹이를 먹어서 성장",
  "🚧 점수에 따라 장애물 생성",
  "⚡ 속도가 점점 빨라짐",
];

interface HomeTemplateProps {
  username: string;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ username }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="page-shell">
      <main>
        {isPlaying ? (
          <SnakeGame
            autoStart
            username={username || undefined}
            onExit={() => setIsPlaying(false)}
          />
        ) : (
          <>
            <div className="card-section">
              <div className="shrink-0">
                <div className="game-preview-frame">
                  <SnakePreview />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="heading-page mb-2">지렁이 게임</h1>
                <p className="text-body mb-4">
                  클래식한 스네이크 게임을 웹에서 즐겨보세요!
                </p>
                <ul className="mb-6 list-none space-y-1">
                  {features.map((feature) => (
                    <li key={feature} className="text-body">
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
            <Leaderboard />
          </>
        )}
      </main>

      <footer className="text-caption mt-10 text-center">
        <p>&copy; 2024 게임 포털. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};
