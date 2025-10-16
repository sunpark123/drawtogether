package com.tjrgus.drawTogether.DTO;

import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DrawMessageDTO {
    private String userId;
    private DrawingData drawList;
    private int code = 1;
}
