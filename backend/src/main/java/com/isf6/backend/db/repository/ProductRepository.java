package com.isf6.backend.db.repository;

import com.isf6.backend.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
