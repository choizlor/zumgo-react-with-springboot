package com.isf6.backend.domain.product;

import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.repository.ProductRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;

    @After
    public void cleanup() {
        productRepository.deleteAll();
    }

    @Test
    public void 상품저장_불러오기() {
        //given
        String title = "상품명";
        int price = 10000;
        String description = "상품 설명글";
        Timestamp reservation = Timestamp.valueOf(LocalDateTime.now());
        String photo = "이미지 링크";

        productRepository.save(Product.builder()
                .title(title)
                .price(price)
                .description(description)
                .reservation(reservation)
                .photo(photo)
                .build());

        //when
        List<Product> productList = productRepository.findAll();

        //then
        Product product = productList.get(0);
        assertThat(product.getTitle()).isEqualTo(title);
        assertThat(product.getDescription()).isEqualTo(description);
        assertThat(product.getPrice()).isEqualTo(price);
        // assertThat(product.getReservation()).isEqualTo(reservation);
        assertThat(product.getPhoto()).isEqualTo(photo);
    }
}
