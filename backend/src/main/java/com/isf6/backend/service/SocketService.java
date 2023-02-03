package com.isf6.backend.service;

import com.isf6.backend.domain.entity.ChatRoom;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.domain.repository.ChatRoomRepository;
import com.isf6.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class SocketService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

//    private Map<String, ChatRoomResDto> chatRooms;
//
//    @PostConstruct
//    private void init() {
//        chatRooms = new LinkedHashMap<>();
//    }

    //방 생성해서 코드 저장해야됨
    public String createRoom(Long userCode1, Long userCode2) {
        //유저코드가 있으면 그 방의 코드 주고, 아니면 만들어서 주기
        ChatRoom chatRoomInfo = new ChatRoom();
        chatRoomInfo = chatRoomRepository.findByBuyerIdANDSellerId(userCode1, userCode2); //유저 코드로 방 정보 찾기

        if(chatRoomInfo == null) {
            //방이 null이라면 방 만들기
            chatRoomInfo = new ChatRoom();
            String randomId = UUID.randomUUID().toString();
            chatRoomInfo.setChatRoomCode(randomId);

            User buyer = userRepository.findByUserCode(userCode1);
            chatRoomInfo.setBuyer(buyer);

            User seller = userRepository.findByUserCode(userCode2);
            chatRoomInfo.setSeller(seller);

            chatRoomRepository.save(chatRoomInfo); //저장
        }

        //log.info("chatRoom id : {}", chatRoomInfo.getId());
        String chatRoomCode = chatRoomInfo.getChatRoomCode();

//        ChatRoomResDto chatRoom = ChatRoomResDto.builder()
//                .roomId(randomId)
//                .build();
//        chatRooms.put(randomId, chatRoom);
        return chatRoomCode;
    }

    public void deleteRoom(String chatRoomCode) {
        chatRoomRepository.findByChatRoomCode(chatRoomCode);
    }

}
