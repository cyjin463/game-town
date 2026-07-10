import type { Position } from "./types";

export function isOutOfBounds(
  position: Position,
  gridWidth: number,
  gridHeight: number
): boolean {
  return (
    position.x < 0 ||
    position.x >= gridWidth ||
    position.y < 0 ||
    position.y >= gridHeight
  );
}

export function hitsSelf(head: Position, snake: Position[]): boolean {
  return snake.some(
    (segment) => segment.x === head.x && segment.y === head.y
  );
}
