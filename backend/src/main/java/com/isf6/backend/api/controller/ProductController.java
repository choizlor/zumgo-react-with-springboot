package com.isf6.backend.api.controller;

import com.isf6.backend.api.Response.ProductResponseDto;
import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.entity.Wish;
import com.isf6.backend.domain.repository.ProductRepository;
import com.isf6.backend.service.ProductService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    @PostMapping("/product")
    public Long save(@RequestBody ProductSaveRequestDto requestDto) {
        return productService.save(requestDto);
    }

    @PutMapping("/product/{id}")
    public Long update(@PathVariable Long id, @RequestBody ProductUpdateRequestDto requestDto) {
        return productService.update(id, requestDto);
    }

    @GetMapping("/product/{id}")
    public ProductResponseDto findById (@PathVariable Long id) {
        return productService.findById(id);
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
