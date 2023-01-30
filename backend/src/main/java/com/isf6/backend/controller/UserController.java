package com.isf6.kakaologintest.controller;

import com.isf6.kakaologintest.model.oauth.OauthToken;
import com.isf6.kakaologintest.service.UserService;
import com.isf6.kakaologintest.model.User;
import com.isf6.kakaologintest.config.jwt.JwtProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService; //(2)

//    // 프론트에서 인가코드 받아오는 url - 1단계 단독 확인
//    @GetMapping("/oauth/token") // (3)
//    public OauthToken getLogin(@RequestParam("code") String code) { //(4)
//
//        // 넘어온 인가 코드를 통해 access_token 발급 //(5)
//        OauthToken oauthToken = userService.getAccessToken(code);
//
//        return oauthToken;
//    }

//    // 프론트에서 인가코드 받아오는 url - 2단계 단독 확인
//    @GetMapping("/oauth/token")
//    public String getLogin(@RequestParam("code") String code) {
//
//        // 넘어온 인가 코드를 통해 access_token 발급
//        OauthToken oauthToken = userService.getAccessToken(code);
//
//        //(1)
//        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장
//        String User = String.valueOf(userService.saveUser(oauthToken.getAccess_token()));
//
//        return User;
//    }

    // 프론트에서 인가코드 받아오는 url - 3단계, 4단계
    @GetMapping("/oauth/token")
    public ResponseEntity getLogin(@RequestParam("code") String code) { //(1)
        log.info("code : {} ", code);

        // 넘어온 인가 코드를 통해 access_token 발급
        OauthToken oauthToken = userService.getAccessToken(code);
        log.info("oauthToken : {} ", oauthToken);

        //(2)
        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장 후 JWT 를 생성
        String jwtToken = userService.saveUserAndGetToken(oauthToken.getAccess_token());
        log.info("jwtToken : {} ", jwtToken);

        //(3)
        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        log.info("headers : {} ", headers);

        //(4)
        return ResponseEntity.ok().headers(headers).body("success");
    }

    //4단계 추가
    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser(HttpServletRequest request) { //(1)

        //(2)
        User user = userService.getUser(request);

        //(3)
        return ResponseEntity.ok().body(user);
    }



}
