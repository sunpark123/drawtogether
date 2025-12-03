package com.tjrgus.drawTogether.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@Table(name = "mail_verification")
public class MailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pk_id;

    @Column(name = "mail")
    private String mail;

    @Column(name = "code")
    private String code;

    @Column(name = "send_time")
    private String sendTime;
}
