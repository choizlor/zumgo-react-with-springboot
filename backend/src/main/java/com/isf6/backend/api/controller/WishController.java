package com.isf6.backend.api.controller;

import com.isf6.backend.service.ProductService;
import com.isf6.backend.service.UserService;
import com.isf6.backend.service.WishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/wish")
public class WishController {
    private final WishService wishService;
    private final UserService userService;
    private final ProductService productService;

    @PostMapping
    public ResponseEntity saveWish(@RequestParam("userCode") Long userCode, @RequestParam("productId") Long productId) {
        Map<String, Object> result = new HashMap<>();
        wishService.saveWish(userCode, productId);

        long cnt = wishService.getWishCnt(productId);
        result.put("wishCnt", cnt);
        result.put("wishCheck", true);

        return ResponseEntity.status(200).body(result);
    }


}
