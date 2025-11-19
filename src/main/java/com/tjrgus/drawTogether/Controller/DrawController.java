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
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Controller
public class DrawController {
    @Autowired
    private DrawService drawService;

    @PostMapping("/saveDrawImage")
    public ResponseEntity<?> saveDrawImage(@RequestParam("drawImage") MultipartFile profileImage, @RequestParam("drawNumber") String drawNumber, HttpServletRequest request){
        try{
            HttpSession session = request.getSession(false);
            if (session != null) {
                String userId = session.getAttribute("userId").toString();
                String saveName = userId+"_"+drawNumber+".png";

                Path savePath = Paths.get("userDrawList", saveName);

                if (!Files.exists(savePath.getParent())) {
                    Files.createDirectories(savePath.getParent());
                }
                Files.copy(profileImage.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);


                return ResponseEntity.ok().body("저장성공");
            }
            else{
                return ResponseEntity.status(404).body("잘못된 접근");
            }

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("저장실패");
        }
    }
    @PostMapping("/saveHistory")
    public ResponseEntity<?> saveHistory(@RequestBody DrawEntity drawEntity, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        System.out.println("왐");
        if (session != null) {
            String userId = session.getAttribute("userId").toString();
            drawEntity.setUserId(userId);

            if (drawService.drawAlready(drawEntity)) {
                drawService.updateDraw(drawEntity);
            } else {
                drawService.makeDraw(drawEntity);
            }
            return ResponseEntity.ok().body("저장성공");
        }
        else{
            return ResponseEntity.status(404).body("알수없는 접근");
        }
        
    }

    @GetMapping("/getAllHistory")
    public ResponseEntity<?> getAllHistory(@RequestParam String userId){
        List<DrawEntity> allDraw = drawService.getAllHistory(userId);
        System.out.println(allDraw);
        if(allDraw != null){
            return ResponseEntity.ok().body(allDraw);
        }
        else{
            return ResponseEntity.status(400).body(null);
        }
    }

}
