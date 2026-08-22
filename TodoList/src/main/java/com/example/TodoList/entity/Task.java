package com.example.TodoList.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tasks")
@NoArgsConstructor
@Getter
@Setter
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false, length = 150)
  private String title;
  
  @Column(columnDefinition = "TEXT")
  private String description;
  
  @Column(nullable = false)
  private Boolean completed = Boolean.FALSE;
  
  @Column(name= "created_at", updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();
  
  public Task(String title, String description) {
    this.title = title;
    this.description = description;
  }
}
