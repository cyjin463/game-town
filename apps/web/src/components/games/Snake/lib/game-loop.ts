import type { GameState } from "@/components/games/Snake/lib/game-state";
import { renderGame } from "@/components/games/Snake/lib/renderer";
import { processGameTick, type TickResult } from "@/components/games/Snake/lib/tick";

export interface GameLoopCallbacks {
  onGameOver: () => void;
  onStateUpdate: (update: { score: number; length: number }) => void;
}

export function runGameLoopFrame(
  game: GameState,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  callbacks: GameLoopCallbacks
): TickResult {
  game.moveCounter++;

  if (game.moveCounter >= game.moveInterval) {
    const { result, stateUpdate } = processGameTick(game);
    game.moveCounter = 0;

    if (stateUpdate) {
      callbacks.onStateUpdate(stateUpdate);
    }

    if (result === "game_over") {
      callbacks.onGameOver();
      renderGame(ctx, canvas, game);
      return "game_over";
    }
  }

  renderGame(ctx, canvas, game);
  return "continue";
}

export function renderIdleBoard(
  game: GameState,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void {
  renderGame(ctx, canvas, game);
}
