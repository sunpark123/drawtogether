package com.tjrgus.drawTogether.Session;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;


@Component
public class SessionManager {
    public void sessionAdd(HttpServletRequest request, String userId){
        HttpSession session = request.getSession();
        session.setAttribute("userId", userId);
    }
}
