package com.isf6.backend.api.Response;

import com.isf6.backend.domain.entity.Img;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.ProductStatus;
import com.isf6.backend.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Data
@Getter
@AllArgsConstructor
public class ProductResponseDto {

    private Long id;
    private String title;
    private int price;
    private String description;
    private String availableTime;
    private Timestamp reserve;
    private List<String> imgUrlList;
    private ProductStatus status;
    private long userCode;
    private String kakaoNickname;
    private String kakaoProfileImg;
    private int wishSize;
    private int liveReqSize;
    private boolean wishCheck;
    private boolean liveReqCheck;

    public ProductResponseDto(Product entity, boolean wishCheck, boolean liveReqCheck, List<String> imgUrlList, User user) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.price = entity.getPrice();
        this.description = entity.getDescription();
        this.availableTime = entity.getAvailableTime();
        this.reserve = entity.getReserve();
        this.imgUrlList = imgUrlList;
        this.status = entity.getStatus();
        this.userCode = user.getUserCode();
        this.kakaoNickname = user.getKakaoNickname();
        this.kakaoProfileImg = user.getKakaoProfileImg();
        this.wishSize = entity.getWishes().size();
        this.liveReqSize = entity.getLiveRequests().size();
        this.wishCheck = wishCheck;
        this.liveReqCheck = liveReqCheck;
    }
}