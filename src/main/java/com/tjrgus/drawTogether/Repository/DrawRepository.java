package com.tjrgus.drawTogether.Repository;

import com.tjrgus.drawTogether.Entity.DrawEntity;
import com.tjrgus.drawTogether.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DrawRepository extends JpaRepository<DrawEntity, Integer> {
    List<DrawEntity> findAllByUserId(String userId);
    Optional<DrawEntity> findByUserId(String userId);
    Optional<DrawEntity> findByUserIdAndDrawNumber(String userId, Integer drawNumber);
}
