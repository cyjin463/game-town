package com.gameportal.controller

import com.gameportal.dto.AuthResponse
import com.gameportal.dto.LoginRequest
import com.gameportal.dto.RegisterRequest
import com.gameportal.service.JwtService
import com.gameportal.service.UserService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userService: UserService,
    private val jwtService: JwtService
) {

    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        return try {
            val user = userService.register(request)
            val token = jwtService.generateToken(user.username)
            
            ResponseEntity.ok(
                AuthResponse(
                    token = token,
                    username = user.username,
                    message = "회원가입이 완료되었습니다"
                )
            )
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(
                AuthResponse(
                    token = "",
                    username = "",
                    message = e.message ?: "회원가입에 실패했습니다"
                )
            )
        }
    }

    @GetMapping("/me")
    fun me(@AuthenticationPrincipal username: String): ResponseEntity<Map<String, String>> {
        return ResponseEntity.ok(mapOf("username" to username))
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        return try {
            val user = userService.authenticate(request)
            val token = jwtService.generateToken(user.username)
            
            ResponseEntity.ok(
                AuthResponse(
                    token = token,
                    username = user.username,
                    message = "로그인이 완료되었습니다"
                )
            )
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(
                AuthResponse(
                    token = "",
                    username = "",
                    message = e.message ?: "로그인에 실패했습니다"
                )
            )
        }
    }
} 