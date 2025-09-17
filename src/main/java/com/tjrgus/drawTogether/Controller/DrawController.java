package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.Entity.DrawEntity;
import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Service.DrawService;
import com.tjrgus.drawTogether.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class DrawController {
    @Autowired
    private DrawService drawService;


    @PostMapping("/saveHistory")
    private ResponseEntity<?> saveHistory(@RequestBody DrawEntity drawEntity){
        if(drawService.drawAlready(drawEntity)){
            drawService.updateDraw(drawEntity);
        }
        else{
            drawService.makeDraw(drawEntity);
        }
        return ResponseEntity.ok().body("gang");
    }

    @GetMapping("/getHistory")
    private ResponseEntity<?> getHistory(@RequestParam String userId){
        DrawEntity draw = drawService.getDrawHistory(userId);
        if(draw != null){
            return ResponseEntity.ok().body(draw);
        }
        else{
            return ResponseEntity.status(400).body(null);
        }
    }

}
