"use client";

import { useLeaderboardQuery } from "@/hooks/useScores";

export function Leaderboard() {
  const { data, isLoading, isError } = useLeaderboardQuery();

  if (isLoading) {
    return (
      <section className="card-panel mt-8">
        <h2 className="heading-section mb-4">리더보드</h2>
        <p className="text-caption">불러오는 중...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="card-panel mt-8">
        <h2 className="heading-section mb-4">리더보드</h2>
        <p className="text-error text-sm">리더보드를 불러오지 못했습니다.</p>
      </section>
    );
  }

  if (!data?.length) {
    return (
      <section className="card-panel mt-8">
        <h2 className="heading-section mb-4">리더보드</h2>
        <p className="text-caption">아직 기록이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="card-panel mt-8">
      <h2 className="heading-section mb-4">리더보드</h2>
      <ol className="space-y-2">
        {data.map((entry) => (
          <li key={entry.userId} className="list-item-row">
            <span className="font-medium text-foreground">
              {entry.rank}. {entry.username}
            </span>
            <span className="text-accent">{entry.score}점</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
