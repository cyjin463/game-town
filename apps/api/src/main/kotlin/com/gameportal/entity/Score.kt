package com.gameportal.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "scores")
class Score(
    @Id
    @Column(name = "user_id")
    val userId: Long,

    @Column(nullable = false)
    var score: Int = 0,

    @Column(nullable = false)
    var rank: Int = 0,
)
