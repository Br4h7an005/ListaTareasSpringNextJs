package com.example.TodoList.controller;

import com.example.TodoList.dto.TaskCreateRequest;
import com.example.TodoList.dto.TaskResponse;
import com.example.TodoList.entity.Task;
import com.example.TodoList.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
  private final TaskService taskService;
  
  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }
  
  @GetMapping
  public ResponseEntity<List<TaskResponse>> getAllTasks() {
    return ResponseEntity.ok(taskService.getAllTasks());
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id){
    return ResponseEntity.ok(taskService.getTaskById(id));
  }
  
  @PostMapping
  public ResponseEntity<TaskResponse> createTask(@RequestBody TaskCreateRequest request) {
    TaskResponse response = taskService.createTask(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
  
  @PatchMapping("/{id}")
  public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id) {
    return ResponseEntity.ok(taskService.toggleTaskStatus(id));
  }
  
  @DeleteMapping
  public ResponseEntity<Void> deleteTask(@RequestParam Long id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }
}
