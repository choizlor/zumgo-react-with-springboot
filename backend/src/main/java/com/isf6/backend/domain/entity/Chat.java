package com.isf6.backend.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chat_id")
    private Long id;

    private Timestamp chat_date;

    private String chat_content;

    private String chatter;

    @ManyToOne
    @JoinColumn(name="chatRoom_id")
    private ChatRoom chatRoom;
}
