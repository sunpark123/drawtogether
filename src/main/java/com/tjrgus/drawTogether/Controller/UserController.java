package com.tjrgus.drawTogether.Controller;

import com.nimbusds.oauth2.sdk.Response;
import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Service.UserService;
import com.tjrgus.drawTogether.SessionUser;
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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SessionUser sessionUser;

    @GetMapping("/userSessionCheck")
    public ResponseEntity<?> userSessionCheck(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        Map<String, Object> response = new HashMap<>();

        if (session != null) {
            response.put("success", true);
            response.put("userId", session.getAttribute(sessionUser.getUserId()));
        } else {
            response.put("success", false);
            response.put("userId", null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/userLogout")
    public ResponseEntity<?> userLogout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("로그인 안함");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Logout!");

    }

    @PostMapping("/login")
    public ResponseEntity<?> UserLogin(@RequestBody UserEntity userEntity, HttpServletRequest request){
        if(userService.userAlready(userEntity)){
            HttpSession session = request.getSession();
            session.setAttribute(sessionUser.getUserId(), userEntity.getUserId());

            return ResponseEntity.ok().body("성공");

        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("올바른 아이디 또는 비밀번호가 아닙니다.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> UserRegister(@RequestBody UserEntity userEntity, HttpServletRequest request){
        if(!userService.userIdAlready(userEntity)){
            HttpSession session = request.getSession();
            session.setAttribute(sessionUser.getUserId(), userEntity.getUserId());
            userService.saveUser((userEntity));
            return ResponseEntity.ok().body("OK");
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 있는 아이디입니다.");
        }

    }

    @PostMapping("/saveUserProfileImage")
    public ResponseEntity<?> saveUserProfileImage(@RequestParam("userImage") MultipartFile profileImage, HttpServletRequest request){
        try{
            HttpSession session = request.getSession(false);
            if (session != null) {
                String userId = session.getAttribute(sessionUser.getUserId()).toString();
                String saveName = userId+"_Image.png";

                Path savePath = Paths.get("userProfileImage", saveName);

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

    @GetMapping("/getUserProfileImage")
    public ResponseEntity<?> getUserProfileImage(@RequestParam String userId) {
        try{
            String saveName = userId+"_Image.png";
            Path imagePath = Paths.get("userProfileImage", saveName);

            if (!Files.exists(imagePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("이미지 파일이 없습니다.");
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);

            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            String contentType = Files.probeContentType(imagePath);

            String returnImage = "data:" + contentType + ";base64," + base64Image;

            return ResponseEntity.ok().body(returnImage);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getUserName")
    public ResponseEntity<?> getUserName(@RequestParam String userId) {
        String userName = userService.getUserName(userId);
        if(userName != null){
            return ResponseEntity.ok().body(userName);
        }
        else{
            return ResponseEntity.status(404).body("존재하지 않습니다");
        }
    }

    @PostMapping("/changeUserName")
    public ResponseEntity<?> changeUserName(@RequestBody UserEntity user, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = session.getAttribute(sessionUser.getUserId()).toString();
            userService.changeUserName(userId, user.getUserName());
            return ResponseEntity.ok().body("OK");
        }
        else{
            return ResponseEntity.status(400).body("세션없음");
        }

    }
}
