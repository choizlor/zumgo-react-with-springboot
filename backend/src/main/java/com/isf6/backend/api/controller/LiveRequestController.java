package com.isf6.backend.api.controller;

import com.isf6.backend.service.LiveRequestService;
import com.isf6.backend.service.ProductService;
import com.isf6.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/liveRequest")
public class LiveRequestController {

    private final LiveRequestService liveRequestService;
    private final UserService userService;
    private final ProductService productService;

    @PostMapping()
    public ResponseEntity productLiveRequest(@RequestParam("userCode") Long userCode, @RequestParam("productId") Long productId) {
        //userCode와 productId로 디비에 라이브 요청 생성
        liveRequestService.saveLiveRequest(userCode, productId);

        //라이브 요청 개수 리턴
        //long cnt = liveRequestService.getLiveRequestCnt(productId);

        return ResponseEntity.status(200).body("라이브 요청 성공");
    }



}
