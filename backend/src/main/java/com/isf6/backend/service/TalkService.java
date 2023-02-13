package com.isf6.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.isf6.backend.common.oauth.OauthToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Service
public class TalkService {

    //알림톡 전송을 위한 token 발급
    public String createToken() {
        RestTemplate rt = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("apikey", "ivzxf96trcesudys8du2ib7pa3kizcij");
        params.add("userid", "gyeoul98");

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params);

        //7일 동안 사용 가능한 엑세스 토큰을 발급 받기
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kakaoapi.aligo.in/akv10/token/create/7/d/",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        //5.
        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken.getAccess_token();
    }

}
