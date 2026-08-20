package com.example.TodoList.dto;

public record TaskCreateRequest(
  String title,
  String description
) {}
