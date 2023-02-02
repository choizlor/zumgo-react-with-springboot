package com.isf6.backend.service;

import com.isf6.backend.api.Request.ChatMessageRequest;
import com.isf6.backend.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChannelTopic channelTopic;
    private final RedisTemplate redisTemplate;


    // destination정보에서 roomId 추출
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
//        System.out.println(lastIndex);
        if (lastIndex != -1)
            return destination.substring(lastIndex+1);
        else
            return "";
    }

    // 채팅방 메시지 전송
    public void sendChatMessage(ChatMessageRequest chatMessageRequest, User user) {
        chatMessageRequest.setChatter(user.getKakaoNickname());
        redisTemplate.convertAndSend(channelTopic.getTopic(), chatMessageRequest);
    }

}
