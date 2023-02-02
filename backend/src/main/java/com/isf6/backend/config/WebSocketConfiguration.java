package com.isf6.backend.config;

import com.isf6.backend.config.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration//Component -> Configuration
@EnableWebSocketMessageBroker   // webSocket을 사용한다고 설정
@RequiredArgsConstructor//추가
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    private final StompHandler stompHandler;

    // subscribe와 publish할 때 destination prefix .enableSimpleBroker, .setApplicationDestinationPrefixes 를 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    // 처음 webSocket에 접속할 때 HandShake와 통신을 담당할 엔드포인트 지정
    // .setAllowedOriginPatterns : 출처는 *(모두 접근 가능)로 지정
    // .withSockJS : WebSocket을 지원하지 않는 브라우저의 경우 SockJS를 통해 다른 방식으로 채팅이 이뤄질 수 있게 구현
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp/chat") // ex ) ws://localhost:9000/stomp/chat
                .setAllowedOriginPatterns("*").withSockJS();
    }

    // StompHandler 가 Websocket 앞단에서 token 을 체크할 수 있도록 인터셉터로 설정
    @Override
    public void configureClientInboundChannel (ChannelRegistration registration){
        registration.interceptors(stompHandler);
    }

//    @Bean
//    public ServerEndpointExporter serverEndpointExporter() {
//        return new ServerEndpointExporter();
//    }
}
