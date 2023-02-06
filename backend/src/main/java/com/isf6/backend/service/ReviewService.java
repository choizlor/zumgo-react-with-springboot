package com.isf6.backend.service;

import com.isf6.backend.api.Request.ReviewSaveReqDto;
import com.isf6.backend.api.Response.ReviewInfoResDto;
import com.isf6.backend.domain.entity.Bill;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.domain.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final BillRepository billRepository;
    private final ProductService productService;
    private final UserService userService;

    public Bill createReview(Long productId, ReviewSaveReqDto reviewSaveReqDto) {
        Bill bill = new Bill();

        Product product = productService.getProduct(productId);
        bill.setProduct(product);

        User seller = userService.findUser(reviewSaveReqDto.getSellerUserCode());
        seller.setPoint(seller.getPoint()+3);
        bill.setSeller(seller);

        User buyer = userService.findUser(reviewSaveReqDto.getBuyerUserCode());
        bill.setBuyer(buyer);

        bill.setReview(reviewSaveReqDto.getReview());

        billRepository.save(bill);

        return bill;
    }

    public List<ReviewInfoResDto> getMyReviewAll(Long userCode) {
        List<Bill> reviewList = new ArrayList<>();
        reviewList = billRepository.findByBuyerUserCode(userCode);
        log.info("review cnt : {}", reviewList.size());

        List<ReviewInfoResDto> result = reviewList.stream()
                .map(review -> new ReviewInfoResDto(review))
                .collect(Collectors.toList());
        return result;
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

    public boolean checkReview(Long productId) {
        //리뷰가 존재하면 true, 리뷰가 없으면 false
        Bill bill = getReviewByProductId(productId);
        if(bill != null) {
            return true;
        }
        return false;
    }

}