package com.isf6.backend.service;

import com.isf6.backend.api.Response.ProductListResponseDto;
import com.isf6.backend.api.Response.ProductResponseDto;
import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.domain.entity.Img;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.entity.Wish;
import com.isf6.backend.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ImgRepository imgRepository;
    private final S3Service s3Service;
    private final WishService wishService;
    private final LiveRequestService liveRequestService;

//
//    @Transactional
//    public Long save(ProductSaveRequestDto requestDto)
//    {
//        return productRepository.save(requestDto.toEntity()).getId();
//    }

    @Transactional
    public Long uploadProduct(ProductSaveRequestDto requestDto, List<String> imgPaths) {
        postBlankCheck(imgPaths);

        Long id = productRepository.save(requestDto.toEntity()).getId();
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + id));
        List<String> imgList = new ArrayList<>();
        for (String imgUrl : imgPaths) {
            Img img = new Img(imgUrl, product);
            imgRepository.save(img);
            imgList.add(img.getImgUrl());
        }
        return id;
    }

    private void postBlankCheck(List<String> imgPaths) {
        if(imgPaths == null || imgPaths.isEmpty()){ //.isEmpty()도 되는지 확인해보기
//            throw new PrivateException(Code.WRONG_INPUT_IMAGE);
        }
    }

    @Transactional
    public Long update(Long id, ProductUpdateRequestDto requestDto) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + id));
        product.update(
                requestDto.getTitle(),
                requestDto.getPrice(),
                requestDto.getDescription(),
                requestDto.getReservation(),
                requestDto.getImgList(),
                requestDto.getStatus());

        return id;
    }
    public ProductResponseDto findById (Long id, Long userCode) {
        Product entity = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + id));

        //라이브 요청 여부, 좋아요 여부 체크하여 포함해서 상세페이지로 전달
        //지금 들어오는 유저가 이 상품에 좋아요를 눌렀는지...
        boolean wishCheck = wishService.getUserWishChk(id, userCode);
        //지금 들어오는 유저가 이 상품에 라이브 요청을 했는지...
        boolean liveReqCheck = liveRequestService.getUserLiveReqChk(id, userCode);

        return new ProductResponseDto(entity, wishCheck, liveReqCheck);
    }

    @Transactional
    public void delete (Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + id));

        productRepository.delete(product);
    }

    @Transactional(readOnly = true)
    public List<ProductListResponseDto> findAllDesc() {
        return productRepository.findAllDesc().stream()
                .map(product -> new ProductListResponseDto(product))
                .collect(Collectors.toList());
    }

    @Transactional
    public Product getProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + id));

        return product;
    }


}