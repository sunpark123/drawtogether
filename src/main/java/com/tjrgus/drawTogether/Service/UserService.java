package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


}
