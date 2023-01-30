package com.isf6.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class LiveBid {

    @Id
    @GeneratedValue
    @Column(name = "liveBid_id")
    private Long id;

    private String bidder;

    private int bid_price;

    private Timestamp bid_time;

    @ManyToOne
    @JoinColumn(name = "liveRoom_id")
    private LiveRoom liveRoom;
}
