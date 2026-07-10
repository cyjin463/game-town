import { GameCard } from "@/shared/molecules/GameCard";
import { GAMES } from "@/lib/game";

export function GameList() {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
      {GAMES.map((game) => (
        <GameCard key={`game-card-${game.id}`} game={game} />
      ))}
    </div>
  );
}