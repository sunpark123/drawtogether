package com.tjrgus.drawTogether.Controller;

import com.nimbusds.oauth2.sdk.Response;
import com.tjrgus.drawTogether.Entity.UserEntity;
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

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/userSessionCheck")
    public ResponseEntity<?> userSessionCheck(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            return ResponseEntity.status(HttpStatus.OK).body(session.getAttribute("userId"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("세션 없음");
        }
    }

    @PostMapping("/login")
    private ResponseEntity<?> UserLogin(@RequestBody UserEntity userEntity, HttpServletRequest request){
        if(userService.userAlready(userEntity)){
            HttpSession session = request.getSession();
            session.setAttribute("userId", userEntity.getUserId());

            return ResponseEntity.ok().body("성공");

        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("올바른 아이디 또는 비밀번호가 아닙니다.");
        }
    }

    @PostMapping("/register")
    private ResponseEntity<?> UserRegister(@RequestBody UserEntity userEntity){
        if(!userService.userIdAlready(userEntity)){
            userService.saveUser((userEntity));
            return ResponseEntity.ok().body("OK");
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 있는 아이디입니다.");
        }

    }
}
