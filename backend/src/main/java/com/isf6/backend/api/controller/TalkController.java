package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.service.ProductService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApiResponses({
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(code = 400, message = "Bad Request"),
        @ApiResponse(code = 500, message = "Internal Server Error")
})
@Api(value = "/talk", description = "알림톡을 처리 하는 Controller")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/talk")
public class TalkController {

    private final ProductService productService;

    @ApiOperation(value = "상품 예약시간 업데이트 및 알림톡 전송", notes = "상품을 등록을 위해 DB에 저장하고 정보를 반환")
    @PostMapping("/api/v1/product")
    public ResponseEntity uploadProduct(@ApiParam(value = "상품 Id", required = true) @PathVariable Long id,
                                        @ApiParam(value = "상품 정보", required = true) @RequestBody ProductUpdateRequestDto requestDto) {
        Map<String, Object> response = new HashMap<>(); //결과를 담을 Map

        //상품 예약시간을 업데이트 하고
        long productId = productService.update(id, requestDto);

        //알림톡 전송 -> talkService에서 user 정보 받아온것처럼 post로 보내서
        String productName = requestDto.getTitle();
        Timestamp reserveTime = requestDto.getReserve();
        //받은 사람 userCode로 정보들 가져오기
        //String userName = requestDto.getUserName();

        RestTemplate rt = new RestTemplate();

        //버튼 정보
        Map<String, String> buttonInfo = new HashMap<>();
        //추가하기

        //header와 body 생성
        HttpHeaders headers = new HttpHeaders();
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<String, Object>();
        body.add("apikey", "ivzxf96trcesudys8du2ib7pa3kizcij"); //api key
        body.add("userid", "gyeoul98"); //사이트 아이디
        //토큰 발급 받는 부분 만들기
        body.add("token", "489f6bb9ce64a8c64d5a14e1388df42aa44189f713b38331971de3a575ffc699e921e47e58513403dcbbdaaeac97905ea4277b653889e6f9d9005e95812bb74ePiALdhMsuTjOfg11wSdoriRSuNOad4Ij4IKlqjgG3jQeaG811f5v0fvgEnJfsLw"); //발급받은 토큰
        body.add("senderkey", "aed29693a2cb5db41813209853bf64be349aead8"); //발신프로파일 키
        body.add("tpl_code", "TL_8062"); //템플릿 코드
        body.add("sender", "01076100034"); //발신자 연락처
        body.add("receiver_1", "01063677054"); //수신자 연락처 -> 여기 수정 수신자 개수만큼
        body.add("subject_1", "상품 라이브 예약 알림"); //알림톡 제목(나만 보임)
        body.add("message_1", "템플릿 내용과 동일하게 개행문자 추가해서 입력"); //알림톡 내용
        body.add("button_1", buttonInfo); //버튼정보
        body.add("testMode", "Y"); //테스트모드


        HttpEntity<MultiValueMap<String, Object>> LiveReserveRequest =
                new HttpEntity<>(body);

        ResponseEntity<String> LiveReserveResponse = rt.exchange(
                "https://kakaoapi.aligo.in/akv10/alimtalk/send/",
                HttpMethod.POST,
                LiveReserveRequest,
                String.class
        );


        return ResponseEntity.ok().body("seccess");
    }

}
