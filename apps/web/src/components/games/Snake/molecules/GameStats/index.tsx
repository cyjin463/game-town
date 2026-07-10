interface GameStatsProps {
  score: number;
  length: number;
}

export function GameStats({ score, length }: GameStatsProps) {
  return (
    <div className="mb-4 flex justify-around gap-4">
      <div className="rounded-lg bg-surface-muted px-4 py-2 text-sm font-bold shadow-sm sm:text-base">
        점수: {score}
      </div>
      <div className="rounded-lg bg-surface-muted px-4 py-2 text-sm font-bold shadow-sm sm:text-base">
        길이: {length}
      </div>
    </div>
  );
}
