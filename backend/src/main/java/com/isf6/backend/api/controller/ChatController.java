package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.ChatMessageRequest;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.service.ChatService;
import com.isf6.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@Controller
public class ChatController {
    private final ChatService chatService;
    private final UserService userService;

    // websocket "/pub/chat/message"로 들어오는 메시징을 처리
    @MessageMapping("/chat/message")
    public void message(ChatMessageRequest chatMessageRequest, @Header("AUTH") String token) {
        User user = userService.getUserToken(token);

        // Websocket에 발행된 메시지를 redis로 발행(publish)
        chatService.sendChatMessage(chatMessageRequest, user);
    }

}
