package com.tjrgus.drawTogether.WebSocket;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private final SubTopicManager subTopicManager;

    public WebSocketEventListener(SubTopicManager subscriptionManager) {
        this.subTopicManager = subscriptionManager;
    }

    // 구독 시
    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String topic = accessor.getDestination();
        subTopicManager.addSubscription(topic, sessionId);
    }

    // 구독 해제 시
    @EventListener
    public void handleUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String topic = accessor.getDestination();
        subTopicManager.removeSubscription(topic, sessionId);
    }

    // 세션 종료 시
    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        // 모든 토픽에서 해당 세션 제거
        subTopicManager.getAllTopics().forEach(topic ->
                subTopicManager.removeSubscription(topic, sessionId)
        );
    }
}
