import {
  MAX_OBSTACLE_PLACEMENT_ATTEMPTS,
  OBSTACLE_SCORE_INTERVAL,
  OBSTACLE_SIZES,
} from "./constants";
import type { GameState } from "./game-state";
import type { Obstacle, Position } from "./types";

function isPositionOnSnake(position: Position, snake: Position[]): boolean {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y
  );
}

function overlapsExistingObstacles(
  obstacle: Obstacle,
  obstacles: Obstacle[]
): boolean {
  return obstacles.some(
    (existing) =>
      obstacle.x < existing.x + existing.width &&
      obstacle.x + obstacle.width > existing.x &&
      obstacle.y < existing.y + existing.height &&
      obstacle.y + obstacle.height > existing.y
  );
}

function isObstaclePlacementInvalid(
  obstacle: Obstacle,
  snake: Position[],
  obstacles: Obstacle[]
): boolean {
  for (let dx = 0; dx < obstacle.width; dx++) {
    for (let dy = 0; dy < obstacle.height; dy++) {
      const x = obstacle.x + dx;
      const y = obstacle.y + dy;

      if (isPositionOnSnake({ x, y }, snake)) {
        return true;
      }
    }
  }

  return overlapsExistingObstacles(obstacle, obstacles);
}

function pickRandomObstacleSize(): { width: number; height: number } {
  return OBSTACLE_SIZES[Math.floor(Math.random() * OBSTACLE_SIZES.length)];
}

export function createObstacle(game: GameState): Obstacle | null {
  const size = pickRandomObstacleSize();
  let attempts = 0;

  while (attempts < MAX_OBSTACLE_PLACEMENT_ATTEMPTS) {
    const obstacle: Obstacle = {
      x: Math.floor(Math.random() * (game.gridWidth - size.width)),
      y: Math.floor(Math.random() * (game.gridHeight - size.height)),
      width: size.width,
      height: size.height,
    };

    if (!isObstaclePlacementInvalid(obstacle, game.snake, game.obstacles)) {
      return obstacle;
    }

    attempts++;
  }

  return null;
}

export function shouldSpawnObstacle(
  currentScore: number,
  lastObstacleScore: number
): boolean {
  const currentLevel = Math.floor(currentScore / OBSTACLE_SCORE_INTERVAL);
  const lastLevel = Math.floor(lastObstacleScore / OBSTACLE_SCORE_INTERVAL);
  return currentLevel > lastLevel;
}

export function spawnObstacleIfNeeded(game: GameState): void {
  if (!shouldSpawnObstacle(game.currentScore, game.lastObstacleScore)) {
    return;
  }

  const obstacle = createObstacle(game);
  if (obstacle) {
    game.obstacles.push(obstacle);
  }

  game.lastObstacleScore = game.currentScore;
}

export function hitsObstacle(head: Position, obstacles: Obstacle[]): boolean {
  return obstacles.some(
    (obstacle) =>
      head.x >= obstacle.x &&
      head.x < obstacle.x + obstacle.width &&
      head.y >= obstacle.y &&
      head.y < obstacle.y + obstacle.height
  );
}
