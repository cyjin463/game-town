"use client";

import React, { useState } from "react";
import { AuthForm } from "@/components/molecules";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

interface AuthData {
  username: string;
  password: string;
  confirmPassword?: string;
  passwordHint?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: AuthData) => {
    setLoading(true);
    try {
      if (mode === "login") {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        });

        if (response.ok) {
          onLogin(data.username);
          onClose();
        } else {
          const error = await response.json();
          alert(error.message || "로그인에 실패했습니다.");
        }
      } else {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
            passwordHint: data.passwordHint,
          }),
        });

        if (response.ok) {
          alert("회원가입이 완료되었습니다!");
          setMode("login");
        } else {
          const error = await response.json();
          alert(error.message || "회원가입에 실패했습니다.");
        }
      }
    } catch {
      alert("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent text-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          onToggleMode={handleToggleMode}
          loading={loading}
        />
      </div>
    </div>
  );
};
