package com.example.demo.controller;


import java.util.List;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins = "http://localhost:3000")
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
    	// ステータスのみサーバ側でランダムに設定
//        monster.setHp(random.nextInt(100) + 50);
//        monster.setAttack(random.nextInt(20) + 10);
//        monster.setSpeed(random.nextInt(30) + 5);
        
    	System.out.println("受け取ったモンスター: " + monster);
    	System.out.println("skillName: " + monster.getSkillName());
    	System.out.println("skillPower: " + monster.getSkillPower());
    	System.out.println("skillAccuracy: " + monster.getSkillAccuracy());
    	
        monsterMapper.insert(monster);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Monster> getMonsterById(@PathVariable Long id) {
    	Monster monster = monsterMapper.findById(id);
    	if (monster != null) {
    	    return ResponseEntity.ok(monster);
    	} else {
    	    return ResponseEntity.notFound().build();
    	}

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
        
        int turn = 1;
        while (m1.getHp() > 0 && m2.getHp() > 0) {
            log.append("【ターン ").append(turn).append("】\n");
            log.append("実況: ").append(attacker.getName())
               .append(" が行動に移ります！\n");

            if (random.nextInt(100) < attacker.getSkillAccuracy()) {
            	double randomModifier = 0.85 + (Math.random() * 0.15);

                int damage = (int) Math.round((attacker.getAttack() * attacker.getSkillPower()) / defender.getDefense() * randomModifier);
                defender.setHp(defender.getHp() - damage);

                log.append(attacker.getName()).append(" の ")
                   .append(attacker.getSkillName()).append("！！\n");
                log.append("効果はバツグンだ！ ").append(defender.getName())
                   .append(" に ").append(damage).append(" ダメージ！\n");
            } else {
                log.append(attacker.getName()).append(" の攻撃… しかし外れた！\n");
            }

            if (defender.getHp() <= 0) {
                log.append("\n🎉 実況: ").append(defender.getName()).append(" はもう動けません！\n");
                log.append("🎊 勝者は ").append(attacker.getName()).append(" です！！\n");
                break;
            }

            // 入れ替え
            Monster tmp = attacker;
            attacker = defender;
            defender = tmp;
            turn++;
        }


            return log.toString();
    }
}