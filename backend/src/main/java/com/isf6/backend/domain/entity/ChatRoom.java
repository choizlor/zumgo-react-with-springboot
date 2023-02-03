package com.isf6.backend.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chatRoom_id")
    private Long id;

    private String chatRoomCode;

    @JsonIgnore
    // 구매자, 판매자 단반향 매핑?????
    @ManyToOne
    @JoinColumn(name="buyer_id")
    private User buyer;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="seller_id")
    private User seller;

    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom")
    private List<Chat> chats = new ArrayList<>();
}
