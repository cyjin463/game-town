package com.gameportal.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class LoginRequest(
    @field:NotBlank(message = "아이디는 필수입니다")
    val username: String,

    @field:NotBlank(message = "비밀번호는 필수입니다")
    val password: String
)

data class RegisterRequest(
    @field:NotBlank(message = "아이디는 필수입니다")
    @field:Size(min = 3, max = 50, message = "아이디는 3자 이상 50자 이하여야 합니다")
    val username: String,

    @field:NotBlank(message = "비밀번호는 필수입니다")
    @field:Size(min = 6, message = "비밀번호는 6자 이상이어야 합니다")
    val password: String,

    @field:NotBlank(message = "비밀번호 힌트는 필수입니다")
    val passwordHint: String
)

data class AuthResponse(
    val token: String,
    val username: String,
    val message: String
) 