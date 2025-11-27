package com.tjrgus.drawTogether.WebSocket;

import com.tjrgus.drawTogether.Session.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;
import java.util.Objects;

@Component
public class WebSocketEventListener {

    @Autowired
    private RoomManager roomManager;


    // 구독 시
    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String topic = accessor.getDestination();



        if(topic != null && topic.contains("need") && topic.startsWith("/server/need/")){

            List<String> userIdHeader = accessor.getNativeHeader("userId");
            String userId = (userIdHeader != null && !userIdHeader.isEmpty()) ? userIdHeader.get(0) : null;

            if(userId != null) {

                String[] parts = topic.split("/");
                String roomId = parts[3];

                roomManager.addUserToRoom(roomId, sessionId, userId);
            }
        }
    }

    // 세션 종료 시
    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();


        roomManager.removeUserFromRoom(sessionId);

    }
}
