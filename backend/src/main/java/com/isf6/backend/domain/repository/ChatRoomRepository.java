package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Object> {
    @Query("SELECT cr FROM ChatRoom cr WHERE (cr.seller.userCode = :userCode1 AND cr.buyer.userCode = :userCode2) OR (cr.seller.userCode = :userCode2 AND cr.buyer.userCode = :userCode1)")
    ChatRoom findByBuyerIdANDSellerId(@Param("userCode1") long userCode1, @Param("userCode2") long userCode2);

    String findByChatRoomCode(String chatRoomCode);

}
