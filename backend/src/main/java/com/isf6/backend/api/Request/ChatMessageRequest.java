package com.isf6.backend.api.Request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequest {
    private Long id;
    private String chat_content;
    private Timestamp chat_date;
    private String chatter;

    @Builder
    public ChatMessageRequest(Long id, String chat_content, Timestamp chat_date, String chatter) {
        this.id = id;
        this.chat_content = chat_content;
        this.chat_date = chat_date;
        this.chatter = chatter;
    }
}
