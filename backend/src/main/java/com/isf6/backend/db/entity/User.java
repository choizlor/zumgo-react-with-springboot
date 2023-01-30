package com.isf6.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class User {
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String name;

    private String token;

    private String photo;

    private int point;

    @OneToMany(mappedBy = "user")
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserLive> userLives = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<LiveRequest> liveRequests = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Wish> wishes = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;

}
