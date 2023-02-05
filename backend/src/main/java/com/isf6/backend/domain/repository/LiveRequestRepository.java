package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.LiveRequest;
import com.isf6.backend.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface LiveRequestRepository extends JpaRepository<LiveRequest, Object> {
    @Query("SELECT COUNT(*) FROM LiveRequest lr WHERE lr.product.id = :productId")
    Long getLiveRequestCnt(@Param("productId") long productId);

}
