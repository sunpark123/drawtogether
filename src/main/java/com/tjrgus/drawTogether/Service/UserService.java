package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

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
        if(userEntity.getUserPassword() == null) { // oAuth 로그인
            String randomPwd = UUID.randomUUID().toString();
            userEntity.setUserPassword(randomPwd);
        }
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

    public String getUserProfileImage(String userId){
        try{
            String saveName = userId+"_Image.png";
            Path imagePath = Paths.get("userProfileImage", saveName);

            if (!Files.exists(imagePath)) {
                return null;
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);

            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            String contentType = Files.probeContentType(imagePath);

            return "data:" + contentType + ";base64," + base64Image;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
