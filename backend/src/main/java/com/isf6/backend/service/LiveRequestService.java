package com.isf6.backend.service;

import com.isf6.backend.domain.entity.LiveRequest;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.domain.repository.LiveRequestRepository;
import com.isf6.backend.domain.repository.ProductRepository;
import com.isf6.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
