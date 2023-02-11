package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Chat;
import lombok.Data;

import java.util.List;

@Data
public class ChatInfoResDto {

    private long chatRoomId;
    private List<Chat> chatList;
    private String buyerNickname;
    private String sellerNickname;
    private String buyerImg;
    private String sellerImg;



}
