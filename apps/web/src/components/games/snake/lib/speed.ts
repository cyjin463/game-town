/** 0~39점 구간(레벨 1) 속도. 값이 클수록 느림 */
export const INITIAL_MOVE_INTERVAL = 8;

/** 40점 이상 가속 구간 (레벨 2~5). 레벨 1은 INITIAL_MOVE_INTERVAL 사용 */
export const MOVE_INTERVAL_BY_LEVEL: Record<number, number> = {
  2: 7,
  3: 6,
  4: 5,
  5: 4,
};

export const SCORE_SPEED_THRESHOLDS = {
  level2: 40,
  level3: 110,
  level4: 160,
  level5: 300,
} as const;

export function getSpeedLevel(score: number): number {
  if (score >= SCORE_SPEED_THRESHOLDS.level5) return 5;
  if (score >= SCORE_SPEED_THRESHOLDS.level4) return 4;
  if (score >= SCORE_SPEED_THRESHOLDS.level3) return 3;
  if (score >= SCORE_SPEED_THRESHOLDS.level2) return 2;
  return 1;
}

export function getMoveIntervalForLevel(level: number): number {
  if (level <= 1) {
    return INITIAL_MOVE_INTERVAL;
  }

  return MOVE_INTERVAL_BY_LEVEL[level] ?? INITIAL_MOVE_INTERVAL;
}
