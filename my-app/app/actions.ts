"use server";

import { refresh } from "next/cache";
import { taskService } from "@/services/api";

export async function createTask(formData: FormData): Promise<void> {
  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim();

  if (!title) {
    throw new Error("El título es obligatorio");
  }

  await taskService.create({ title, description: description || "Sin descripción" });

  refresh();
}

export async function toggleTask(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  await taskService.toggleCompleted(id);

  refresh();
}

export async function deleteTask(formData: FormData): Promise<void> {
  
  const id = Number(formData.get("id"));

  await taskService.delete(id);

  refresh();
}
