package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.DTO.ChatMessageDTO;
import com.tjrgus.drawTogether.DTO.DrawMessageDTO;
import com.tjrgus.drawTogether.DTO.MouseMessageDTO;
import com.tjrgus.drawTogether.Service.ChatService;
import com.tjrgus.drawTogether.TempStorage;
import com.tjrgus.drawTogether.WebSocket.RoomManager;
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
    private ChatService chatService;

    @Autowired
    private RoomManager roomManager;

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    // 클라이언트가 /app/chat/{userId} 로 메시지 전송
    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@Payload ChatMessageDTO chatMessageDTO, @DestinationVariable String roomId) {
        chatService.addChatList(roomId,chatMessageDTO);

        messagingTemplate.convertAndSend("/server/chat/" + roomId, chatMessageDTO);
    }
    @MessageMapping("/need/{roomId}")
    public void returnAllDraw(@Payload ChatMessageDTO chatMessageDTO, @DestinationVariable String roomId) {
        List<DrawMessageDTO> RoomDrawList = chatService.getDrawList(roomId);
        if(RoomDrawList != null) messagingTemplate.convertAndSend("/server/need/" + roomId + "/" + chatMessageDTO.getUserId(), RoomDrawList);
    }
    @MessageMapping("/draw/{roomId}")
    public void sendDraw(@Payload DrawMessageDTO drawMessageDTO, @DestinationVariable String roomId) {
        chatService.addDrawList(roomId, drawMessageDTO);

        messagingTemplate.convertAndSend("/server/draw/" + roomId, drawMessageDTO);
    }

    @MessageMapping("/mouse/{roomId}")
    public void sendMouse(@Payload MouseMessageDTO mouseMessageDTO, @DestinationVariable String roomId) {
        messagingTemplate.convertAndSend("/server/mouse/" + roomId, mouseMessageDTO);
    }
}