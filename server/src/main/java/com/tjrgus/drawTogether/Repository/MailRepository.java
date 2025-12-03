package com.tjrgus.drawTogether.Repository;

import com.tjrgus.drawTogether.Entity.MailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MailRepository extends JpaRepository<MailEntity, Integer> {
    Optional<MailEntity> findByMailAndCode(String mail, String code);
    Optional<MailEntity> findByMail(String mail);
}
