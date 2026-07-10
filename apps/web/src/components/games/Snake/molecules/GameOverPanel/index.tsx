import { Button } from "@/shared/atoms/Button";
import Link from "next/link";

interface GameOverPanelProps {
  finalScore: number;
  onRestart: () => void;
}

export function GameOverPanel({
  finalScore,
  onRestart,
}: GameOverPanelProps) {
  return (
    <div className="overlay">
      <div className="flex min-w-[300px] flex-col items-center rounded-2xl bg-surface p-8 text-center shadow-overlay">
        <h2 className="mb-3 text-3xl font-bold text-danger drop-shadow-sm">
          게임 오버!
        </h2>
        <p className="mb-6 text-xl font-semibold text-foreground">
          점수: {finalScore}
        </p>
        <div className="flex flex-row items-center gap-3">
          <Button onClick={onRestart} size="medium" className="w-[120px] hover:text-foreground-inverse">
            다시 시작
          </Button>
          <Link
            href="/"
            className="btn btn-secondary btn-md w-[120px] text-center"
          >
            돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
