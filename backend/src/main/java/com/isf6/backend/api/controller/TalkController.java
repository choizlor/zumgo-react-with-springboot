package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.ProductSaveRequestDto;
import com.isf6.backend.api.Request.ProductUpdateRequestDto;
import com.isf6.backend.domain.entity.Product;
import com.isf6.backend.domain.entity.User;
import com.isf6.backend.service.LiveRequestService;
import com.isf6.backend.service.LiveService;
import com.isf6.backend.service.ProductService;
import com.isf6.backend.service.UserService;
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
    private final UserService userService;
    private final LiveService liveService;

    @GetMapping("/userList")
    public List<User> LiveRequestUser(@RequestParam("productId") long productId) {
        return userService.getLiveRequestUser(productId);
    }

    @ApiOperation(value = "상품 예약시간 업데이트 및 알림톡 전송", notes = "상품을 등록을 위해 DB에 저장하고 정보를 반환")
    @PostMapping("/reserve/{id}")
    public ResponseEntity uploadProduct(@ApiParam(value = "상품 Id", required = true) @PathVariable Long id,
                                        @ApiParam(value = "상품 정보", required = true) @RequestBody ProductUpdateRequestDto requestDto) {
        //Map<String, Object> response = new HashMap<>(); //결과를 담을 Map

        //상품 예약시간을 업데이트 하고
        long productId = productService.update(id, requestDto);

        //해당 상품에 라이브 요청한 유저들 정보 가져오기
        List<User> liveRequestUser = userService.getLiveRequestUser(id);

        //알림톡 전송을 위해 정보 받아오기 -> 나중에 talkService으로 빼기 일단은 test 해보고,,,
        log.info("productName : {}", requestDto.getTitle());
        String productName = requestDto.getTitle();
        String reserveTime = requestDto.getReserve().toString().substring(0,16);
        String subject = "상품 라이브 예약 알림";
        Map<String, String> button = new HashMap<>();
        button.put("name", "zum:go 바로가기"); //버튼명
        button.put("linkType", "WL"); //버튼 링크타입(DS:배송조회, WL:웹링크, AL:앱링크, BK:봇키워드, MD:메시지전달)
        button.put("linkTypeName", "웹링크"); //버튼 링크 타입네임, ( 배송조회, 웹링크, 앱링크, 봇키워드, 메시지전달 중에서 1개)
        button.put("linkM", "https://i8c110.p.ssafy.io/"); //WL일때 필수
        button.put("linkP", "https://i8c110.p.ssafy.io/"); //WL일때 필수
        Map<String, Map> buttonInfo = new HashMap<>(); //버튼 정보
        buttonInfo.put("button", button);

        //전송 객체 생성
        RestTemplate rt = new RestTemplate();

        //header와 body 생성
        HttpHeaders headers = new HttpHeaders();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<String, Object>();
        body.add("apikey", "ivzxf96trcesudys8du2ib7pa3kizcij"); //api key
        body.add("userid", "gyeoul98"); //사이트 아이디
        //토큰 발급 받는 부분 만들기
        body.add("token", "25a4b79f6c3750feebbd262abca8419bd6dadde63ad8fe067f23acb44594d3c410b5adf1cc84c1eb0a9919e901ab6aca486081f204b97fb0f4b9a4b8033a4ccd40OR8Ezbtv2gNcWEWQT2Oo04rgFZWUPp0SoUL1j74q7DXl6zwMfeBzoGwxEGvqMv0zCvGBcu1BdmRRU1llYnew%3D%3D"); //발급받은 토큰
        body.add("senderkey", "aed29693a2cb5db41813209853bf64be349aead8"); //발신프로파일 키
        body.add("tpl_code", "TL_8062"); //템플릿 코드
        body.add("sender", "01076100034"); //발신자 연락처
        //여기서부터
        log.info("수신자 입력");
        int receiverSize = liveRequestUser.size();
        log.info("receiverSize : {}", receiverSize);
        for (int i=0; i<receiverSize; i++) {
            body.add("receiver_"+ (i+1), liveRequestUser.get(i).getKakaoPhoneNumber()); //수신자 연락처 -> 여기 수정 수신자 개수만큼
            body.add("subject_" + (i+1), subject); //알림톡 제목(나만 보임)
            body.add("message_" + (i+1), "이 알림톡은 '" + productName + "' 상품 라이브 요청자에게만 발송됩니다.\n" +
                    "\n" +
                    liveRequestUser.get(i).getKakaoNickname() + "님께서 요청하신 '" + productName + "' 라이브가 " + reserveTime + "에 예약 되었습니다."); //알림톡 내용
            log.info("message : {}", body.get("message_"+ (i+1)));
            body.add("button_" + i, buttonInfo); //버튼정보
        }
        //여기까지 반복문으로 liveRequestUser만큼 돌려야 될듯?
        body.add("testMode", "Y"); //테스트모드

        //전송 객체 생성
        HttpEntity<MultiValueMap<String, Object>> LiveReserveRequest = new HttpEntity<>(body);

        //post로 보내고 결과 받기
        ResponseEntity<String> LiveReserveResponse = rt.exchange(
                "https://kakaoapi.aligo.in/akv10/alimtalk/send/",
                HttpMethod.POST,
                LiveReserveRequest,
                String.class
        );

        //결과코드(code)가 0이면 성공 -99이면 전송 실패


        return ResponseEntity.ok().body(LiveReserveResponse);
    }


    @ApiOperation(value = "라이브 시작 및 알림톡 전송", notes = "DB에서 라이브 방의 상태를 시작으로 변경")
    @PatchMapping("/start/{productId}")
    public ResponseEntity startLive(@ApiParam(value = "상품 번호", required = true) @PathVariable long productId) {
        Map<String, Object> response = new HashMap<>();

        //라이브 방 시작 상태로 변경
        liveService.updateStatus(productId, "start");
        response.put("status", "ONAIR");
        response.put("result", "SUCCESS");


        //알림톡 전송
        //해당 상품에 라이브 요청한 유저들 정보 가져오기
        List<User> liveRequestUser = userService.getLiveRequestUser(productId);

        //상품 정보 가져오기
        Product product = productService.getProduct(productId);

        //알림톡 전송을 위해 정보 받아오기 -> 나중에 talkService으로 빼기 일단은 test 해보고,,,
        log.info("productName : {}", product.getTitle());
        String productName = product.getTitle();
        String reserveTime = product.getReserve().toString().substring(0,16);
        String subject = "라이브 시작 알림";
        Map<String, String> button = new HashMap<>();
        button.put("name", "zum:go 바로가기"); //버튼명
        button.put("linkType", "WL"); //버튼 링크타입(DS:배송조회, WL:웹링크, AL:앱링크, BK:봇키워드, MD:메시지전달)
        button.put("linkTypeName", "웹링크"); //버튼 링크 타입네임, ( 배송조회, 웹링크, 앱링크, 봇키워드, 메시지전달 중에서 1개)
        button.put("linkM", "https://i8c110.p.ssafy.io/"); //WL일때 필수
        button.put("linkP", "https://i8c110.p.ssafy.io/"); //WL일때 필수
        Map<String, Map> buttonInfo = new HashMap<>(); //버튼 정보
        buttonInfo.put("button", button);

        //전송 객체 생성
        RestTemplate rt = new RestTemplate();

        //header와 body 생성
        HttpHeaders headers = new HttpHeaders();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<String, Object>();
        body.add("apikey", "ivzxf96trcesudys8du2ib7pa3kizcij"); //api key
        body.add("userid", "gyeoul98"); //사이트 아이디
        //토큰 발급 받는 부분 만들기
        body.add("token", "25a4b79f6c3750feebbd262abca8419bd6dadde63ad8fe067f23acb44594d3c410b5adf1cc84c1eb0a9919e901ab6aca486081f204b97fb0f4b9a4b8033a4ccd40OR8Ezbtv2gNcWEWQT2Oo04rgFZWUPp0SoUL1j74q7DXl6zwMfeBzoGwxEGvqMv0zCvGBcu1BdmRRU1llYnew%3D%3D"); //발급받은 토큰
        body.add("senderkey", "aed29693a2cb5db41813209853bf64be349aead8"); //발신프로파일 키
        body.add("tpl_code", "TL_8079"); //템플릿 코드
        body.add("sender", "01076100034"); //발신자 연락처
        //여기서부터
        log.info("수신자 입력");
        int receiverSize = liveRequestUser.size();
        log.info("receiverSize : {}", receiverSize);
        for (int i=0; i<receiverSize; i++) {
            body.add("receiver_"+ (i+1), liveRequestUser.get(i).getKakaoPhoneNumber()); //수신자 연락처 -> 여기 수정 수신자 개수만큼
            body.add("subject_" + (i+1), subject); //알림톡 제목(나만 보임)
            body.add("message_" + (i+1), "이 알림톡은 '" + productName + "' 상품 라이브 요청자에게만 발송됩니다.\n" +
                    "\n" +
                    liveRequestUser.get(i).getKakaoNickname() + "님께서 요청하신 '" + productName+ "' 상품 라이브 방송이 시작 되었습니다!\n" +
                    "\n" +
                    "지금 zum:go 하세요!"); //알림톡 내용
            log.info("message : {}", body.get("message_"+ (i+1)));
            body.add("button_" + i, buttonInfo); //버튼정보
        }
        //여기까지 반복문으로 liveRequestUser만큼 돌려야 될듯?
        body.add("testMode", "Y"); //테스트모드

        //전송 객체 생성
        HttpEntity<MultiValueMap<String, Object>> LiveReserveRequest = new HttpEntity<>(body);

        //post로 보내고 결과 받기
        ResponseEntity<String> LiveReserveResponse = rt.exchange(
                "https://kakaoapi.aligo.in/akv10/alimtalk/send/",
                HttpMethod.POST,
                LiveReserveRequest,
                String.class
        );

        //결과코드(code)가 0이면 성공 -99이면 전송 실패
        response.put("messageResult", LiveReserveResponse);

        return ResponseEntity.status(200).body(response);
    }



}
