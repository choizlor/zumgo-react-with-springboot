package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.status LIKE '%ONSALE%' ORDER BY p.createdDate DESC")
    List<Product> findAllDesc();
}
