package com.example.TodoList.service;

import com.example.TodoList.dto.TaskCreateRequest;
import com.example.TodoList.dto.TaskResponse;
import com.example.TodoList.entity.Task;
import com.example.TodoList.exception.ResourceNotFoundException;
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
  
  public TaskResponse getTaskById(Long id) {
    Task task = searchTaskById(id);
    return mapToResponse(task);
  }
  
  public TaskResponse createTask(TaskCreateRequest request) {
    Task task = new Task(request.title(), request.description());
    Task createdTask = taskRepository.save(task);
    return mapToResponse(createdTask);
  }
  
  public TaskResponse toggleTaskStatus(Long id) {
    Task task = searchTaskById(id);
    
    task.setCompleted(!task.getCompleted());
    Task updatedTask = taskRepository.save(task);
    return mapToResponse(updatedTask);
  }
  
  public void deleteTask(Long id) {
    Task task = searchTaskById(id);
    
    taskRepository.delete(task);
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
  
  private Task searchTaskById(Long id) {
    return taskRepository.findById(id)
      .orElseThrow(() ->
        new ResourceNotFoundException("Tarea con Id: " + id + " no encontrada"));
  }
}
