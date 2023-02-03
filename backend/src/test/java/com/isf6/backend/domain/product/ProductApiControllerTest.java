package com.isf6.backend.domain.product;

import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.repository.ProductRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ProductRepository productRepository;

    @After
    public void tearDown() throws Exception {
        productRepository.deleteAll();
    }

    @Test
    public void Product_등록된다() throws Exception {
        //given
        String title = "상품명";
        int price = 10000;
        String description = "상품 설명글";
        String reservation = "예약시간";
        String photo = "이미지 링크";
        ProductStatus status = ProductStatus.ONSALE;

        ProductSaveRequestDto requestDto = ProductSaveRequestDto.builder()
                .title(title)
                .price(price)
                .description(description)
                .reservation(reservation)
                .photo(photo)
                .status(status)
                .build();

        String url = "http://localhost:" + port + "/product";

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);
        List<Product> all = productRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getDescription()).isEqualTo(description);
        assertThat(all.get(0).getPrice()).isEqualTo(price);
//      assertThat(all.get(0).getReservation()).isEqualTo(reservation);
        assertThat(all.get(0).getPhoto()).isEqualTo(photo);
        assertThat(all.get(0).getStatus()).isEqualTo(status);
    }

    @Test
    public void Product_수정된다() throws Exception {
        //given
        Product savedProduct = productRepository.save(Product.builder()
                .title("상품명")
                .price(10000)
                .description("상품 설명글")
                .reservation("예약시간")
                .photo("이미지 링크")
                .status(ProductStatus.ONSALE)
                .build());

        Long updateId = savedProduct.getId();
        String expectedTitle = "수정된 상품명";
        int expectedPrice = 20000;
        String expectedDescription = "수정된 상품 설명글";
        ProductStatus expectedStatus = ProductStatus.BOOKING;

        ProductUpdateRequestDto requestDto = ProductUpdateRequestDto.builder()
                .title(expectedTitle)
                .price(expectedPrice)
                .description(expectedDescription)
                .status(expectedStatus)
                .build();

        String url = "http://localhost:" + port + "/product/" + updateId;

        HttpEntity<ProductUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

        //when
        ResponseEntity<Long> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);
        List<Product> all = productRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(expectedTitle);
        assertThat(all.get(0).getPrice()).isEqualTo(expectedPrice);
        assertThat(all.get(0).getDescription()).isEqualTo(expectedDescription);
        assertThat(all.get(0).getStatus()).isEqualTo(expectedStatus);
    }
}
