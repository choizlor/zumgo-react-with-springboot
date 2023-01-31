package com.isf6.backend.api.Request;

import com.isf6.backend.domain.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class ProductSaveRequestDto {
    private String title;
    private int price;
    private String description;
    private Timestamp reservation;
    private String photo;

    @Builder
    public ProductSaveRequestDto(String title, int price, String description, Timestamp reservation, String photo) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.reservation = reservation;
        this.photo = photo;
    }

    public Product toEntity() {
        return Product.builder()
                .title(title)
                .price(price)
                .description(description)
                .reservation(reservation)
                .photo(photo)
                .build();
    }
}
