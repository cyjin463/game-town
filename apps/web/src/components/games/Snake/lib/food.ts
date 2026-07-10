import type { GameState } from "./game-state";
import type { Obstacle, Position } from "./types";

function isPositionOnSnake(position: Position, snake: Position[]): boolean {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y
  );
}

function isPositionOnObstacle(position: Position, obstacle: Obstacle): boolean {
  return (
    position.x >= obstacle.x &&
    position.x < obstacle.x + obstacle.width &&
    position.y >= obstacle.y &&
    position.y < obstacle.y + obstacle.height
  );
}

function isPositionNearObstacle(
  position: Position,
  obstacle: Obstacle,
  gridWidth: number,
  gridHeight: number
): boolean {
  const minX = Math.max(0, obstacle.x - 1);
  const maxX = Math.min(gridWidth - 1, obstacle.x + obstacle.width);
  const minY = Math.max(0, obstacle.y - 1);
  const maxY = Math.min(gridHeight - 1, obstacle.y + obstacle.height);

  return (
    position.x >= minX &&
    position.x <= maxX &&
    position.y >= minY &&
    position.y <= maxY
  );
}

function isValidFoodPosition(position: Position, game: GameState): boolean {
  if (isPositionOnSnake(position, game.snake)) {
    return false;
  }

  return !game.obstacles.some(
    (obstacle) =>
      isPositionOnObstacle(position, obstacle) ||
      isPositionNearObstacle(
        position,
        obstacle,
        game.gridWidth,
        game.gridHeight
      )
  );
}

export function createFoodPosition(game: GameState): Position {
  let food: Position;

  do {
    food = {
      x: Math.floor(Math.random() * game.gridWidth),
      y: Math.floor(Math.random() * game.gridHeight),
    };
  } while (!isValidFoodPosition(food, game));

  return food;
}

export function isFoodAt(position: Position, food: Position | null): boolean {
  return food !== null && position.x === food.x && position.y === food.y;
}
