package com.example.demo.controller;


import java.util.List;
import java.util.Random;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.MonsterMapper;
import com.example.demo.model.Monster;

@RestController
@RequestMapping("/api/monsters")
public class MonsterController {
    private final MonsterMapper monsterMapper;
    private final Random random = new Random();

    public MonsterController(MonsterMapper monsterMapper) {
        this.monsterMapper = monsterMapper;
    }

    @GetMapping
    public List<Monster> findAll() {
        return monsterMapper.findAll();
    }

    @PostMapping
    public void create(@RequestBody Monster monster) {
        monster.setHp(random.nextInt(100) + 50);
        monster.setAttack(random.nextInt(20) + 10);
        monster.setSpeed(random.nextInt(30) + 5);
        monsterMapper.insert(monster);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody Monster monster) {
        monster.setId(id);
        monsterMapper.update(monster);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        monsterMapper.delete(id);
    }

    @PostMapping("/battle")
    public String battle(@RequestParam Long id1, @RequestParam Long id2) {
        Monster m1 = monsterMapper.findById(id1);
        Monster m2 = monsterMapper.findById(id2);

        Monster attacker = m1.getSpeed() >= m2.getSpeed() ? m1 : m2;
        Monster defender = attacker == m1 ? m2 : m1;

        StringBuilder log = new StringBuilder();

        while (m1.getHp() > 0 && m2.getHp() > 0) {
            if (random.nextInt(100) < attacker.getSkillAccuracy()) {
                int damage = attacker.getAttack() + attacker.getSkillPower();
                defender.setHp(defender.getHp() - damage);
                log.append(attacker.getName()).append(" hits ")
                   .append(defender.getName()).append(" for ").append(damage).append(" HP.\n");
            } else {
                log.append(attacker.getName()).append(" missed!\n");
            }

            if (defender.getHp() <= 0) break;

            // swap attacker and defender
            Monster tmp = attacker;
            attacker = defender;
            defender = tmp;
        }

        log.append("Winner: ").append(attacker.getName());
        return log.toString();
    }
}