import type { Metadata } from "next";
import { SnakeGameTemplate } from "@/components/games/Snake/templates";
import { GAMES } from "@/lib/game";

const snakeGame = GAMES.find((game) => game.id === "snake")!;

export const metadata: Metadata = {
  title: snakeGame.title,
  description: "방향키로 지렁이를 조작하고 먹이를 먹어 최고 점수에 도전하세요!",
  openGraph: {
    title: snakeGame.title,
    description: "방향키로 지렁이를 조작하고 먹이를 먹어 최고 점수에 도전하세요!",
    url: snakeGame.href,
  },
  twitter: {
    title: snakeGame.title,
    description: "방향키로 지렁이를 조작하고 먹이를 먹어 최고 점수에 도전하세요!",
  },
};

export default function SnakeGamePage() {
  return <SnakeGameTemplate />;
}
