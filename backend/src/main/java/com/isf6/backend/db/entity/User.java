package com.isf6.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_code")
    private Long userCode;

    @Column(name = "kakao_id")
    private Long kakaoId;

    @Column(name = "kakao_profile_img")
    private String kakaoProfileImg;

    @Column(name = "kakao_nickname")
    private String kakaoNickname;

    @Column(name = "kakao_email")
    private String kakaoEmail;

    private int point;

    @OneToMany(mappedBy = "user")
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserLive> userLives = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<LiveRequest> liveRequests = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Wish> wishes = new ArrayList<>();

    @Builder
    public User(Long kakaoId, String kakaoProfileImg, String kakaoNickname, String kakaoEmail, int point) {
        this.kakaoId = kakaoId;
        this.kakaoProfileImg = kakaoProfileImg;
        this.kakaoNickname = kakaoNickname;
        this.kakaoEmail = kakaoEmail;
        this.point = point;
    }

}
