package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.ChatRoomSaveReqDto;
import com.isf6.backend.api.Response.ChatRoomResDto;
import com.isf6.backend.api.Request.MessageDto;
import com.isf6.backend.service.SocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/socket")
public class SocketController {

    @Autowired
    SocketService socketService;

    private static Set<Integer> userList = new HashSet<>();

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{id}")
    public void sendMessage(@DestinationVariable Integer id, @Payload MessageDto messageDto) {
        log.info("id={}", id);
        log.info("messageDto={}", messageDto);
//        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/" + id, messageDto);
        this.simpMessagingTemplate.convertAndSend("/sub/channels/" + id, messageDto);
    }

    @MessageMapping("/join")
    public void joinUser(@Payload Integer userId) {
        log.info("userId={}", userId);
        userList.add(userId);
        userList.forEach(System.out::println);
    }

    @PostMapping("/room")
    public String createChatRoom(@RequestBody ChatRoomSaveReqDto chatRoomSaveReqDto) {
        //log.info("방 생성");

        Long buyerCode = chatRoomSaveReqDto.getBuyerCode();
        Long sellerCode = chatRoomSaveReqDto.getSellerCode();
        String chatRoomCode = socketService.createRoom(buyerCode, sellerCode);

        return chatRoomCode;
    }

    @DeleteMapping("/exit")
    public ResponseEntity deleteChatRoom(@RequestBody String chatRoomCode) {
        socketService.deleteRoom(chatRoomCode);

        return ResponseEntity.status(200).body("방 삭제");
    }

}
