package com.isf6.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isf6.backend.api.Request.ChatMessageRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber {
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    // Redis에서 메시지가 발행되면 대기하고 있던 Redis Subscriber가 해당 메시지를 받아 처리
    public void sendMessage(String publishMessage) {
        try {
            // Chat Message 객체로 맵핑 (JSON -> Java 객체 역직렬화)
            ChatMessageRequest chatMessage = objectMapper.readValue(publishMessage, ChatMessageRequest.class);
            // 채팅방을 구독한 클라이언트에게 메시지 발송
            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getId(), chatMessage);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}
