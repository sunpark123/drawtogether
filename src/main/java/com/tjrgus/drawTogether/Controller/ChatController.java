package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.DTO.ChatMessageDTO;
import com.tjrgus.drawTogether.DTO.DrawMessageDTO;
import com.tjrgus.drawTogether.TempStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ChatController {

    @Autowired
    private TempStorage tempStorage;

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    private Map<String, List<ChatMessageDTO>> chatList = new HashMap<>();


    // 클라이언트가 /app/chat/{userId} 로 메시지 전송
    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@Payload ChatMessageDTO chatMessageDTO, @DestinationVariable String roomId) {
        System.out.println(roomId + " : " + chatMessageDTO.getUserId() + " / " + chatMessageDTO.getMessage());
    
        chatList
            .computeIfAbsent(roomId, k -> new ArrayList<>())
            .add(chatMessageDTO);

        messagingTemplate.convertAndSend("/server/" + roomId, chatMessageDTO);
    }
    @MessageMapping("/need/{roomId}")
    public void returnAllChat(@Payload ChatMessageDTO chatMessageDTO, @DestinationVariable String roomId) {
        System.out.println(chatMessageDTO.getUserId() + " /  리턴!!");
        messagingTemplate.convertAndSend("/server/" + chatMessageDTO.getUserId(), chatList);
    }
    @MessageMapping("/draw/{roomId}")
    public void sendDraw(@Payload DrawMessageDTO drawMessageDTO, @DestinationVariable String roomId) {
        System.out.println(drawMessageDTO.getDrawList());
        messagingTemplate.convertAndSend("/server/" + roomId, drawMessageDTO);


        tempStorage.save(roomId, drawMessageDTO);
        System.out.println(tempStorage.find((roomId)));
    }


}