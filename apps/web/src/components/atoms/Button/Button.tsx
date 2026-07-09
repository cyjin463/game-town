import React from "react";
import { cn } from "@/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses = {
  primary:
    "border border-zinc-600 bg-gradient-to-br from-zinc-600 to-zinc-800 text-white hover:from-zinc-500 hover:to-zinc-700",
  secondary:
    "border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-700 hover:from-white hover:to-gray-50 hover:text-gray-900",
  danger:
    "border border-gray-600 bg-gradient-to-br from-gray-500 to-gray-700 text-white hover:from-gray-400 hover:to-gray-600",
};

const sizeClasses = {
  small: "rounded-lg px-4 py-2 text-sm",
  medium: "rounded-[10px] px-6 py-3 text-base",
  large: "rounded-xl px-8 py-4 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-block cursor-pointer border-none font-semibold tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-sm disabled:hover:translate-y-0",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
