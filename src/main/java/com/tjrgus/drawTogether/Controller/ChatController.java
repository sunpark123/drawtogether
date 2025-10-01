package com.tjrgus.drawTogether.Controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // 클라이언트가 /app/chat/{userId} 로 메시지 전송
    @MessageMapping("/chat/{userId}")
    public void sendMessage(@Payload String message,
                            @DestinationVariable String userId) {
        messagingTemplate.convertAndSend("/server/" + userId, message);
    }
}
