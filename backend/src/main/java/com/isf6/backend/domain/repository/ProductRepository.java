package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.status LIKE '%ONSALE%' ORDER BY p.createdDate DESC")
    List<Product> findAllDesc();

    @Query("select distinct p from Product p " +
            "join LiveRequest lr on lr.product.id = p.id " +
            "join User u on u.userCode = lr.user.userCode " +
            "where u.userCode = :userCode")
    List<Product> getMyLiveRequestList(@Param("userCode") long userCode);

    @Query("select p from Product p " +
            "join LiveRequest lr on lr.product.id = p.id " +
            "where p.status LIKE '%ONSALE%' and p.user.userCode = :userCode " +
            "group by p.id having count(*) >= 1")
    List<Product> getSellLiveRequestList(@Param("userCode") long userCode);

    @Query("SELECT p FROM Product p WHERE p.user.userCode = :id")
    List<Product> findSellUserCode(@Param("id") long id);

    @Query("SELECT p FROM Product p WHERE p.id = (SELECT b.product.id FROM Bill b WHERE b.buyer.userCode = :id)")
    List<Product> findBuyUserCode(@Param("id") long id);

    @Query("SELECT p FROM Product p WHERE p.id = (SELECT w.product.id FROM Wish w WHERE w.user.userCode = :id)")
    List<Product> findWishUserCode(@Param("id") long id);
}

