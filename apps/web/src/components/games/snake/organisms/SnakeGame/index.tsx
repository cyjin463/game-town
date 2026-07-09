"use client";

import { useEffect, useRef } from "react";
import { GameCanvas } from "@/shared/atoms/GameCanvas";
import { useSubmitScoreMutation } from "@/hooks/useScores";
import { useSnakeGame } from "../../hooks/useSnakeGame";
import {
  GameOverPanel,
  GameStats,
  GameStatusMessage,
} from "../../molecules";
import { useAuth } from "@/hooks/useAuth";

export function SnakeGame() {
  const {
    canvasRef,
    score,
    length,
    gameOver,
    finalScore,
    statusMessage,
    restartGame,
  } = useSnakeGame();

  const submitScoreMutation = useSubmitScoreMutation();
  const scoreSubmittedRef = useRef(false);
  const { username } = useAuth();

  useEffect(() => {
    if (!gameOver || scoreSubmittedRef.current) return;

    scoreSubmittedRef.current = true;
    submitScoreMutation.mutate({ username, score: finalScore });
  }, [gameOver, username, finalScore, submitScoreMutation]);

  useEffect(() => {
    if (!gameOver) {
      scoreSubmittedRef.current = false;
    }
  }, [gameOver]);

  return (
    <div className="card relative w-full max-w-game p-4 text-center sm:p-6 xl:mx-auto xl:w-[70%]">
      <h1 className="heading-page mb-4">지렁이 게임</h1>
      <GameStats score={score} length={length} />
      <GameCanvas ref={canvasRef} />
      <GameStatusMessage message={statusMessage} />
      {gameOver && (
        <GameOverPanel
          finalScore={finalScore}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}
