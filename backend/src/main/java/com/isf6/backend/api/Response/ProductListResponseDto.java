package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Product;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProductListResponseDto {

    private Long id;
    private String title;
    private int price;
    private LocalDateTime createdDate;

    public ProductListResponseDto(Product entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.price = entity.getPrice();
        this.createdDate = entity.getCreatedDate();
    }
}
