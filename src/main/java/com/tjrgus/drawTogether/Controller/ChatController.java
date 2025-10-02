package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.DTO.ChatMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ChatController {


    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // 클라이언트가 /app/chat/{userId} 로 메시지 전송
    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@Payload ChatMessageDTO chatMessageDTO, @DestinationVariable String roomId) {
        System.out.println(roomId + " : " + chatMessageDTO.getUserId() + " / " + chatMessageDTO.getMessage());
        messagingTemplate.convertAndSend("/server/" + roomId, chatMessageDTO);
    }
}
