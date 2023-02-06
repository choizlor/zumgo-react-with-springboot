package com.isf6.backend.service;

import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.api.Response.IndexProductsResDto;
import com.isf6.backend.api.Response.ProductListResponseDto;
import com.isf6.backend.api.Response.ProductResponseDto;
import com.isf6.backend.domain.entity.Img;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.repository.ImgRepository;
import com.isf6.backend.domain.repository.ProductRepository;
import com.isf6.backend.domain.repository.ProductSearchRepository;
import com.isf6.backend.domain.repository.custom.ProductRepositoryCustomImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductSearchRepository productSearchRepository;
    private final ImgRepository imgRepository;

    private final WishService wishService;
    private final LiveRequestService liveRequestService;

    private final ProductRepositoryCustomImpl productRepositoryCustomImpl;

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
                requestDto.getAvailableTime(),
                requestDto.getReserve(),
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

    public boolean checkProductStatus(Long productId) {
        //상품의 상태가 SOLDOUT이면 false, 아니라면 true
        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + productId));

        log.info("status : {}", product.getStatus());
        if(product.getStatus().equals(ProductStatus.SOLDOUT)) {
            return false;
        }

        return true;
    }
    
//    public Page<IndexProductsResDto> getMainProducts(String sort, String category, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return productRepositoryCustomImpl.findAllByCategoryOrderBySort(sort, category, pageable);
//    }

    //no-offset 방식
    public List<IndexProductsResDto> getMainProductsNo(Long productId, int pageSize) {
        return productRepositoryCustomImpl.findAllNoOffset(productId, pageSize);
    }

    //offset 방식
    public List<IndexProductsResDto> getMainProducts(int pageNo, int pageSize) {
        return productRepositoryCustomImpl.findAllOffSet(pageNo, pageSize);
    }

    // 문자열 포함한 상품 목록 검색
    public List<Product> findProducts(String productSearch) {
        return productSearchRepository.findBySearch(productSearch);
    }
}