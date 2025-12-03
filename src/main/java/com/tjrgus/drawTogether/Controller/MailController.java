package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.DTO.ErrorMessageDTO;
import com.tjrgus.drawTogether.Repository.UserRepository;
import com.tjrgus.drawTogether.Service.MailService;
import com.tjrgus.drawTogether.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MailController {
    @Autowired
    private MailService mailService;

    @Autowired
    private UserService userService;

    @GetMapping("/makeCode")
    public ResponseEntity<?> makeCode(@RequestParam String mail) {
        if(userService.userMailAlready(mail)) return ResponseEntity.badRequest().body(new ErrorMessageDTO("error_mail_already"));


        if(mailService.canMakeCode(mail)){
            mailService.makeCode(mail);
            return ResponseEntity.ok().build();
        }
        else{
            return ResponseEntity.badRequest().body(new ErrorMessageDTO("error_mail_code_retry"));
        }
    }
    @GetMapping("/checkCode")
    public ResponseEntity<?> checkCode(@RequestParam String mail, @RequestParam String code) {
        int what = mailService.checkCode(mail, code);
        // 0 = 맞음
        // 1 = 틀림
        // 2 = 늦음
        if(what == 0){
            return ResponseEntity.ok().build();
        }
        else{
            return ResponseEntity.badRequest().body(new ErrorMessageDTO((what == 1) ? "error_not_same_code" : "error_expired_code"));
        }
    }
}
