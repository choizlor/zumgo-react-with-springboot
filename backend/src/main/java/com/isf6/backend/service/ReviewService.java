package com.isf6.backend.service;

import com.isf6.backend.api.Request.ReviewSaveReqDto;
import com.isf6.backend.domain.entity.Bill;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.domain.repository.BillRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ReviewService {

    @Autowired
    BillRepository billRepository;
    @Autowired
    ProductService productService;
    @Autowired
    UserService userService;

    public Bill createReview(Long productId, ReviewSaveReqDto reviewSaveReqDto) {
        Bill bill = new Bill();

        Product product = productService.getProduct(productId);
        bill.setProduct(product);

        User seller = userService.findUser(reviewSaveReqDto.getSellerUserCode());
        bill.setSeller(seller);

        User buyer = userService.findUser(reviewSaveReqDto.getBuyerUserCode());
        bill.setBuyer(buyer);

        bill.setReview(reviewSaveReqDto.getReview());

        billRepository.save(bill);

        return bill;
    }

    public List<Bill> getMyReviewAll(Long userCode) {
        List<Bill> reviewList = billRepository.findByBuyerUserCode(userCode);

        return reviewList;
    }

    public Bill getReviewByProductId(Long productId) {
        Bill bill = billRepository.findByProductId(productId);
        return bill;
    }

    public Bill updateReview(Long productId, ReviewSaveReqDto reviewSaveReqDto, Bill bill) {
        Product product = productService.getProduct(productId);
        bill.setProduct(product);

        User seller = userService.findUser(reviewSaveReqDto.getSellerUserCode());
        bill.setSeller(seller);

        User buyer = userService.findUser(reviewSaveReqDto.getBuyerUserCode());
        bill.setBuyer(buyer);

        bill.setReview(reviewSaveReqDto.getReview());

        billRepository.save(bill);

        return bill;
    }

    public void deleteReview(Long productId) {
        Bill bill = getReviewByProductId(productId);
        if(bill != null) {
            billRepository.delete(bill);
        }
    }

}
