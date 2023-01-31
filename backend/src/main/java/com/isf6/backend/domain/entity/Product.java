package com.isf6.backend.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name="products")
public class Product extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Long id;

    private String title;

    private int price;

    private String description;

    private String reservation;

    private String photo;

    @Enumerated(EnumType.STRING)
    private ProductStatus status; // ONSALE, BOOKING, SOLDOUT

    // 외래키는 어쩌지..?
    // Timestamp..?
    @Builder
    public Product(String title, int price, String description, String reservation, String photo, ProductStatus status) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.reservation = reservation;
        this.photo = photo;
        this.status = status;
    }

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToOne(mappedBy = "product")
    private LiveRoom liveroom;

    @OneToMany(mappedBy = "product")
    private List<LiveRequest> liveRequests = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<Wish> wishes = new ArrayList<>();

    @OneToOne(mappedBy = "product")
    private Bill bill;

    public void update(String title, int price, String description, String reservation, String photo, ProductStatus status) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.reservation = reservation;
        this.photo = photo;
        this.status = status;
    }
}