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
@EnableWebSocketMessageBroker//추가
@RequiredArgsConstructor//추가
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer { // (1)
    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) { // (2)
        registry.enableSimpleBroker("/sub"); // (3)
        registry.setApplicationDestinationPrefixes("/pub"); // (4)
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) { // (5)
        registry.addEndpoint("/stomp/chat") // ex ) ws://localhost:9000/stomp/chat
                .setAllowedOriginPatterns("*").withSockJS();
    }

    @Override // (6)
    public void configureClientInboundChannel (ChannelRegistration registration){
        registration.interceptors(stompHandler);
    }

//    @Bean
//    public ServerEndpointExporter serverEndpointExporter() {
//        return new ServerEndpointExporter();
//    }
}
