package com.tjrgus.drawTogether.DTO;

import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.*;

@Data
@Getter
@Setter
public class DrawMessageDTO {
    private String userId;
    private String history;
    private int code = 0;
    // 0 = add
    // 1 = remove
}
