package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.model.Monster;

@Mapper
public interface MonsterMapper {
    List<Monster> findAll();
    Monster findById(Long id);
    void insert(Monster monster);
    void update(Monster monster);
    void delete(Long id);
}