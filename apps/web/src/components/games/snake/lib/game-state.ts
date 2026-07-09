import {
  GRID_HEIGHT,
  GRID_SIZE,
  GRID_WIDTH,
  INITIAL_SNAKE,
} from "./constants";
import { createFoodPosition } from "./food";
import { INITIAL_MOVE_INTERVAL } from "./speed";
import type { Obstacle, Position } from "./types";

export interface GameState {
  snake: Position[];
  direction: string;
  nextDirection: string;
  food: Position | null;
  obstacles: Obstacle[];
  lastObstacleScore: number;
  gridSize: number;
  gridWidth: number;
  gridHeight: number;
  moveCounter: number;
  moveInterval: number;
  currentScore: number;
}

export function createInitialGameState(): GameState {
  return {
    snake: [...INITIAL_SNAKE],
    direction: "right",
    nextDirection: "right",
    food: null,
    obstacles: [],
    lastObstacleScore: 0,
    gridSize: GRID_SIZE,
    gridWidth: GRID_WIDTH,
    gridHeight: GRID_HEIGHT,
    moveCounter: 0,
    moveInterval: INITIAL_MOVE_INTERVAL,
    currentScore: 0,
  };
}

export function resetGameState(game: GameState, direction: string): void {
  game.snake = [...INITIAL_SNAKE];
  game.direction = direction;
  game.nextDirection = direction;
  game.obstacles = [];
  game.currentScore = 0;
  game.lastObstacleScore = 0;
  game.moveCounter = 0;
  game.moveInterval = INITIAL_MOVE_INTERVAL;
  game.food = createFoodPosition(game);
}

export function syncDirection(game: GameState): void {
  game.direction = game.nextDirection;
}
