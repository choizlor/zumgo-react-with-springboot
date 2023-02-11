package com.isf6.backend.domain.repository;

import com.isf6.backend.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // JPA findBy 규칙
    // select * from user_master where kakao_email = ?
    public User findByKakaoEmail(String kakaoEmail);
    public User findByUserCode(Long userCode);
    public Long countByKakaoNicknameStartingWith(String KakaoNickname);
    public boolean existsByKakaoNickname(String KakaoNickname);
}
