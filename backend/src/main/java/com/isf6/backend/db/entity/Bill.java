package com.isf6.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Bill {
    @Id
    @GeneratedValue
    @Column(name="bill_id")
    private Long id;

    private String review;

    @OneToOne(mappedBy = "bill")
    private Product product;

    @OneToOne(mappedBy = "bill")
    private User buyer;

    @OneToOne(mappedBy = "bill")
    private User seller;
}
