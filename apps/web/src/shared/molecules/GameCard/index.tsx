"use client";

import type { ReactNode } from "react";
import { SnakePreview } from "@/shared/atoms/SnakePreview";
import { useRouter } from "next/navigation";
import type { GameItem, GamePreviewId } from "@/lib/game";

const GAME_PREVIEWS: Record<GamePreviewId, ReactNode> = {
  snake: <SnakePreview />,
  "coming-soon": (
    <div className="flex h-full w-full items-center justify-center text-body font-bold">
      Coming Soon
    </div>
  ),
};

export function GameCard({ game }: { game: GameItem }) {
  const router = useRouter();
  const { title, features, href, previewId } = game;

  const moveToGame =() => {
    if (!href) return
    router.push(href);
  }

  return (
    <button
      className="
        h-full w-full flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-line-strong bg-surface-soft py-6 px-4 text-center shadow-elevated outline-none transition-all duration-300
        hover:-translate-y-1.5 hover:border-line hover:bg-surface hover:shadow-overlay
        active:translate-y-0 active:border-line active:bg-surface active:shadow-elevated
        md:p-8 md:text-left
      "
      style={{
        opacity: href ? 1 : 0.5,
        pointerEvents: href ? "auto" : "none",
      }}
      onClick={moveToGame}
    >
      <h1 className="w-fit heading-page mb-10">{title}</h1>
      <div className="flex flex-row md:flex-col items-center justify-center">
        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-xl border-4 border-line-game bg-canvas sm:h-40 sm:w-40 md:mx-0">
          {GAME_PREVIEWS[previewId]}
        </div>
        <ul className="w-fit mb-6 list-none space-y-1 ml-4 md:ml-0 text-left md:text-center">
          {features?.map((feature) => (
            <li key={feature} className="text-body">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
