package com.gameportal.controller

import com.gameportal.dto.ScoreResponse
import com.gameportal.dto.SubmitScoreRequest
import com.gameportal.service.ScoreService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/scores")
class ScoreController(
    private val scoreService: ScoreService,
) {

    @PostMapping
    fun submitScore(@Valid @RequestBody request: SubmitScoreRequest): ResponseEntity<ScoreResponse> {
        return try {
            ResponseEntity.ok(scoreService.submitScore(request))
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/leaderboard")
    fun getLeaderboard(): ResponseEntity<List<ScoreResponse>> {
        return ResponseEntity.ok(scoreService.getLeaderboard())
    }
}
