package com.example.demo.model;

import lombok.Data;

@Data
public class Monster {
    private Long id;
    private String name;
    private int hp;
    private int attack;
    private int defense;
    private int speed;
    private String skillName;
    private int skillPower;
    private int skillAccuracy;

    }

