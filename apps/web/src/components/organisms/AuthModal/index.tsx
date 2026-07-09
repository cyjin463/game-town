"use client";

import React, { useState } from "react";
import { AuthForm } from "@/components/molecules";
import { useLoginMutation, useRegisterMutation } from "@/hooks/useAuthMutations";
import type { AuthSession } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (session: AuthSession) => void;
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
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleSubmit = async (data: AuthData) => {
    try {
      if (mode === "login") {
        const result = await loginMutation.mutateAsync({
          username: data.username,
          password: data.password,
        });
        onLogin({ username: result.username, token: result.token });
        onClose();
      } else {
        await registerMutation.mutateAsync({
          username: data.username,
          password: data.password,
          passwordHint: data.passwordHint ?? "",
        });
        alert("회원가입이 완료되었습니다!");
        setMode("login");
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "요청에 실패했습니다."
      );
    }
  };

  const handleToggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  if (!isOpen) return null;

  const loading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="icon-button" onClick={onClose}>
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
