package com.gameportal.repository

import com.gameportal.entity.Score
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ScoreRepository : JpaRepository<Score, Long> {
    fun findAllByOrderByScoreDesc(): List<Score>
    fun findTop10ByOrderByScoreDesc(): List<Score>
}
