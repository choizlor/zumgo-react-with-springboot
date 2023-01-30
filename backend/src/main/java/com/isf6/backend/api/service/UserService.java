package com.isf6.backend.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.isf6.backend.common.oauth.KakaoProfile;
import com.isf6.backend.common.oauth.OauthToken;
import com.isf6.backend.config.jwt.JwtProperties;
import com.isf6.backend.db.repository.UserRepository;
import com.isf6.backend.db.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public OauthToken getAccessToken(String code) {

        //(2)
        RestTemplate rt = new RestTemplate();

        //(3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(4)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "b875d5c09e310962a4402f90c93aa19c");
        params.add("redirect_uri", "http://localhost:3000/oauth");
        params.add("code", code);
        params.add("client_secret", "QMJmsfyHMzlMcApqls4Txlhk7CrjE3LU"); // 생략 가능!

        //(5)
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //(6)
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        //(7)
        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken; //(8)
    }

    //(1-1) 2단계 유지
    public KakaoProfile findProfile(String token) {

        //(1-2)
        RestTemplate rt = new RestTemplate();

        //(1-3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token); //(1-4)
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(1-5)
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        //(1-6)
        // Http 요청 (POST 방식) 후, response 변수에 응답을 받음
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        //(1-7)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }

    //3단계 추가 유지
    public String saveUserAndGetToken(String token) { //(1)
        KakaoProfile profile = findProfile(token);

        User user = userRepository.findByKakaoEmail(profile.getKakao_account().getEmail());
        if(user == null) {
            user = User.builder()
                    .kakaoId(profile.getId())
                    .kakaoProfileImg(profile.getKakao_account().getProfile().getProfile_image_url())
                    .kakaoNickname(profile.getKakao_account().getProfile().getNickname())
                    .kakaoEmail(profile.getKakao_account().getEmail())
                    //.userRole("ROLE_USER")
                    .build();

            userRepository.save(user);
        }

        return createToken(user); //(2)
    }

    public String createToken(User user) { //(2-1)

        //(2-2)
        String jwtToken = JWT.create()

                //(2-3)
                .withSubject(user.getKakaoEmail())
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.EXPIRATION_TIME))

                //(2-4)
                .withClaim("id", user.getUserCode())
                .withClaim("nickname", user.getKakaoNickname())

                //(2-5)
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        return jwtToken; //(2-6)
    }

    //4단계
    public User getUser(HttpServletRequest request) { //(1)
        //(2)
        Long userCode = (Long) request.getAttribute("userCode");
        log.info("넘겨 받은 userCode : {}", userCode);

        //(3)
        User user = userRepository.findByUserCode(userCode);

        //(4)
        return user;
    }


}
