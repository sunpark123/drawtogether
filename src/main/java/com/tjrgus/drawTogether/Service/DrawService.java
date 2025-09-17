package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Entity.DrawEntity;
import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Repository.DrawRepository;
import com.tjrgus.drawTogether.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DrawService {
    @Autowired
    private DrawRepository drawRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean drawAlready(DrawEntity drawEntity){
        Optional<DrawEntity> searchDraw = drawRepository.findByUserId(drawEntity.getUserId());
        return searchDraw.isPresent();
    }

    public void updateDraw(DrawEntity drawEntity){
        Optional<DrawEntity> searchDraw = drawRepository.findByUserId(drawEntity.getUserId());
        if(searchDraw.isPresent()){
            DrawEntity newDrawEntity = searchDraw.get();
            newDrawEntity.setDrawHistory(drawEntity.getDrawHistory());
            drawRepository.save(newDrawEntity);
        }
    }

    public void makeDraw(DrawEntity drawEntity){
        drawRepository.save(drawEntity);
    }

    public DrawEntity getDrawHistory(String userId){
        Optional<DrawEntity> d = drawRepository.findByUserId(userId);
        return d.orElse(null);
    }
}
