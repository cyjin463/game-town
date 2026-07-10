import React from "react";
import { cn } from "@/lib/cn";

interface GameCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  width?: number;
  height?: number;
}

export const SnakeCanvas = React.forwardRef<HTMLCanvasElement, GameCanvasProps>(({ width = 300, height = 300, className, ...props }, ref) => {
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className={cn("mx-auto my-4 block h-[300px] w-[300px] rounded-xl border-4 border-line-game bg-canvas shadow-lg", className)}
      {...props}
    />
  );
});

SnakeCanvas.displayName = "SnakeCanvas";

export default SnakeCanvas;