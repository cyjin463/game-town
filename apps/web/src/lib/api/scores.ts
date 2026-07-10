import { apiFetch } from "./client";
import type { MyScoreResponse, ScoreResponse, SubmitScoreRequest } from "./types";

export function getLeaderboard() {
  return apiFetch<ScoreResponse[]>("/api/scores/leaderboard");
}

export function getMyScore() {
  return apiFetch<MyScoreResponse>("/api/scores/me");
}

export function submitScore(data: SubmitScoreRequest) {
  return apiFetch<ScoreResponse>("/api/scores", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
