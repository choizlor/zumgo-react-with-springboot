package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.LiveRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveRoomRepository extends JpaRepository<LiveRoom, Long> {

    public LiveRoom findByProductId(long productId);

}
