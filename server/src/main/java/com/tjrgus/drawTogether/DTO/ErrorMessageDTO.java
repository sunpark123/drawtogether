package com.tjrgus.drawTogether.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ErrorMessageDTO {
    private String errorMessage;

    public ErrorMessageDTO(String s) {
        this.errorMessage = s;
    }
}
