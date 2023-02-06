package com.isf6.backend.api.Request;

import com.isf6.backend.domain.entity.Img;
import com.isf6.backend.domain.entity.ProductStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.sql.Timestamp;
import java.util.List;

@Getter
@NoArgsConstructor
public class ProductUpdateRequestDto {
    private String title;
    private int price;
    private String description;
    private String reservation;
//    private List<Img> imgList;
    private ProductStatus status; // ONSALE, BOOKING, SOLDOUT

    @Builder
    public ProductUpdateRequestDto(String title, int price, String description, String reservation, ProductStatus status) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.reservation = reservation;
//        this.imgList = imgList;
        this.status = status;
    }
}

