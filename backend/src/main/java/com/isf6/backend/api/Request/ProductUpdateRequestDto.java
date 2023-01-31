package com.isf6.backend.api.Request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class ProductUpdateRequestDto {
    private String title;
    private int price;
    private String description;
    private Timestamp reservation;
    private String photo;

    @Builder
    public ProductUpdateRequestDto(String title, int price, String description, Timestamp reservation, String photo) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.reservation = reservation;
        this.photo = photo;
    }
}

