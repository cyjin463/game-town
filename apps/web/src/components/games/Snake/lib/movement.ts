import { getDirectionFromKey, rotateClockwise } from "@/components/games/Snake/lib/direction";
import type { GameState } from "@/components/games/Snake/lib/game-state";
import type { Position } from "@/components/games/Snake/lib/types";

const OPPOSITE_DIRECTIONS: Record<string, string> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export function getNextHead(head: Position, direction: string): Position {
  const nextHead = { ...head };

  switch (direction) {
    case "up":
      nextHead.y--;
      break;
    case "down":
      nextHead.y++;
      break;
    case "left":
      nextHead.x--;
      break;
    case "right":
      nextHead.x++;
      break;
  }

  return nextHead;
}

export function canTurnTo(direction: string, currentDirection: string): boolean {
  return OPPOSITE_DIRECTIONS[direction] !== currentDirection;
}

export function queueDirection(game: GameState, direction: string): void {
  if (canTurnTo(direction, game.direction)) {
    game.nextDirection = direction;
  }
}

export function applyKeyboardDirection(game: GameState, key: string): boolean {
  const direction = getDirectionFromKey(key);
  if (!direction) {
    return false;
  }

  queueDirection(game, direction);
  return true;
}

export function applyTouchTurn(game: GameState): void {
  queueDirection(game, rotateClockwise(game.nextDirection));
}
