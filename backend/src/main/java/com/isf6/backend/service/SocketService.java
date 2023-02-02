package com.isf6.backend.service;

import com.isf6.backend.api.Response.ChatRoomResDto;
import com.isf6.backend.domain.entity.ChatRoom;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.domain.repository.ChatRoomRepository;
import com.isf6.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class SocketService {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserRepository userRepository;
    private Map<String, ChatRoomResDto> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    //방 생성해서 코드 저장해야됨
    public String createRoom(Long userCode1, Long userCode2) {
        //유저코드가 있으면 그 방의 코드 주고, 아니면 만들어서 주기
        ChatRoom chatRoom = new ChatRoom();
        try{
            chatRoom = chatRoomRepository.findByBuyerIdANDSellerId(userCode1, userCode2); //유저 코드로 방 정보 찾기
        } catch (Exception e) {
            e.printStackTrace();
            //방이 null이라면 방 만들기
            String randomId = UUID.randomUUID().toString();
            chatRoom.setChatRoomCode(randomId);

            User buyer = userRepository.findByUserCode(userCode1);
            chatRoom.setBuyer(buyer);

            User seller = userRepository.findByUserCode(userCode2);
            chatRoom.setSeller(seller);

            chatRoomRepository.save(chatRoom); //저장
        }

        String chatRoomCode = chatRoomRepository.findByChatRoomCode(chatRoom.getChatRoomCode()); //JPA 쿼리 물어보기,,,,

//        ChatRoomResDto chatRoom = ChatRoomResDto.builder()
//                .roomId(randomId)
//                .build();
//        chatRooms.put(randomId, chatRoom);
        return chatRoomCode;
    }

}
