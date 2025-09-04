package com.tjrgus.drawTogether.Controller;

import com.nimbusds.oauth2.sdk.Response;
import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> UserLogin(@RequestBody UserEntity userEntity){
        System.out.println(userEntity);
        return ResponseEntity.ok().body("OK");
    }
}
