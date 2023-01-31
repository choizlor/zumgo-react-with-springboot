package com.isf6.backend.domain.product;

import com.isf6.backend.api.ProductSaveRequestDto;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.repository.ProductRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
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
        Timestamp reservation = Timestamp.valueOf(LocalDateTime.now());
        String photo = "이미지 링크";

        ProductSaveRequestDto requestDto = ProductSaveRequestDto.builder()
                .title(title)
                .price(price)
                .description(description)
                .reservation(reservation)
                .photo(photo)
                .build();

        String url = "http://localhost:" + port + "/product";

        //when0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);
        List<Product> all = productRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getDescription()).isEqualTo(description);
        assertThat(all.get(0).getPrice()).isEqualTo(price);
        // assertThat(all.get(0).getReservation()).isEqualTo(reservation);
        assertThat(all.get(0).getPhoto()).isEqualTo(photo);
    }
}
