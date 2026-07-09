"use client";

import React, { useState } from "react";
import { Button } from "@/shared/atoms/Button";
import { Input } from "@/shared/atoms/Input";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: AuthData) => void;
  onToggleMode: () => void;
  loading?: boolean;
}

interface AuthData {
  username: string;
  password: string;
  confirmPassword?: string;
  passwordHint?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onToggleMode,
  loading = false,
}) => {
  const [formData, setFormData] = useState<AuthData>({
    username: "",
    password: "",
    confirmPassword: "",
    passwordHint: "",
  });

  const [errors, setErrors] = useState<Partial<AuthData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<AuthData> = {};

    if (!formData.username.trim()) {
      newErrors.username = "아이디를 입력해주세요";
    } else if (formData.username.length < 3) {
      newErrors.username = "아이디는 3자 이상이어야 합니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    if (mode === "register") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
      }

      if (!formData.passwordHint?.trim()) {
        newErrors.passwordHint = "비밀번호 힌트를 입력해주세요";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof AuthData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="card-form">
      <h2 className="heading-form">
        {mode === "login" ? "로그인" : "회원가입"}
      </h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="아이디"
          type="text"
          placeholder="아이디를 입력하세요"
          value={formData.username}
          onChange={(value) => handleInputChange("username", value)}
          error={errors.username}
          required
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          required
        />

        {mode === "register" && (
          <>
            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword || ""}
              onChange={(value) => handleInputChange("confirmPassword", value)}
              error={errors.confirmPassword}
              required
            />

            <Input
              label="비밀번호 힌트"
              type="text"
              placeholder="비밀번호를 잊어버렸을 때 도움이 될 힌트를 입력하세요"
              value={formData.passwordHint || ""}
              onChange={(value) => handleInputChange("passwordHint", value)}
              error={errors.passwordHint}
              required
            />
          </>
        )}

        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={loading}
          className="mt-2 w-full"
        >
          {loading ? "처리중..." : mode === "login" ? "로그인" : "회원가입"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-caption">
          {mode === "login" ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          <button type="button" onClick={onToggleMode} className="link-inline">
            {mode === "login" ? "회원가입" : "로그인"}
          </button>
        </p>
      </div>
    </div>
  );
};
