package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.DTO.RoomDTO;
import com.tjrgus.drawTogether.Entity.DrawEntity;
import com.tjrgus.drawTogether.WebSocket.RoomManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class RoomController {
    @Autowired
    private RoomManager roomManager;


    @GetMapping("/getAllRoom")
    public ResponseEntity<?> getAllRoom(){

        List<RoomDTO> getAllRoom = roomManager.getAllRoom();

        if(getAllRoom != null){
            return ResponseEntity.ok().body(getAllRoom);
        }
        else{
            return ResponseEntity.status(400).body(null);
        }
    }
}
