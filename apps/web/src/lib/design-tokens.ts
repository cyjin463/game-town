export const tokenVar = {
  canvas: "--color-canvas",
  canvasGridLine: "--color-canvas-grid-line",
  gameObstacle: "--color-game-obstacle",
  gameSnake: "--color-game-snake",
  gameFood: "--color-game-food",
} as const;

export function readCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return [51, 51, 51];

  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

export function readSnakeRgb(): [number, number, number] {
  const color = readCssVar(tokenVar.gameSnake);
  return color.startsWith("#") ? hexToRgb(color) : [39, 39, 42];
}
