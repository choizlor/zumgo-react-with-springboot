package com.isf6.backend.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class LiveBid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liveBid_id")
    private Long id;

    private String bidder;

    private int bid_price;

    private Timestamp bid_time;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "liveRoom_id")
    private LiveRoom liveRoom;
}
