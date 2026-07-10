"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { renderIdleBoard, runGameLoopFrame } from "@/components/games/Snake/lib/game-loop";
import {
  createInitialGameState,
  resetGameState,
  type GameState,
} from "@/components/games/Snake/lib/game-state";
import { applyKeyboardDirection } from "@/components/games/Snake/lib/movement";

export function useSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [length, setLength] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const gameRef = useRef<GameState>(createInitialGameState());

  const ensureIdleBoard = useCallback(() => {
    const game = gameRef.current;
    if (!game.food) {
      resetGameState(game, "right");
    }
  }, []);

  const startGame = useCallback((direction = "right") => {
    const game = gameRef.current;
    game.direction = direction;
    game.nextDirection = direction;
    game.moveCounter = 0;
    setGameOver(false);
    setGameRunning(true);
  }, []);

  const restartGame = useCallback(() => {
    setGameRunning(false);
    setScore(0);
    setLength(5);
    setGameOver(false);
    resetGameState(gameRef.current, "right");
  }, []);

  const handleGameOver = useCallback(() => {
    setGameRunning(false);
    setFinalScore(gameRef.current.currentScore);
    setGameOver(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = gameRef.current;

    if (!gameRunning && !gameOver) {
      ensureIdleBoard();
    }

    let gameLoopId: number | null = null;

    const tick = () => {
      const result = runGameLoopFrame(game, ctx, canvas, {
        onGameOver: handleGameOver,
        onStateUpdate: ({ score: nextScore, length: nextLength }) => {
          setScore(nextScore);
          setLength(nextLength);
        },
      });

      if (result !== "game_over") {
        gameLoopId = requestAnimationFrame(tick);
      }
    };

    if (gameRunning) {
      tick();
    } else {
      renderIdleBoard(game, ctx, canvas);
    }

    return () => {
      if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
      }
    };
  }, [gameRunning, gameOver, ensureIdleBoard, handleGameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const game = gameRef.current;
      const isDirectionKey = applyKeyboardDirection(game, e.key);
      if (!isDirectionKey) return;

      e.preventDefault();

      if (!gameRunning) {
        startGame(game.nextDirection);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameRunning, gameOver, startGame]);

  const statusMessage = gameRunning
    ? "방향키로 지렁이를 조작하세요!"
    : gameOver
      ? "다시 시작하려면 버튼을 누르세요."
      : "방향키를 눌러 게임을 시작하세요!";

  return {
    canvasRef,
    score,
    length,
    gameOver,
    finalScore,
    statusMessage,
    restartGame,
  };
}
