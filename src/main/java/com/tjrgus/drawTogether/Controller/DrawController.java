package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.Entity.DrawEntity;
import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Service.DrawService;
import com.tjrgus.drawTogether.Service.UserService;
import com.tjrgus.drawTogether.SessionUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.*;

@Controller
public class DrawController {
    @Autowired
    private DrawService drawService;

    @Autowired
    private SessionUser sessionUser;

    @PostMapping("/saveDrawImage")
    public ResponseEntity<?> saveDrawImage(@RequestParam("drawImage") MultipartFile profileImage, @RequestParam("drawNumber") String drawNumber, HttpServletRequest request){
        try{
            HttpSession session = request.getSession(false);
            if (session != null) {
                String userId = session.getAttribute(sessionUser.getUserId()).toString();
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
        if (session != null) {
            String userId = session.getAttribute(sessionUser.getUserId()).toString();
            LocalDate today = LocalDate.now();

            drawEntity.setUserId(userId);
            drawEntity.setLastEditDate(today.toString());

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



    @GetMapping("/getHistoryOfNumber")
    public ResponseEntity<?> getHistoryOfNumber(@RequestParam String userId, @RequestParam Integer drawNumber){
        DrawEntity drawEntity = drawService.getDrawHistoryOfNumber(userId, drawNumber);
        if(drawEntity != null){
            return ResponseEntity.ok().body(drawEntity);
        }
        else{
            return ResponseEntity.status(400).body(null);
        }
    }


    @Data
    static class DrawImage {
        String url;
        String lastEditDate;
        boolean have;

        public DrawImage(String url, String lastEditDate, boolean have) {
            this.url = url;
            this.lastEditDate = lastEditDate;
            this.have = have;
        }
    }
    @GetMapping("/getAllDrawImage")
    public ResponseEntity<?> getAllDrawImage(@RequestParam String userId){
        try{

            List<DrawImage> drawImageList = new ArrayList<DrawImage>();
            for(int i = 0; i<5; i++){
                String saveName = userId + "_" + i + ".png";

                Path checkImage = checkImageExists("userDrawList", saveName);
                if (checkImage != null) {
                    String lastEditDate = drawService.getDrawLastEditDate(userId, i);
                    drawImageList.add(new DrawImage(imageToBase64(checkImage), lastEditDate, true));
                }
                else{
                    drawImageList.add(new DrawImage("no","0",false));
                }
            }

            if(drawImageList.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이미지 파일이 없습니다.");
            }
            else{
                return ResponseEntity.ok().body(drawImageList);
            }
        } catch (
                IOException e) {
            throw new RuntimeException(e);
        }
    }



    private Path checkImageExists(String folderName, String imageName){
        Path imagePath = Paths.get(folderName, imageName);

        return Files.exists(imagePath) ? imagePath : null;
    }
    private String imageToBase64(Path imagePath) throws IOException {
        byte[] imageBytes = Files.readAllBytes(imagePath);
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
        String contentType = Files.probeContentType(imagePath);

        return "data:" + contentType + ";base64," + base64Image;
    }

}
