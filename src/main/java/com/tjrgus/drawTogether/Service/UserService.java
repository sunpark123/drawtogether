package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean userIdAlready(UserEntity userEntity){
        Optional<UserEntity> searchUser = userRepository.findByUserId(userEntity.getUserId());
        return searchUser.isPresent();
    }
    public boolean userAlready(UserEntity userEntity){
        Optional<UserEntity> searchUser = userRepository.findByUserId(userEntity.getUserId());
        return searchUser.filter(entity -> passwordEncoder.matches(userEntity.getUserPassword(), searchUser.get().getUserPassword())).isPresent();
    }
    public void saveUser(UserEntity userEntity){
        String encodedPassword = passwordEncoder.encode(userEntity.getUserPassword());
        userEntity.setUserPassword(encodedPassword);
        userRepository.save(userEntity);
    }

}
