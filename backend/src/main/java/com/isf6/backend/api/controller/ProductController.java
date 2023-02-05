package com.isf6.backend.api.controller;

import com.isf6.backend.api.Response.ProductResponseDto;
import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.repository.ProductRepository;
import com.isf6.backend.service.ProductService;
import com.isf6.backend.service.S3Service;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final S3Service s3Service;

//    @PostMapping("/product")
//    public Long save(@RequestBody ProductSaveRequestDto requestDto) {
//        return productService.save(requestDto);
//    }
//
//    @PostMapping("/product/images")
//    public Long uploadProduct(@RequestPart("imgUrl") List<MultipartFile> multipartFiles) {
//        List<String> imgPaths = s3Service.upload(multipartFiles);
//        System.out.println("IMG 경로들 : " + imgPaths);
//        productService.uploadImages(imgPaths);
//    }

    @PostMapping("/product")
    public Long uploadProduct(@RequestPart("content") ProductSaveRequestDto requestDto,
                              @RequestPart("imgUrl") List<MultipartFile> multipartFiles) {

//        if (multipartFiles == null) {
//            throw new PrivateException(Code.WRONG_INPUT_CONTENT);
//        }
        List<String> imgPaths = s3Service.upload(multipartFiles);
        System.out.println("IMG 경로들 : " + imgPaths);

        return productService.uploadProduct(requestDto, imgPaths);
    }

    @PutMapping("/product/{id}")
    public Long update(@PathVariable Long id, @RequestBody ProductUpdateRequestDto requestDto) {
        return productService.update(id, requestDto);
    }

    @GetMapping("/product/{id}")
    public ProductResponseDto findById (@PathVariable Long id, @RequestParam Long userCode) {
        return productService.findById(id, userCode);
    }

    @DeleteMapping("product/{id}")
    public Long delete(@PathVariable Long id) {
        productService.delete(id);
        return id;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("product", productService.findAllDesc());
        return "index";
    }

    @GetMapping("/products")
    public List<IndexProductsDto> mainProducts() {
        List<Product> products = productRepository.findAll();

        List<IndexProductsDto> result = products.stream()
                .map(p -> new IndexProductsDto(p))
                .collect(Collectors.toList());

        return result;
    }

    @GetMapping("/products/sellList/{id}")
    public List<IndexProductsDto> userSellList(@PathVariable Long id) {
        List<Product> products = productRepository.findSellUserCode(id);

        List<IndexProductsDto> result = products.stream()
                .map(p -> new IndexProductsDto(p))
                .collect(Collectors.toList());

        return result;
    }

    @GetMapping("/products/buyList/{id}")
    public List<IndexProductsDto> userBuyList(@PathVariable Long id) {
        List<Product> products = productRepository.findBuyUserCode(id);

        List<IndexProductsDto> result = products.stream()
                .map(p -> new IndexProductsDto(p))
                .collect(Collectors.toList());

        return result;
    }

    @GetMapping("/products/wishList/{id}")
    public List<IndexProductsDto> userWishList(@PathVariable Long id) {
        log.info("wishList");
        List<Product> products = productRepository.findWishUserCode(id);

        List<IndexProductsDto> result = products.stream()
                .map(p -> new IndexProductsDto(p))
                .collect(Collectors.toList());

        return result;
    }

    @Data
    static class IndexProductsDto {
        private Long productId;
        private String title;
        private int price;
        private ProductStatus status;
        private LocalDateTime createdDate;
        private int wishSize;
        private int liveReqSize;


        public IndexProductsDto(Product product) {
            productId = product.getId();
            title = product.getTitle();
            price = product.getPrice();
            status = product.getStatus();
            createdDate = product.getCreatedDate();
            wishSize = product.getWishes().size();
            liveReqSize = product.getLiveRequests().size();
        }
    }
}
