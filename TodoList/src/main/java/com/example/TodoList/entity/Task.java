package com.example.TodoList.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false, length = 150)
  private String title;
  
  @Column(columnDefinition = "TEXT")
  private String description;
  
  @Column(nullable = false)
  private Boolean completed;
  
  @Column(name= "created_at", updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();
}
