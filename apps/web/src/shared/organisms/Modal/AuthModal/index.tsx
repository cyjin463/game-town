"use client";

import React, { useEffect, useState } from "react";
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

  const {
    mutate: login,
    isPending: isLoginPending,
    error: loginError,
    reset: resetLogin,
  } = useLoginMutation();

  const {
    mutate: register,
    isPending: isRegisterPending,
    error: registerError,
    reset: resetRegister,
  } = useRegisterMutation();

  const isPending = isLoginPending || isRegisterPending;
  const submitError =
    mode === "login" ? loginError?.message : registerError?.message;

  useEffect(() => {
    if (!isOpen) {
      setMode("login");
      resetLogin();
      resetRegister();
    }
  }, [isOpen, resetLogin, resetRegister]);

  const handleSubmit = (data: AuthData) => {
    if (mode === "login") {
      login(
        { username: data.username, password: data.password },
        {
          onSuccess: (result) => {
            onLogin({ username: result.username, token: result.token });
            onClose();
          },
        }
      );
      return;
    }

    register(
      {
        username: data.username,
        password: data.password,
        passwordHint: data.passwordHint ?? "",
      },
      {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다!");
          resetRegister();
          setMode("login");
        },
      }
    );
  };

  const handleToggleMode = () => {
    resetLogin();
    resetRegister();
    setMode((current) => (current === "login" ? "register" : "login"));
  };

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="icon-button" onClick={onClose}>
          ×
        </button>
        <AuthForm
          key={mode}
          mode={mode}
          onSubmit={handleSubmit}
          onToggleMode={handleToggleMode}
          isPending={isPending}
          submitError={submitError}
        />
      </div>
    </div>
  );
};
