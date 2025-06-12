package com.example.demo;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@MapperScan("com.example.demo.mapper")
public class BackendApplicationTests {

    @Test
    void contextLoads() {
        // Springのアプリコンテキストが正しく起動するかテスト
    }
}
