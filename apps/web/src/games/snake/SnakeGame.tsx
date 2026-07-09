"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/atoms/Button";
import { useSubmitScoreMutation } from "@/hooks/useScores";
import { readCssVar, readSnakeRgb, tokenVar } from "@/lib/design-tokens";

interface Position {
  x: number;
  y: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SnakeGameProps {
  autoStart?: boolean;
  onExit?: () => void;
  username?: string;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({
  autoStart = false,
  onExit,
  username,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [length, setLength] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const submitScoreMutation = useSubmitScoreMutation();
  const scoreSubmittedRef = useRef(false);

  const gameRef = useRef({
    snake: [
      { x: 15, y: 15 },
      { x: 14, y: 15 },
      { x: 13, y: 15 },
      { x: 12, y: 15 },
      { x: 11, y: 15 },
    ] as Position[],
    direction: "right" as string,
    nextDirection: "right" as string,
    food: null as Position | null,
    obstacles: [] as Obstacle[],
    lastObstacleScore: 0,
    lastSpeedScore: 1,
    gameSpeed: 1000,
    baseGameSpeed: 1000,
    gridSize: 10,
    gridWidth: 30,
    gridHeight: 30,
    moveCounter: 0,
    moveInterval: 4, // 1단계: 4프레임마다 한 번씩 이동 (초당 15칸)
    currentScore: 0,
    lastMoveTime: 0,
    moveCount: 0,
    lastSpeedLogTime: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = gameRef.current;

    // 게임 루프 ID를 저장할 변수
    let gameLoopId: number | null = null;

    const generateFood = () => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * game.gridWidth),
          y: Math.floor(Math.random() * game.gridHeight),
        };
      } while (
        game.snake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        ) ||
        // 장애물과 겹치거나 장애물 근처에 생성되는지 확인
        game.obstacles.some((obstacle) => {
          // 장애물과 직접 겹치는지 확인
          if (
            newFood.x >= obstacle.x &&
            newFood.x < obstacle.x + obstacle.width &&
            newFood.y >= obstacle.y &&
            newFood.y < obstacle.y + obstacle.height
          ) {
            return true;
          }

          // 장애물 근처 1칸 이내에 생성되는지 확인
          const minX = Math.max(0, obstacle.x - 1);
          const maxX = Math.min(
            game.gridWidth - 1,
            obstacle.x + obstacle.width
          );
          const minY = Math.max(0, obstacle.y - 1);
          const maxY = Math.min(
            game.gridHeight - 1,
            obstacle.y + obstacle.height
          );

          return (
            newFood.x >= minX &&
            newFood.x <= maxX &&
            newFood.y >= minY &&
            newFood.y <= maxY
          );
        })
      );

      game.food = newFood;
    };

    const generateObstacle = () => {
      let obstacle: Obstacle;
      let attempts = 0;
      const maxAttempts = 50;

      // 장애물 크기 랜덤 선택 (1x1, 1x2, 1x3, 2x1, 2x2, 2x3, 3x1, 3x2, 3x3)
      const sizes = [
        { width: 1, height: 1 },
        { width: 1, height: 2 },
        { width: 1, height: 3 },
        { width: 2, height: 1 },
        { width: 2, height: 2 },
        { width: 2, height: 3 },
        { width: 3, height: 1 },
        { width: 3, height: 2 },
        { width: 3, height: 3 },
      ];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

      do {
        obstacle = {
          x: Math.floor(Math.random() * (game.gridWidth - randomSize.width)),
          y: Math.floor(Math.random() * (game.gridHeight - randomSize.height)),
          width: randomSize.width,
          height: randomSize.height,
        };
        attempts++;

        if (attempts > maxAttempts) return;
      } while (isObstaclePositionInvalid(obstacle));

      game.obstacles.push(obstacle);
    };

    const isObstaclePositionInvalid = (obstacle: Obstacle) => {
      for (let dx = 0; dx < obstacle.width; dx++) {
        for (let dy = 0; dy < obstacle.height; dy++) {
          const x = obstacle.x + dx;
          const y = obstacle.y + dy;

          if (
            game.snake.some((segment) => segment.x === x && segment.y === y)
          ) {
            return true;
          }
        }
      }

      return game.obstacles.some((existingObstacle) => {
        return (
          obstacle.x < existingObstacle.x + existingObstacle.width &&
          obstacle.x + obstacle.width > existingObstacle.x &&
          obstacle.y < existingObstacle.y + existingObstacle.height &&
          obstacle.y + obstacle.height > existingObstacle.y
        );
      });
    };

    const checkObstacleCollision = (head: Position) => {
      return game.obstacles.some(
        (obstacle) =>
          head.x >= obstacle.x &&
          head.x < obstacle.x + obstacle.width &&
          head.y >= obstacle.y &&
          head.y < obstacle.y + obstacle.height
      );
    };

