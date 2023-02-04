package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.ChatRoom;
import com.isf6.backend.domain.entity.User;
import lombok.Getter;

@Getter
public class ChatRoomInfoResDto {

    private Long roomId;
    private String chatRoomCode;
    private User buyer;
    private User seller;

    public ChatRoomInfoResDto(ChatRoom chatRoom) {
        roomId = chatRoom.getId();
        chatRoomCode = chatRoom.getChatRoomCode();
        buyer = chatRoom.getBuyer();
        seller = chatRoom.getSeller();
    }
}
