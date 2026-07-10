import { SCORE_PER_FOOD } from "./constants";
import type { GameState } from "./game-state";
import { getMoveIntervalForLevel, getSpeedLevel } from "./speed";

export function applySpeedForScore(game: GameState, oldScore: number): void {
  const oldSpeedLevel = getSpeedLevel(oldScore);
  const newSpeedLevel = getSpeedLevel(game.currentScore);

  if (oldSpeedLevel === newSpeedLevel) {
    return;
  }

  const oldInterval = game.moveInterval;
  game.moveInterval = getMoveIntervalForLevel(newSpeedLevel);

  if (oldInterval !== game.moveInterval) {
    game.moveCounter = 0;
  }
}

export function addFoodScore(game: GameState): number {
  game.currentScore += SCORE_PER_FOOD;
  return game.currentScore;
}
