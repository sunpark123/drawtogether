package com.tjrgus.drawTogether.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserDTO {
    private String userProfileImage = null;
    private String sessionId;
    private String userId;

    public UserDTO(String sessionId, String userId) {
        this.sessionId = sessionId;
        this.userId = userId;
    }
}