    const checkObstacleGeneration = () => {
      const currentLevel = Math.floor(game.currentScore / 30);
      const lastLevel = Math.floor(game.lastObstacleScore / 30);

      if (currentLevel > lastLevel) {
        generateObstacle();
        game.lastObstacleScore = game.currentScore;
      }
    };

    const getSpeedLevel = (score: number): number => {
      if (score >= 300) return 5; // 5단계: 초당 20칸
      if (score >= 160) return 4; // 4단계: 초당 15칸
      if (score >= 110) return 3; // 3단계: 초당 10칸
      if (score >= 40) return 2; // 2단계: 초당 9칸
      return 1; // 1단계: 초당 8칸
    };

    const update = () => {
      // 이동 시간 추적
      const currentTime = Date.now();
      if (game.lastMoveTime === 0) {
        game.lastMoveTime = currentTime;
      }

      // 1초마다 속도 로그 출력
      if (currentTime - game.lastSpeedLogTime >= 1000) {
        const elapsedSeconds = (currentTime - game.lastMoveTime) / 1000;
        const movesPerSecond = game.moveCount / elapsedSeconds;
        const pixelsPerSecond = movesPerSecond * game.gridSize; // 한 칸 = 10픽셀

        // 로그 후 카운터 리셋
        game.lastSpeedLogTime = currentTime;
        game.lastMoveTime = currentTime;
        game.moveCount = 0;
      }

      game.direction = game.nextDirection;

      const head = { ...game.snake[0] };

      switch (game.direction) {
        case "up":
          head.y--;
          break;
        case "down":
          head.y++;
          break;
        case "left":
          head.x--;
          break;
        case "right":
          head.x++;
          break;
      }

      // 벽 충돌 체크
      if (
        head.x < 0 ||
        head.x >= game.gridWidth ||
        head.y < 0 ||
        head.y >= game.gridHeight
      ) {
        handleGameOver();
        return;
      }

      // 자기 자신과 충돌 체크
      if (
        game.snake.some(
          (segment) => segment.x === head.x && segment.y === head.y
        )
      ) {
        handleGameOver();
        return;
      }

      // 장애물 충돌 체크
      if (checkObstacleCollision(head)) {
        handleGameOver();
        return;
      }

      game.snake.unshift(head);
      game.moveCount++; // 지렁이가 실제로 이동한 후에 카운트 증가

      // 먹이 먹었는지 체크
      if (game.food && head.x === game.food.x && head.y === game.food.y) {
        const oldScore = game.currentScore;
        game.currentScore += 10;
        setScore(game.currentScore);
        setLength(game.snake.length + 1);
        generateFood();
        checkObstacleGeneration();

        // 속도 구간 경계를 넘었는지 확인
        const oldSpeedLevel = getSpeedLevel(oldScore);
        const newSpeedLevel = getSpeedLevel(game.currentScore);

        if (oldSpeedLevel !== newSpeedLevel) {
          // 속도 단계가 변경되었는지 확인
          if (newSpeedLevel !== game.lastSpeedScore) {
            const oldInterval = game.moveInterval;

            // 새로운 속도 설정
            switch (newSpeedLevel) {
              case 1: // 0-39점: 초당 15칸
                game.moveInterval = 4;
                break;
              case 2: // 40-109점: 초당 20칸
                game.moveInterval = 3;
                break;
              case 3: // 110-159점: 초당 24칸
                game.moveInterval = 2.5;
                break;
              case 4: // 160-299점: 초당 30칸
                game.moveInterval = 2;
                break;
              case 5: // 300점 이상: 초당 40칸
                game.moveInterval = 1.5;
                break;
            }

            game.lastSpeedScore = newSpeedLevel;

            // moveInterval이 변경되었을 때 moveCounter 리셋
            if (oldInterval !== game.moveInterval) {
              game.moveCounter = 0;
            }
          }
        }
      } else {
        game.snake.pop();
      }

      updateDisplay();
    };

    const updateDisplay = () => {
      const canvasBg = readCssVar(tokenVar.canvas);
      const gridLine = readCssVar(tokenVar.canvasGridLine);
      const obstacleColor = readCssVar(tokenVar.gameObstacle);
      const foodColor = readCssVar(tokenVar.gameFood);
      const [snakeR, snakeG, snakeB] = readSnakeRgb();

      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = gridLine;
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

      // 장애물 그리기
      game.obstacles.forEach((obstacle) => {
        ctx.fillStyle = obstacleColor;
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

      // 지렁이 그리기 (네모 + 그라데이션)
      game.snake.forEach((segment, index) => {
        // 색상 그라데이션 (머리는 어둡게, 꼬리는 밝게)
        const alpha = 1 - (index / game.snake.length) * 0.4;
        ctx.fillStyle = `rgba(${snakeR}, ${snakeG}, ${snakeB}, ${alpha})`;

        // 네모 모양으로 그리기
        ctx.fillRect(
          segment.x * game.gridSize + 1,
          segment.y * game.gridSize + 1,
          game.gridSize - 2,
          game.gridSize - 2
        );
      });

      // 먹이 그리기 (네모)
      if (game.food) {
        ctx.fillStyle = foodColor;
        ctx.fillRect(
          game.food.x * game.gridSize + 1,
          game.food.y * game.gridSize + 1,
          game.gridSize - 2,
          game.gridSize - 2
        );
      }
    };

    const handleGameOver = () => {
      setGameRunning(false);
      setFinalScore(gameRef.current.currentScore);
      setGameOver(true);
    };

    const gameLoop = () => {
      if (!gameRunning) return;

      game.moveCounter++;

      // moveInterval마다 한 번씩 이동
      if (game.moveCounter >= game.moveInterval) {
        update();
        game.moveCounter = 0;
      }

      // 항상 화면 업데이트
      updateDisplay();

      // 60fps로 실행 (약 16ms 간격)
      gameLoopId = requestAnimationFrame(gameLoop);
    };

    if (gameRunning) {
      gameLoop();
    } else {
      updateDisplay();
    }

    // cleanup 함수: useEffect가 다시 실행되거나 컴포넌트가 언마운트될 때 게임 루프 정리
    return () => {
      if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
      }
    };
  }, [gameRunning]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;

