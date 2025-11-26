package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.DTO.ChatMessageDTO;
import com.tjrgus.drawTogether.DTO.DrawMessageDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {
    private final Map<String, List<ChatMessageDTO>> chatList = new HashMap<>();
    private final Map<String, List<DrawMessageDTO>> drawList = new HashMap<>();

    public void removeLists(String roomId) {
        chatList.remove(roomId);
        drawList.remove(roomId);
    }

    public void addChatList(String roomId, ChatMessageDTO chatMessageDTO) {
        chatList
            .computeIfAbsent(roomId, k -> new ArrayList<>())
            .add(chatMessageDTO);
    }

    public void addDrawList(String roomId, DrawMessageDTO drawMessageDTO) {
        drawList
            .computeIfAbsent(roomId, k -> new ArrayList<>())
            .add(drawMessageDTO);
    }

    public Map<String, List<ChatMessageDTO>> getChatList() {
        return chatList;
    }

    public Map<String, List<DrawMessageDTO>> getDrawList() {
        return drawList;
    }
}
