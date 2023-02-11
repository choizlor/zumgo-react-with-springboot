package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Chat;
import lombok.Data;

import java.util.List;

@Data
public class ChatInfoResDto {

    long chatRoomId;
    List<Chat> chatList;
    String buyerNickname;
    String sellerNickname;
    String buyerImg;
    String sellerImg;



}
