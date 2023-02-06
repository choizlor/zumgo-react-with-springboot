package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WishRepository extends JpaRepository<Wish, Object> {

    @Query("SELECT COUNT(*) FROM Wish w WHERE w.product.id = :productId")
    Long getWishCnt(@Param("productId") long productId);

    @Query("SELECT w FROM Wish w WHERE w.product.id = :productId")
    Wish findByProductId(@Param("productId") long productId);
    
    @Query("SELECT w FROM Wish w WHERE w.product.id = :productId and w.user.userCode = :userCode")
    Wish getWish(@Param("productId") long productId, @Param("userCode") long userCode);
}
