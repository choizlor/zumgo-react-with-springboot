package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.Optional;

@Getter
public class ProductResponseDto {

    private Long id;
    private String title;
    private int price;
    private String description;
    private String reservation;
    private String photo;
    private ProductStatus status;

    public ProductResponseDto(Product entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.price = entity.getPrice();
        this.description = entity.getDescription();
        this.reservation = entity.getReservation();
        this.photo = entity.getPhoto();
        this.status = entity.getStatus();
    }
}
