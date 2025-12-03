package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Entity.DrawEntity;
import com.tjrgus.drawTogether.Entity.UserEntity;
import com.tjrgus.drawTogether.Repository.DrawRepository;
import com.tjrgus.drawTogether.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrawService {
    @Autowired
    private DrawRepository drawRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean drawAlready(DrawEntity drawEntity){
        Optional<DrawEntity> searchDraw = drawRepository.findByUserIdAndDrawNumber(drawEntity.getUserId(), drawEntity.getDrawNumber());
        return searchDraw.isPresent();
    }

    public void updateDraw(DrawEntity drawEntity){
        Optional<DrawEntity> searchDraw = drawRepository.findByUserIdAndDrawNumber(drawEntity.getUserId(), drawEntity.getDrawNumber());
        if(searchDraw.isPresent()){
            DrawEntity newDrawEntity = searchDraw.get();
            newDrawEntity.setDrawHistory(drawEntity.getDrawHistory());
            newDrawEntity.setLastEditDate(drawEntity.getLastEditDate());
            drawRepository.save(newDrawEntity);
        }
    }

    public void makeDraw(DrawEntity drawEntity){
        drawRepository.save(drawEntity);
    }

    public DrawEntity getDrawHistoryOfNumber(String userId, Integer drawNumber){
        Optional<DrawEntity> drawEntity = drawRepository.findByUserIdAndDrawNumber(userId,drawNumber);
        return drawEntity.orElse(null);
    }

    public String getDrawLastEditDate(String userId, Integer drawNumber){
        Optional<DrawEntity> drawEntity = drawRepository.findByUserIdAndDrawNumber(userId,drawNumber);
        return drawEntity.map(DrawEntity::getLastEditDate).orElse(null);
    }

}
