package com.isf6.backend.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="report_id")
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name="reporter_id")
    private User reporter;

    @ManyToOne
    @JoinColumn(name="reported_id")
    private User reported;
}
