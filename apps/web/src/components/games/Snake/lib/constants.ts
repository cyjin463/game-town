import type { Position } from "./types";

export const GRID_SIZE = 10;
export const GRID_WIDTH = 30;
export const GRID_HEIGHT = 30;
export const SCORE_PER_FOOD = 10;
export const OBSTACLE_SCORE_INTERVAL = 30;
export const MAX_OBSTACLE_PLACEMENT_ATTEMPTS = 50;

export const INITIAL_SNAKE: Position[] = [
  { x: 15, y: 15 },
  { x: 14, y: 15 },
  { x: 13, y: 15 },
  { x: 12, y: 15 },
  { x: 11, y: 15 },
];

export const OBSTACLE_SIZES = [
  { width: 1, height: 1 },
  { width: 1, height: 2 },
  { width: 1, height: 3 },
  { width: 2, height: 1 },
  { width: 2, height: 2 },
  { width: 2, height: 3 },
  { width: 3, height: 1 },
  { width: 3, height: 2 },
  { width: 3, height: 3 },
] as const;
