package com.isf6.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class TalkService {

    //알림톡 전송을 위한 token 발급
    public String createToken() throws JsonProcessingException, ParseException {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("apikey", "ivzxf96trcesudys8du2ib7pa3kizcij"); //api key
        params.add("userid", "gyeoul98"); //사이트 아이디
        HttpEntity<MultiValueMap<String, Object>> TokenRequest = new HttpEntity<>(params);

        //7일 동안 사용 가능한 엑세스 토큰을 발급 받기
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kakaoapi.aligo.in/akv10/token/create/7/d/",
                HttpMethod.POST,
                TokenRequest,
                String.class
        );

        String token = null;
        log.info("access : {}", accessTokenResponse.getBody());
        log.info("type : {}", accessTokenResponse.getBody().getClass().getName());

        Object obj = null;
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = new JSONObject();

        obj = jsonParser.parse(accessTokenResponse.getBody());
        jsonObj = (JSONObject) obj;

        log.info("jsonObj : {}", jsonObj);
        token = (String) jsonObj.get("urlencode");

        return token;
    }


}
