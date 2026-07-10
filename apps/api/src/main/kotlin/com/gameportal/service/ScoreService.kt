package com.gameportal.service

import com.gameportal.dto.ScoreResponse
import com.gameportal.entity.Score
import com.gameportal.repository.ScoreRepository
import com.gameportal.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ScoreService(
    private val scoreRepository: ScoreRepository,
    private val userRepository: UserRepository,
) {

    @Transactional
    fun submitScore(username: String, score: Int): ScoreResponse {
        val user = userRepository.findByUsername(username)
            .orElseThrow { IllegalArgumentException("존재하지 않는 사용자입니다") }

        val userId = user.id ?: throw IllegalStateException("사용자 ID가 없습니다")

        val existing = scoreRepository.findById(userId)
        if (existing.isPresent) {
            val existingScore = existing.get()
            if (score <= existingScore.score) {
                return toResponse(existingScore, user.username)
            }
            existingScore.score = score
        } else {
            scoreRepository.save(Score(userId = userId, score = score))
        }

        recalculateRanks()

        val saved = scoreRepository.findById(userId).orElseThrow()
        return toResponse(saved, user.username)
    }

    fun getLeaderboard(): List<ScoreResponse> {
        return scoreRepository.findAllByOrderByScoreDesc().map { score ->
            val username = userRepository.findById(score.userId)
                .map { it.username }
                .orElse("unknown")
            toResponse(score, username)
        }
    }

    @Transactional
    fun resetAllScores() {
        scoreRepository.deleteAllInBatch()
    }

    private fun recalculateRanks() {
        scoreRepository.findAllByOrderByScoreDesc().forEachIndexed { index, score ->
            score.rank = index + 1
        }
    }

    private fun toResponse(score: Score, username: String): ScoreResponse {
        return ScoreResponse(
            userId = score.userId,
            username = username,
            score = score.score,
            rank = score.rank,
        )
    }
}
