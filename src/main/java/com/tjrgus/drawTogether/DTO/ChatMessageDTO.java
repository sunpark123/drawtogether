package com.tjrgus.drawTogether.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    private String userId;
    private String message;
    private int code = 0;
}
