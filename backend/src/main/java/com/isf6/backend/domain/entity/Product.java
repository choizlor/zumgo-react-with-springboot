package com.isf6.backend.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="products")
public class Product extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Long id;

    private String title;

    private int price;

    private String description;

    private String availableTime;

    private Timestamp reserve;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Img> imgList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ProductStatus status; // ONSALE, BOOKING, SOLDOUT

//    @Builder
//    public Product(String title, int price, String description, String availableTime, Timestamp reserve, List<Img> imgList, ProductStatus status) {
//        this.title = title;
//        this.price = price;
//        this.description = description;
//        this.availableTime = availableTime;
//        this.reserve = reserve;
//        this.imgList = imgList;
//        this.status = status;
//    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @JsonIgnore
    @OneToOne(mappedBy = "product", fetch = FetchType.LAZY)
    private LiveRoom liveroom;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<LiveRequest> liveRequests = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Wish> wishes = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "product", fetch = FetchType.LAZY)
    private Bill bill;

    public void update(String title, int price, String description, String availableTime, Timestamp reserve,  ProductStatus status) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.availableTime = availableTime;
        this.reserve = reserve;
        this.status = status;
    }
}