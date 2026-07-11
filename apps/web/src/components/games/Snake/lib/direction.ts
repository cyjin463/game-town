export function getDirectionFromKey(key: string): string | null {
  switch (key) {
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    default:
      return null;
  }
}

const CLOCKWISE: Record<string, string> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

export function rotateClockwise(direction: string): string {
  return CLOCKWISE[direction] ?? "right";
}
