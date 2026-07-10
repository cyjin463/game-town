package com.gameportal.service

import com.gameportal.dto.LoginRequest
import com.gameportal.dto.RegisterRequest
import com.gameportal.entity.User
import com.gameportal.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {

    fun register(request: RegisterRequest): User {
        if (userRepository.existsByUsername(request.username)) {
            throw IllegalArgumentException("이미 존재하는 아이디입니다")
        }

        val encodedPassword = passwordEncoder.encode(request.password)
        val user = User(
            username = request.username,
            password = encodedPassword,
            passwordHint = request.passwordHint
        )

        return userRepository.save(user)
    }

    fun authenticate(request: LoginRequest): User {
        val user = userRepository.findByUsername(request.username)
            .orElseThrow { IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다") }

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다")
        }

        return user
    }
} 