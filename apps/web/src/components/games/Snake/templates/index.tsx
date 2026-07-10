import { Leaderboard } from "@/components/Home/molecules/Leaderboard";
import { SnakeGame } from "@/components/games/Snake/organisms/SnakeGame";

export function SnakeGameTemplate() {
  return (
    <section className="relative mx-auto flex w-full flex-col items-center gap-6 px-4 py-6 sm:px-6 xl:block">
      <SnakeGame />
      <Leaderboard />
    </section>
  );
}
