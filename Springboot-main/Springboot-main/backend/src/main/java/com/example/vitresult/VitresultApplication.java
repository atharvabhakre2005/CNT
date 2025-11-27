package com.example.vitresult;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VitresultApplication {
    public static void main(String[] args) {
        SpringApplication.run(VitresultApplication.class, args);
        System.out.println("🚀 Spring Boot + MongoDB VIT Result API started on http://localhost:8080");
    }
}
