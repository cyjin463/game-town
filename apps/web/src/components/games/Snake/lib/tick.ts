import { isOutOfBounds, hitsSelf } from "./collision";
import { createFoodPosition, isFoodAt } from "./food";
import type { GameState } from "./game-state";
import { syncDirection } from "./game-state";
import { getNextHead } from "./movement";
import { hitsObstacle, spawnObstacleIfNeeded } from "./obstacles";
import { addFoodScore, applySpeedForScore } from "./score";

export type TickResult = "continue" | "game_over";

interface TickStateUpdate {
  score: number;
  length: number;
}

export function processGameTick(
  game: GameState
): { result: TickResult; stateUpdate?: TickStateUpdate } {
  syncDirection(game);

  const head = getNextHead(game.snake[0], game.direction);

  if (isOutOfBounds(head, game.gridWidth, game.gridHeight)) {
    return { result: "game_over" };
  }

  if (hitsSelf(head, game.snake)) {
    return { result: "game_over" };
  }

  if (hitsObstacle(head, game.obstacles)) {
    return { result: "game_over" };
  }

  game.snake.unshift(head);

  if (isFoodAt(head, game.food)) {
    return handleFoodEaten(game);
  }

  game.snake.pop();
  return { result: "continue" };
}

function handleFoodEaten(
  game: GameState
): { result: TickResult; stateUpdate: TickStateUpdate } {
  const oldScore = game.currentScore;
  const score = addFoodScore(game);

  game.food = createFoodPosition(game);
  spawnObstacleIfNeeded(game);
  applySpeedForScore(game, oldScore);

  return {
    result: "continue",
    stateUpdate: {
      score,
      length: game.snake.length,
    },
  };
}
