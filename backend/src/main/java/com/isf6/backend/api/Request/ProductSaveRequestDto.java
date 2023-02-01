package com.isf6.backend.api.Request;

import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSaveRequestDto {

    @NotEmpty
    private String title;
    @NotEmpty
    private int price;
    private String description;
    private String reservation;
    private String photo;
    private ProductStatus status; // ONSALE, BOOKING, SOLDOUT
    private User user;

    //    @Builder
//    public ProductSaveRequestDto(String title, int price, String description, String reservation, String photo, ProductStatus status, User user) {
//        this.title = title;
//        this.price = price;
//        this.description = description;
//        this.reservation = reservation;
//        this.photo = photo;
//        this.status = status;
//        this.user = user;
//    }

    public Product toEntity() {
        return Product.builder()
                .title(title)
                .price(price)
                .description(description)
                .reservation(reservation)
                .photo(photo)
                .status(status)
                .user(user)
                .build();
    }
}
