package com.gameportal.scheduler

import com.gameportal.service.ScoreService
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class ScoreResetScheduler(
    private val scoreService: ScoreService,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @Scheduled(cron = "0 0 0 * * MON", zone = "Asia/Seoul")
    fun resetWeeklyScores() {
        scoreService.resetAllScores()
        log.info("Weekly score reset completed (KST Monday 00:00)")
    }
}
