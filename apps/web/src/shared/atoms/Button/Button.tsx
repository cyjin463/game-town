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
    "border border-line-brand bg-gradient-to-br from-brand-600 to-brand-800 text-foreground-inverse hover:from-brand-500 hover:to-brand-700",
  secondary:
    "border border-line bg-gradient-to-br from-surface-muted to-surface-soft text-foreground-muted hover:from-surface hover:to-surface-muted hover:text-foreground-link",
  danger:
    "border border-line-focus bg-gradient-to-br from-foreground-subtle to-foreground-muted text-foreground-inverse hover:from-foreground-disabled hover:to-foreground-subtle",
};

const sizeClasses = {
  small: "rounded-lg px-4 py-2 text-sm",
  medium: "rounded-button px-6 py-3 text-base",
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
        "inline-block cursor-pointer border-none font-semibold tracking-wide shadow-md transition-all duration-normal hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-foreground-disabled disabled:shadow-sm disabled:hover:translate-y-0",
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
