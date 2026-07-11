import React from "react";
import { cn } from "@/lib/cn";

interface SnakeCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  width?: number;
  height?: number;
}

export const SnakeCanvas = React.forwardRef<HTMLCanvasElement, SnakeCanvasProps>(
  ({ width = 300, height = 300, className, ...props }, ref) => (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className={cn(
        "mx-auto my-4 block h-[300px] w-[300px] touch-none rounded-xl border-4 border-line-game bg-canvas shadow-lg",
        className
      )}
      {...props}
    />
  )
);

SnakeCanvas.displayName = "SnakeCanvas";
