package com.gameportal.entity

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @NotBlank(message = "아이디는 필수입니다")
    @Size(min = 3, max = 50, message = "아이디는 3자 이상 50자 이하여야 합니다")
    @Column(unique = true, nullable = false)
    val username: String,

    @NotBlank(message = "비밀번호는 필수입니다")
    @Size(min = 6, message = "비밀번호는 6자 이상이어야 합니다")
    @Column(nullable = false)
    val password: String,

    @NotBlank(message = "비밀번호 힌트는 필수입니다")
    @Column(nullable = false)
    val passwordHint: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at", nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now()
) 