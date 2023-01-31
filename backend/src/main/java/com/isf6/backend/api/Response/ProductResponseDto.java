package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Product;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class ProductResponseDto {

    private Long id;
    private String title;
    private int price;
    private String description;
    private Timestamp reservation;
    private String photo;

    public ProductResponseDto(Product entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.price = entity.getPrice();
        this.description = entity.getDescription();
        this.reservation = entity.getReservation();
        this.photo = entity.getPhoto();
    }
}
