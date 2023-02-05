package com.isf6.backend.service;

import com.isf6.backend.domain.entity.LiveRequest;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.domain.repository.LiveRequestRepository;
import com.isf6.backend.domain.repository.ProductRepository;
import com.isf6.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class LiveRequestService {

    private final LiveRequestRepository liveRequestRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void saveLiveRequest(Long userCode, Long productId) {
        LiveRequest liveRequest = new LiveRequest();

        User user = userRepository.findByUserCode(userCode);
        user.setPoint(user.getPoint()-3);
        liveRequest.setUser(user);

        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + productId));
        liveRequest.setProduct(product);

        liveRequestRepository.save(liveRequest);
    }

    public Long getLiveRequestCnt(Long productId) {
        Long cnt = 0L;
        //라이브요청 개수 반환
        cnt = liveRequestRepository.getLiveRequestCnt(productId);

        return cnt;
    }

    //내가 라이브 요청한 상품들의 목록
    public List<Product> getMyLiveRequestList(Long userCode) {
        log.info("getMyLiveRequestList : true ");
        List<Product> liveRequestList = new ArrayList<>();
        liveRequestList = productRepository.getMyLiveRequestList(userCode);

        return liveRequestList;
    }

    //내가 판매중인 상품 중에서 라이브요청의 개수가 1개 이상인 상품의 목록
    public List<Product> getSellLiveRequestList(Long userCode) {
        log.info("getSellLiveRequestList : true ");
        List<Product> liveRequestList = new ArrayList<>();
        liveRequestList = productRepository.getSellLiveRequestList(userCode);
        log.info("size : {}", liveRequestList.size());

        return liveRequestList;
    }

}
