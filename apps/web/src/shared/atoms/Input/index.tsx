import React from "react";
import { cn } from "@/lib/cn";

interface InputProps {
  type?: "text" | "password" | "email";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export function Input ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  label,
  required = false,
  className = "",
}: InputProps) {
  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <label className="mb-1 block text-sm font-bold text-foreground">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md border border-line-strong px-3 py-2 text-sm transition-colors focus:border-line-focus focus:outline-none focus:ring-2 focus:ring-ring-focus",
          error && "border-line-danger"
        )}
        required={required}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </div>
  );
}
