package com.example.TodoList.service;

import com.example.TodoList.dto.TaskResponse;
import com.example.TodoList.entity.Task;
import com.example.TodoList.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
  private final TaskRepository taskRepository;
  
  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }
  
  public List<TaskResponse> getAllTasks() {
    return taskRepository.findAll()
      .stream()
      .map(this::mapToResponse)
      .toList();
  }
  
  
  private TaskResponse mapToResponse(Task task) {
    return new TaskResponse(
      task.getId(),
      task.getTitle(),
      task.getDescription(),
      task.getCompleted(),
      task.getCreatedAt()
    );
  }
}
