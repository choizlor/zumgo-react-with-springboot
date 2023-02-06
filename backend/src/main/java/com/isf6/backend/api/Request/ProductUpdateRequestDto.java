package com.isf6.backend.api.Request;

import com.isf6.backend.domain.entity.Img;
import com.isf6.backend.domain.entity.ProductStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Getter
@NoArgsConstructor
public class ProductUpdateRequestDto {
    private String title;
    private int price;
    private String description;
    private String availableTime;
    private Timestamp reserve;
    private ProductStatus status; // ONSALE, BOOKING, SOLDOUT

    @Builder
    public ProductUpdateRequestDto(String title, int price, String description, String availableTime, Timestamp reserve, ProductStatus status) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.availableTime = availableTime;
        this.reserve = reserve;
        this.status = status;
    }
}

