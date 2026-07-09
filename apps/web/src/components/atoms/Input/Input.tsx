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

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  label,
  required = false,
  className = "",
}) => {
  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <label className="mb-1 block text-sm font-bold text-gray-800">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20",
          error && "border-red-500"
        )}
        required={required}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </div>
  );
};
