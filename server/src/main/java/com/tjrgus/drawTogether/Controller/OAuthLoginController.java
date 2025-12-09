package com.tjrgus.drawTogether.Controller;

import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Service.UserService;
import com.tjrgus.drawTogether.Session.SessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class OAuthLoginController {

    @Autowired
    private SessionManager sessionManager;
    @Autowired
    private UserService userService;



    @GetMapping("/oAuthLogin")
    public void oAuthLogin(HttpServletResponse response, HttpServletRequest request, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String name = oAuth2User.getAttribute("name");
        String userId = oAuth2User.getAttribute("email");

        UserEntity user = new UserEntity();
        String googleUserId = userId + "__google";
        user.setUserId(googleUserId);
        user.setUserName(name);
        user.setUserPassword(null);
        System.out.println("들어옴" + googleUserId + " / " + name);

        if(!userService.userIdAlready(user)) { userService.saveUser(user); }

        sessionManager.sessionAdd(request, googleUserId);
        response.sendRedirect("http://localhost:3000/lobby");
    }
}
