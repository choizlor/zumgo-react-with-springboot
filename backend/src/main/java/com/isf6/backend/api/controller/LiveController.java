package com.isf6.backend.api.controller;

import com.isf6.backend.api.Request.LiveRoomSaveReqDto;
import com.isf6.backend.domain.entity.LiveRoom;
import com.isf6.backend.service.LiveService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/live")
public class LiveController {

    @Autowired
    LiveService liveService;

    @PostMapping("/room")
    public ResponseEntity createLiveRoom(@RequestBody LiveRoomSaveReqDto liveRoomSaveReqDto) {
        log.info("liveRoomCreateReq.getProductId : {}", liveRoomSaveReqDto.getProductId());

        //1. 라이브 방을 생성(라이브방정보)
        //2. 성공 실패 결과 담아서 front로 전달
        // 성공하면 200으로 라이브 방 정보와 함께 넘겨주고
        // 실패해도 200으로 실패 정보 보내기
        Map<String, Object> response = new HashMap<>();
        LiveRoom liveRoom;

        try {
            liveRoom = liveService.createLive(liveRoomSaveReqDto);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("result", "FAIL");
            response.put("reason", "라이브 방 생성 실패");
            return ResponseEntity.status(200).body(response);
        }

        response.put("result", "SUCCESS");
        response.put("LiveRoom", liveRoom);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/{productId}")
    public ResponseEntity selectLiveRoom(@PathVariable long productId) {
        Map<String, Object> response = new HashMap<>();
        LiveRoom liveRoom = liveService.getLiveByProductId(productId);

        if(liveRoom == null) {
            response.put("result", "FAIL");
            response.put("reason", "검색되는 방 정보 없음");
            return ResponseEntity.status(200).body(response);
        }

        response.put("result", "SUCCESS");
        response.put("LiveRoom", liveRoom);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity selectAllLives() {
        Map<String, Object> response = new HashMap<>();
        List<LiveRoom> liveList = liveService.getAllLives();

        if(liveList != null) {
            response.put("result", "SUCCESS");
            response.put("liveList", liveList);
            return ResponseEntity.status(200).body(response);
        }

        response.put("result", "FAIL");
        response.put("reason", "전체 라이브 방 조회 실패");
        return ResponseEntity.status(200).body(response);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity updateLiveRoom(@PathVariable long productId, @RequestBody LiveRoomSaveReqDto liveRoomSaveReqDto) {
        //1.파라메터로 넘어온 상품 아이디에 해당되는 live 객체 찾기
        LiveRoom liveRoom = liveService.getLiveByProductId(productId);

        //2. 성공 실패 결과 담아서 front로 전달
        // 성공하면 200으로 라이브 방 정보와 함께 넘겨주고
        // 실패해도 200으로 실패 정보 보내기
        Map<String, Object> response = new HashMap<>();

        //3. 라이브 방 정보 수정
        try {
            liveRoom = liveService.updateLive(liveRoomSaveReqDto, liveRoom);
            response.put("result", "SUCCESS");
            response.put("LiveRoom", liveRoom);
            return ResponseEntity.status(200).body(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("result", "FAIL");
        response.put("reason", "라이브 방 생성 실패");
        return ResponseEntity.status(200).body(response);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteLiveRoom(@PathVariable long productId) {
        Map<String, Object> response = new HashMap<>();
        liveService.deleteLiveRoom(productId);
        response.put("result", "SUCCESS");

        return ResponseEntity.status(200).body(response);
    }


}
