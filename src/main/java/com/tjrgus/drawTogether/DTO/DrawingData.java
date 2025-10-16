package com.tjrgus.drawTogether.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DrawingData {
    private String tool;
    private String color;
    private int size;
    private List<Point> path;
}

