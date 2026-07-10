export type GamePreviewId = "snake" | "coming-soon";

export interface GameItem {
  id: string;
  title: string;
  href: string;
  features: string[];
  previewId: GamePreviewId;
}

export const GAMES: GameItem[] = [
  {
    id: "snake",
    title: "지렁이 게임",
    href: "/games/snake",
    features: [
      "🎮 방향키로 지렁이 조작",
      "🍎 먹이를 먹어서 성장",
      "🚧 점수에 따라 장애물 생성",
      "🔍 장애물을 피해서 생존",
    ],
    previewId: "snake",
  },
  {
    id: "coming-soon",
    title: "",
    href: "",
    features: [],
    previewId: "coming-soon",
  },
];