      e.preventDefault();

      const game = gameRef.current;

      switch (e.key) {
        case "ArrowUp":
          if (game.direction !== "down") {
            game.nextDirection = "up";
          }
          break;
        case "ArrowDown":
          if (game.direction !== "up") {
            game.nextDirection = "down";
          }
          break;
        case "ArrowLeft":
          if (game.direction !== "right") {
            game.nextDirection = "left";
          }
          break;
        case "ArrowRight":
          if (game.direction !== "left") {
            game.nextDirection = "right";
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameRunning]);

  const startGame = () => {
    scoreSubmittedRef.current = false;
    // 게임 상태 완전 초기화
    setGameRunning(false); // 먼저 게임 중지
    setScore(0);
    setLength(5);
    setGameOver(false);

    // 약간의 지연 후 게임 시작 (기존 루프 정리를 위해)
    setTimeout(() => {
      setGameRunning(true);

      const game = gameRef.current;

      // 모든 게임 데이터 완전 초기화
      game.snake = [
        { x: 15, y: 15 },
        { x: 14, y: 15 },
        { x: 13, y: 15 },
        { x: 12, y: 15 },
        { x: 11, y: 15 },
      ];

      // 방향 초기화
      game.direction = "right";
      game.nextDirection = "right";

      // 먹이 초기화
      game.food = null;

      // 장애물 완전 초기화
      game.obstacles = [];

      // 점수 관련 변수 초기화
      game.currentScore = 0;
      game.lastObstacleScore = 0;

      // 속도 관련 변수 완전 초기화
      game.lastSpeedScore = 1;
      game.gameSpeed = game.baseGameSpeed;
      game.moveCounter = 0;
      game.moveInterval = 4; // 초기 속도: 초당 15칸

      // 시간 측정 변수 초기화
      game.lastMoveTime = 0;
      game.moveCount = 0;
      game.lastSpeedLogTime = 0;

      // 새로운 먹이 생성
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * game.gridWidth),
          y: Math.floor(Math.random() * game.gridHeight),
        };
      } while (
        game.snake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      );

      game.food = newFood;
    }, 100); // 100ms 지연
  };

  const restartGame = () => {
    setGameOver(false);
    startGame();
  };

  useEffect(() => {
    if (autoStart) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!gameOver || !username || scoreSubmittedRef.current) return;

    scoreSubmittedRef.current = true;
    submitScoreMutation.mutate({ username, score: finalScore });
  }, [gameOver, username, finalScore, submitScoreMutation]);

  return (
    <div className="card w-full max-w-lg p-4 text-center sm:max-w-game sm:p-6">
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        {onExit && (
          <button type="button" onClick={onExit} className="btn-secondary-ghost">
            ← 돌아가기
          </button>
        )}
        <h1 className="heading-page flex-1">지렁이 게임</h1>
      </div>

      <div className="mb-4 flex justify-around gap-4">
        <div className="stat-badge">점수: {score}</div>
        <div className="stat-badge">길이: {length}</div>
      </div>

      <canvas ref={canvasRef} width={300} height={300} className="game-frame" />

      <div className="my-4">
        <p className="text-body mb-3">방향키로 지렁이를 조작하세요!</p>
        {!autoStart && (
          <Button onClick={startGame} disabled={gameRunning}>
            게임 시작
          </Button>
        )}
      </div>

      {gameOver && (
        <div className="overlay">
          <div className="overlay-panel">
            <h2 className="heading-danger mb-3">게임 오버!</h2>
            <p className="text-score mb-6">점수: {finalScore}</p>
            <div className="flex flex-row items-center gap-3">
              <Button onClick={restartGame} size="medium" className="w-[120px]">
                다시 시작
              </Button>
              {onExit && (
                <Button
                  onClick={onExit}
                  size="medium"
                  variant="secondary"
                  className="w-[120px]"
                >
                  돌아가기
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
