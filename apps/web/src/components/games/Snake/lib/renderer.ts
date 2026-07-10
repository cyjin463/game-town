import { readCssVar, readSnakeRgb, tokenVar } from "@/lib/design-tokens";
import type { GameState } from "./game-state";

export function renderGame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  game: GameState
): void {
  drawBackground(ctx, canvas, game);
  drawGrid(ctx, canvas, game);
  drawObstacles(ctx, game);
  drawSnake(ctx, game);
  drawFood(ctx, game);
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  _game: GameState
): void {
  ctx.fillStyle = readCssVar(tokenVar.canvas);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  game: GameState
): void {
  ctx.strokeStyle = readCssVar(tokenVar.canvasGridLine);
  ctx.lineWidth = 1;

  for (let i = 0; i <= game.gridWidth; i++) {
    ctx.beginPath();
    ctx.moveTo(i * game.gridSize, 0);
    ctx.lineTo(i * game.gridSize, canvas.height);
    ctx.stroke();
  }

  for (let i = 0; i <= game.gridHeight; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * game.gridSize);
    ctx.lineTo(canvas.width, i * game.gridSize);
    ctx.stroke();
  }
}

function drawObstacles(ctx: CanvasRenderingContext2D, game: GameState): void {
  ctx.fillStyle = readCssVar(tokenVar.gameObstacle);

  game.obstacles.forEach((obstacle) => {
    for (let dx = 0; dx < obstacle.width; dx++) {
      for (let dy = 0; dy < obstacle.height; dy++) {
        ctx.fillRect(
          (obstacle.x + dx) * game.gridSize + 1,
          (obstacle.y + dy) * game.gridSize + 1,
          game.gridSize - 2,
          game.gridSize - 2
        );
      }
    }
  });
}

function drawSnake(ctx: CanvasRenderingContext2D, game: GameState): void {
  const [snakeR, snakeG, snakeB] = readSnakeRgb();

  game.snake.forEach((segment, index) => {
    const alpha = 1 - (index / game.snake.length) * 0.4;
    ctx.fillStyle = `rgba(${snakeR}, ${snakeG}, ${snakeB}, ${alpha})`;
    ctx.fillRect(
      segment.x * game.gridSize + 1,
      segment.y * game.gridSize + 1,
      game.gridSize - 2,
      game.gridSize - 2
    );
  });
}

function drawFood(ctx: CanvasRenderingContext2D, game: GameState): void {
  if (!game.food) {
    return;
  }

  ctx.fillStyle = readCssVar(tokenVar.gameFood);
  ctx.fillRect(
    game.food.x * game.gridSize + 1,
    game.food.y * game.gridSize + 1,
    game.gridSize - 2,
    game.gridSize - 2
  );
}
