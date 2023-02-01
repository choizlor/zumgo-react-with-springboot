package com.isf6.backend.api.Request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
public class ChatRoomRequest {
    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;
    private String name;

    public static ChatRoomRequest create(String name) {
        ChatRoomRequest chatRoomRequest = new ChatRoomRequest();
        chatRoomRequest.roomId = UUID.randomUUID().toString();
        chatRoomRequest.name = name;
        return chatRoomRequest;
    }

}
