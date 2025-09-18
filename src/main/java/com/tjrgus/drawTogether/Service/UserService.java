package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Repository.UserRepository;
import org.apache.catalina.User;
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


    public String getUserName(String userId) {
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        return userEntity.map(UserEntity::getUserName).orElse(null);
    }

    public void changeUserName(String userId, String userName){
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        if(userEntity.isPresent()){
            userEntity.get().setUserName(userName);
            userRepository.save(userEntity.get());
        }
    }
}
