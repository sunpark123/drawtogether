package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.DTO.ChatMessageDTO;
import com.tjrgus.drawTogether.DTO.DrawMessageDTO;
import com.tjrgus.drawTogether.DTO.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Autowired
    private UserService userService;

    private final Map<String, List<ChatMessageDTO>> chatList = new HashMap<>();
    private final Map<String, List<DrawMessageDTO>> drawList = new HashMap<>();

    private final SimpMessagingTemplate messagingTemplate;

    public ChatService(SimpMessagingTemplate messagingTemplate) { this.messagingTemplate = messagingTemplate; }

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

    public List<ChatMessageDTO> getChatList(String roomId) {
        return chatList.get(roomId);
    }

    public List<DrawMessageDTO> getDrawList(String roomId) {
        return drawList.get(roomId);
    }



    public void userReload(String roomId, List<UserDTO> userList) {
        if(userList != null){
            userList.forEach((userDTO -> {
                String userProfileImage = userService.getUserProfileImage(userDTO.getUserId());
                userDTO.setUserProfileImage(userProfileImage);
            }));

            messagingTemplate.convertAndSend("/server/userlist/" + roomId, userList);
        }

    }
    public void sendUserJoinMessage(String roomId, String userId){
        ChatMessageDTO chatMessageDTO = new ChatMessageDTO();
        chatMessageDTO.setUserId(userId);
        chatMessageDTO.setMessage("/alert 님이 입장하셨습니다.");

        messagingTemplate.convertAndSend("/server/chat/" + roomId, chatMessageDTO);
    }
    public void sendUserExitMessage(String roomId, String userId){
        ChatMessageDTO chatMessageDTO = new ChatMessageDTO();
        chatMessageDTO.setUserId(userId);
        chatMessageDTO.setMessage("/alert 님이 퇴장하셨습니다.");

        messagingTemplate.convertAndSend("/server/chat/" + roomId, chatMessageDTO);
    }
}
