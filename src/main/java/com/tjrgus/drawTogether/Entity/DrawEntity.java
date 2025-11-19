package com.tjrgus.drawTogether.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@Table(name = "draw")
public class DrawEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pk_id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "history")
    private String drawHistory;

    @Column(name = "draw_number")
    private Integer drawNumber;
}
