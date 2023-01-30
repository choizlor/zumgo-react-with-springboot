package com.isf6.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name="products")

public class Product {

    @Id
    @GeneratedValue
    @Column(name="product_id")
    private Long id;

    private String title;

    private int price;

    private String description;

    private Timestamp reservation;

    private String photo;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private ProductStatus status; // INPROGRESS, SOLD

    @OneToOne(mappedBy = "product")
    private LiveRoom liveroom;

    @OneToMany(mappedBy = "product")
    private List<LiveRequest> liveRequests = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<Wish> wishes = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;
}