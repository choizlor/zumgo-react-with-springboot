package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Bill;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.User;
import lombok.Getter;

@Getter
public class ReviewInfoResDto {
    private Long reviewId;
    private String review;
    private Product product;
    private User buyer;
    private User seller;

    public ReviewInfoResDto(Bill bill) {
        reviewId = bill.getId();
        review = bill.getReview();
        product = bill.getProduct();
        buyer = bill.getBuyer();
        seller = bill.getSeller();
    }


}
