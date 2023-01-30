package com.isf6.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ChatRoom {

    @Id
    @GeneratedValue
    @Column(name="chatRoom_id")
    private Long id;


    // 구매자, 판매자 단반향 매핑?????
    @ManyToOne
    @JoinColumn(name="buyer_id")
    private User buyer;

    @ManyToOne
    @JoinColumn(name="seller_id")
    private User seller;
}
