export interface AuthResponse {
  token: string;
  username: string;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  passwordHint: string;
}

export interface ScoreResponse {
  userId: number;
  username: string;
  score: number;
  rank: number;
}

export interface SubmitScoreRequest {
  username: string;
  score: number;
}

export interface ApiErrorBody {
  message?: string;
}
