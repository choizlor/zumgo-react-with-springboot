package com.isf6.backend.api.Request;

import com.isf6.backend.domain.entity.ProductStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class ProductUpdateRequestDto {
    private String title;
    private int price;
    private String description;
    private String reservation;
    private String photo;
    private ProductStatus status; // ONSALE, BOOKING, SOLDOUT

    @Builder
    public ProductUpdateRequestDto(String title, int price, String description, String reservation, String photo, ProductStatus status) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.reservation = reservation;
        this.photo = photo;
        this.status = status;
    }
}

