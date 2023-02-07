package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.ReportSaveReqDto;
import com.isf6.backend.api.Request.UserUpdateReqDto;
import com.isf6.backend.api.Response.UserResDto;
import com.isf6.backend.domain.repository.UserRepository;
import com.isf6.backend.service.ReportService;
import com.isf6.backend.service.S3Service;
import com.isf6.backend.service.UserService;
import com.isf6.backend.common.oauth.OauthToken;
import com.isf6.backend.config.jwt.JwtProperties;
import com.isf6.backend.domain.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final ReportService reportService;
    private final S3Service s3Service;
    private final UserRepository userRepository;

    // 프론트에서 인가코드 받아오는 url
    @GetMapping("/oauth/token")
    public ResponseEntity getLogin(@RequestParam("code") String code) {
        //log.info("code : {} ", code);

        // 1. 넘어온 인가 코드를 통해 access_token 발급
        OauthToken oauthToken = userService.getAccessToken(code);
        //log.info("oauthToken : {} ", oauthToken);

        // 2. 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장 후 JWT 를 생성
        String jwtToken = userService.saveUserAndGetToken(oauthToken.getAccess_token());
        //log.info("jwtToken : {} ", jwtToken);

        // 3. 헤더에 JWT 토근 정보 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        log.info("headers : {} ", headers);

        return ResponseEntity.ok().headers(headers).body("success");
    }

    //유저 정보 조회
    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>(); //결과를 담을 Map

        // 1. token 정보를 포함한 request로 로그인한 유저 정보 가져오기
        User user = userService.getUser(request);

        //2. user가 null이 아니라면 반환유저객체 만들고 그 정보를 담아서 return
        if(user != null) {
            UserResDto userResDto = new UserResDto(user);
            response.put("result", "SUCCESS");
            response.put("user", userResDto);

            return ResponseEntity.status(200).body(response);
        }

        //3. 아니라면 실패 정보를 담아서 return
        response.put("result", "FAIL");
        response.put("reason", "유저 정보 수정 실패");
        return ResponseEntity.status(200).body(response);
    }

    //다른 유저 정보 조회
    @GetMapping("/user/{userCode}")
    public ResponseEntity getUser(@PathVariable Long userCode) {
        Map<String, Object> response = new HashMap<>(); //결과를 담을 Map

        User user = userService.findUser(userCode);

        if(user != null) {
            UserResDto userResDto = new UserResDto(user);
            response.put("result", "SUCCESS");
            response.put("user", userResDto);

            return ResponseEntity.status(200).body(response);
        }

        //3. 아니라면 실패 정보를 담아서 return
        response.put("result", "FAIL");
        response.put("reason", "유저 정보 수정 실패");
        return ResponseEntity.status(200).body(response);
    }

    //유저 정보 수정
    @PatchMapping("/user/{userCode}")
    public ResponseEntity updateUser(@PathVariable Long userCode,
                                     @RequestPart(value="content") UserUpdateReqDto userUpdateReqDto,
                                     @RequestPart(value="imgUrl", required = false) List<MultipartFile>  multipartFile) {

        Map<String, Object> response = new HashMap<>(); //결과를 담을 Map

        List<String> imgPath = new ArrayList<>();

        if (multipartFile!=null) {
            imgPath = s3Service.upload(multipartFile);
        } else {
            // 파일을 받지 않았으면 기본값
            imgPath.add(userRepository.findById(userCode).get().getKakaoProfileImg());
        }

        //1. userCode와 수정 정보 객체를 넘겨서 DB에서 user 정보 수정
        User user = userService.updateUser(userCode, userUpdateReqDto, imgPath);

        //2. user가 null이 아니라면 반환유저객체 만들고 그 정보를 담아서 return
        if(user != null) {
            UserResDto userResDto = new UserResDto(user);
            response.put("result", "SUCCESS");
            response.put("user", userResDto);

            return ResponseEntity.status(200).body(response);
        }

        //3. 아니라면 실패 정보를 담아서 return
        response.put("result", "FAIL");
        response.put("reason", "유저 정보 수정 실패");
        return ResponseEntity.status(200).body(response);
    }

    //유저 신고 등록
    @PostMapping("/user/report/{reportedUserCode}")
    public ResponseEntity report(@PathVariable Long reportedUserCode, @RequestBody ReportSaveReqDto reportSaveReqDto) {
        Map<String, Object> response = new HashMap<>(); //결과를 담을 Map

        // 1. 신고 당하는 유저의 code와 신고 객체를 넘겨서 DB에 신고 등록
        reportService.saveReport(reportedUserCode, reportSaveReqDto);
        response.put("reason", "신고 성공");

        return ResponseEntity.status(200).body(response);
    }
}
