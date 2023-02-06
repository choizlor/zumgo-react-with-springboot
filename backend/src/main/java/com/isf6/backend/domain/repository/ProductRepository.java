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

    @Query("SELECT p FROM Product p WHERE p.user.userCode = :id")
    List<Product> findSellUserCode(@Param("id") long id);

    @Query("SELECT p FROM Product p WHERE p.id = (SELECT b.product.id FROM Bill b WHERE b.buyer.userCode = :id)")
    List<Product> findBuyUserCode(@Param("id") long id);

    @Query("SELECT p FROM Product p WHERE p.id = (SELECT w.product.id FROM Wish w WHERE w.user.userCode = :id)")
    List<Product> findWishUserCode(@Param("id") long id);
}
