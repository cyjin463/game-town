"use client";

import { useLeaderboardQuery } from "@/hooks/useScores";

const panelClassName =
  "h-fit w-full max-w-game rounded-2xl border border-line bg-surface p-6 shadow-elevated xl:absolute xl:top-6 xl:right-40 xl:h-[calc(100%-3rem)] xl:min-w-[182px] xl:w-auto xl:max-w-none";
const titleClassName = "mb-4 text-xl font-bold text-foreground";

export const Leaderboard = () => {
  const { data, isLoading, isError } = useLeaderboardQuery();

  if (isLoading) {
    return (
      <section className={panelClassName}>
        <h2 className={titleClassName}>이번주 TOP10</h2>
        <p className="w-full font-medium text-foreground">불러오는 중...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={panelClassName}>
        <h2 className={titleClassName}>이번주 TOP10</h2>
        <p className="text-error text-sm">랭킹을 불러오지 못했습니다.</p>
      </section>
    );
  }

  if (!data?.length) {
    return (
      <section className={panelClassName}>
        <h2 className={titleClassName}>이번주 TOP10</h2>
        <p className="text-sm text-foreground-subtle">아직 기록이 없습니다.</p>
      </section>
    );
  }

  return (
    <div className={panelClassName}>
      <h2 className={titleClassName}>이번주 TOP10</h2>
      <ol className="space-y-2">
        {data.map((entry) => (
          <li
            key={entry.userId}
            className="flex items-center justify-between rounded-lg bg-surface-muted py-2 gap-10 sm:text-base"
          >
            <span className="font-medium text-foreground">
              {entry.rank}. {entry.username}
            </span>
            <span className="font-bold text-accent">{entry.score}점</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;