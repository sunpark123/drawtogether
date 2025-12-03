package com.tjrgus.drawTogether.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pk_id;

    @Column(name = "id")
    private String userId;

    @Column(name = "password")
    private String userPassword;

    @Column(name = "name")
    private String userName;

    @Column(name = "user_mail")
    private String userMail;
}
