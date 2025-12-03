package com.tjrgus.drawTogether.WebSocket;

import com.tjrgus.drawTogether.DTO.RoomDTO;
import com.tjrgus.drawTogether.DTO.UserDTO;
import com.tjrgus.drawTogether.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class RoomManager {

    @Autowired
    private ChatService chatService;

    private final Map<String, List<UserDTO>> roomUserList = new HashMap<>();

    public void addUserToRoom(String roomId, String sessionId, String userId) {
        roomUserList.computeIfAbsent(roomId, k -> new ArrayList<>())
                .add(new UserDTO(sessionId, userId));

        chatService.userReload(roomId, roomUserList.get(roomId));
        chatService.sendUserJoinMessage(roomId, userId);
    }

    public void removeUserFromRoom(String sessionId) {
        AtomicReference<String> userRoomId = new AtomicReference<>("");
        roomUserList.forEach((roomId, userList) -> {
            boolean containsUser = userList.stream()
                    .anyMatch(user -> Objects.equals(user.getSessionId(), sessionId));

            if (containsUser) {
                userRoomId.set(roomId);

            }
        });
        String roomId = String.valueOf(userRoomId);
        UserDTO target = roomUserList.get(roomId).stream()
                .filter(user -> user.getSessionId().equals(sessionId))
                .findFirst()
                .orElse(null);
        assert target != null;
        String userId = target.getUserId();

        roomUserList.computeIfPresent(roomId, (key, list) -> {
            list.removeIf(user -> Objects.equals(user.getSessionId(), sessionId));
            if(list.isEmpty()){
                chatService.removeLists(roomId);
                return null;
            } else {
                return list;
            }
        });
        chatService.userReload(roomId, roomUserList.get(roomId));
        chatService.sendUserExitMessage(roomId, userId);
    }

    public List<UserDTO> getUserListInRoom(String roomId){
        return roomUserList.get(roomId);
    }

    public List<RoomDTO> getAllRoom() {
        List<RoomDTO> roomList = new ArrayList<>();
        roomUserList.forEach((roomId, userList) -> {
            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setRoomId(roomId);
            roomDTO.setRoomCount(userList.size());

            roomList.add(roomDTO);
        });

        return roomList;
    }

}
