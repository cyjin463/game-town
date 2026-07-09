"use client";

import React from "react";
import { Button } from "@/shared/atoms/Button";
import { SnakePreview } from "@/shared/atoms/SnakePreview";
import { useRouter } from "next/navigation";

const features = [
  "🎮 방향키로 지렁이 조작",
  "🍎 먹이를 먹어서 성장",
  "🚧 점수에 따라 장애물 생성",
  "⚡ 속도가 점점 빨라짐",
];

export const HomeTemplate: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full mx-auto px-4 py-6 sm:px-6">
      <main>
        <div className="w-fit mx-auto rounded-2xl bg-surface shadow-elevated flex flex-col items-center justify-center p-6 text-center md:p-8 md:text-left">
          <h1 className="w-fit heading-page mb-10">지렁이 게임</h1>
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-xl border-4 border-line-game bg-canvas sm:h-40 sm:w-40 md:mx-0">
            <SnakePreview />
          </div>
          <ul className="w-fit mb-6 list-none space-y-1">
            {features.map((feature) => (
              <li key={feature} className="text-body">
                {feature}
              </li>
            ))}
          </ul>
          <Button
            variant="primary"
            size="large"
            onClick={() => router.push("/games/snake")}
            className="mt-2"
          >
            게임 시작
          </Button>
        </div>
      </main>
    </div>
  );
};
