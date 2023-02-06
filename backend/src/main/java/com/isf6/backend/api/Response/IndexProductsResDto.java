package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class IndexProductsResDto {

    private Long productId;
    private String title;
    private int price;
    private ProductStatus status;
    private LocalDateTime createdDate;
    private int wishSize;
    private int liveReqSize;

    public IndexProductsResDto() {

    }

    public IndexProductsResDto(Product product) {
        productId = product.getId();
        title = product.getTitle();
        price = product.getPrice();
        status = product.getStatus();
        createdDate = product.getCreatedDate();
        wishSize = product.getWishes().size();
        liveReqSize = product.getLiveRequests().size();
    }

}
