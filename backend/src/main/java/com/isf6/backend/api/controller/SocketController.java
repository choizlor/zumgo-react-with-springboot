package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.ChatMessageSaveReqDto;
import com.isf6.backend.api.Request.ChatRoomSaveReqDto;
import com.isf6.backend.api.Request.MessageDto;
import com.isf6.backend.api.Response.ChatRoomInfoResDto;
import com.isf6.backend.domain.entity.Chat;
import com.isf6.backend.domain.entity.ChatRoom;
import com.isf6.backend.domain.repository.ChatRepository;
import com.isf6.backend.domain.repository.ChatRoomRepository;
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/socket")
public class SocketController {

    @Autowired
    SocketService socketService;

    private final ChatRoomRepository crr;
    private final ChatRepository cr;
    private static Set<Integer> userList = new HashSet<>();

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    // websocket "/pub/chat/{id}"로 들어오는 메시징을 처리 (메시지 발행)
    @MessageMapping("/chat/{id}")
    public void sendMessage(@DestinationVariable String id, @Payload MessageDto messageDto) {
        log.info("id={}", id);
        log.info("messageDto={}", messageDto);
//        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/" + id, messageDto);
//        socketService.sendMessage(messageDto);
        // 메시지에 정의된 channelId로 메시지 보냄
        this.simpMessagingTemplate.convertAndSend("/sub/channels/" + id, messageDto);
        // db 저장
        ChatRoom chatRoom = crr.findByChatRoomId(messageDto.getChannelId());
        ChatMessageSaveReqDto chatMessageSaveReqDto = new ChatMessageSaveReqDto(messageDto.getChannelId(), messageDto.getSender(), messageDto.getData());
        cr.save(Chat.toChat(chatMessageSaveReqDto, chatRoom));
        System.out.println(chatRoom);
    }

    @MessageMapping("/join")
    public void joinUser(@Payload String userId) {
        log.info("userId={}", userId);
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
        log.info("chatRoomCode : {}", chatRoomCode);
        String result = socketService.deleteRoom(chatRoomCode);
        if(result.equals("null")) {
            return ResponseEntity.status(200).body("방 삭제 실패");
        }
        return ResponseEntity.status(200).body("방 삭제");
    }

    @GetMapping("/{userCode}/all")
    public ResponseEntity getAllChatRoom(@PathVariable Long userCode) {
        List<ChatRoomInfoResDto> ChatRoomList = new ArrayList<>();
        ChatRoomList = socketService.getAllChatRoom(userCode);

        return ResponseEntity.status(200).body(ChatRoomList);
    }

}
