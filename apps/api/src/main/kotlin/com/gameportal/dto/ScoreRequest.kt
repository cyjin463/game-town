package com.gameportal.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull

data class SubmitScoreRequest(
    @field:NotNull(message = "점수는 필수입니다")
    @field:Min(0, message = "점수는 0 이상이어야 합니다")
    val score: Int,
)

data class ScoreResponse(
    val userId: Long,
    val username: String,
    val score: Int,
    val rank: Int,
)
