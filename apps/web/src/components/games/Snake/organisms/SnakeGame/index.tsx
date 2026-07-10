"use client";

import { useEffect, useRef } from "react";
import { SnakeCanvas } from "@/components/games/Snake/atoms/SnakeCanvas";
import { useSubmitScoreMutation, useMyScoreQuery } from "@/hooks/useScores";
import { useSnakeGame } from "@/components/games/Snake/hooks/useSnakeGame";
import {
  GameOverPanel,
  GameStats,
  GameStatusMessage,
} from "@/components/games/Snake/molecules";
import { useAuth } from "@/providers/AuthProvider";

export const SnakeGame = () => {
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
  const { isLoggedIn, isReady } = useAuth();
  const { data: myScore, isLoading: isMyScoreLoading } = useMyScoreQuery(
    isReady && isLoggedIn
  );

  useEffect(() => {
    if (
      !isReady ||
      !gameOver ||
      scoreSubmittedRef.current ||
      !isLoggedIn ||
      isMyScoreLoading
    ) {
      return;
    }

    const currentBest = myScore?.score;

    if (currentBest != null && finalScore <= currentBest) {
      scoreSubmittedRef.current = true;
      return;
    }

    scoreSubmittedRef.current = true;
    submitScoreMutation.mutate({ score: finalScore });
  }, [
    isReady,
    gameOver,
    isLoggedIn,
    isMyScoreLoading,
    myScore,
    finalScore,
    submitScoreMutation,
  ]);

  useEffect(() => {
    if (!gameOver) {
      scoreSubmittedRef.current = false;
    }
  }, [gameOver]);

  return (
    <div className="card relative w-full max-w-game p-4 text-center sm:p-6 xl:mx-auto xl:w-[70%]">
      <h1 className="heading-page mb-4">지렁이 게임</h1>
      <GameStats score={score} length={length} />
      <SnakeCanvas ref={canvasRef} />
      <GameStatusMessage message={statusMessage} />
      {gameOver && (
        <GameOverPanel
          finalScore={finalScore}
          onRestart={restartGame}
          loginRequired={!isLoggedIn}
        />
      )}
    </div>
  );
};
