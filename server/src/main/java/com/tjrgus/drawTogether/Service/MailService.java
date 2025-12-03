package com.tjrgus.drawTogether.Service;

import com.tjrgus.drawTogether.Entity.MailEntity;
import com.tjrgus.drawTogether.Repository.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Random;


@Service
public class MailService {
    @Autowired
    private MailRepository mailRepository;

    @Autowired
    private MailSenderService mailSenderService;

    public void makeCode(String mail) {
        MailEntity mailEntity = new MailEntity();
        mailEntity.setMail(mail);

        int codeInt = new Random().nextInt(10000);
        mailEntity.setCode(String.valueOf(codeInt));

        LocalTime now = LocalTime.now();
        String time = now.format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        mailEntity.setSendTime(time);

        mailRepository.save(mailEntity);
        mailSenderService.sendCode(mail, "DrawToGether Code is " + codeInt, "Code : " + codeInt + "\nThank You For Join\nJoin Time : " + time);
    }
    public boolean canMakeCode(String mail){
        Optional<MailEntity> mailEntity = mailRepository.findByMail(mail);
        if(mailEntity.isPresent()){
            if(canReSendCode(mailEntity.get())){
                mailRepository.delete(mailEntity.get());
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }
    private boolean canReSendCode(MailEntity mailEntity){
        String time = mailEntity.getSendTime();
        long dif = diffTime(time);
        return dif > 10;
    }
    private long diffTime(String time){
        LocalTime targetTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm:ss"));
        LocalTime now = LocalTime.now();
        return Duration.between(targetTime, now).getSeconds();
    }

    public int checkCode(String mail, String code) {
        // 0 = 맞음
        // 1 = 틀림
        // 2 = 늦음
        Optional<MailEntity> mailEntity = mailRepository.findByMailAndCode(mail, code);
        if(mailEntity.isPresent()) {
            String time =  mailEntity.get().getSendTime();
            long dif = diffTime(time);
            System.out.println(dif);
            if(dif < 180) {
                mailRepository.delete(mailEntity.get());
                return 0;
            }
            else {
                return 2;
            }
        }
        else{
            return 1;
        }
    }
}
