import type { Task, TaskInput } from "@/types/Task";
import { handleResponse } from "@/utils/HandleResponse";

// Obtener endpoint de la API desde las variables de entorno o usar un valor por defecto
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1/tasks";


export const taskService = {
    /**
     * Obtiene todas las tareas desde la API.
     * @returns Una promesa que resuelve con un array de tareas.
     */
    async getAll(): Promise<Task[]> {
        console.log("Buscando tareas en la API: ", API_URL);
        const response = await fetch(API_URL);
        return handleResponse<Task[]>(response);
    },

    /**
     * Crear una nueva tarea
     * @param taskInput - Objeto que contiene los datos de la tarea a crear.
     * @returns Promise<Task> - Una promesa que resuelve con la tarea creada.
     */
    async create(taskInput: TaskInput): Promise<Task> {
        console.log("Creando tarea en la API: ", API_URL, taskInput);
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskInput),
        });
        return handleResponse<Task>(response);
    },

    /**
     * Alternar el estado de completado de una tarea
     * @param taskId - Id de la tarea a actualizar.
     * @returns Promise<Task> - Una promesa que resuelve con la tarea actualizada.
     */
    async toggleCompleted(taskId: number): Promise<Task> {
        console.log("Alternando estado de completado de la tarea en la API: ", API_URL, taskId);
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "PATCH",
        });

        return handleResponse<Task>(response);
    },

    /**
     * Eliminar una tarea
     * @param taskId - Id de la tarea
     * @return Promise<void> - Una promesa que se resuelve cuando la tarea ha sido eliminada.
     */
    async delete(taskId: number): Promise<void> {
        console.log("Eliminando tarea en la API: ", API_URL, taskId);
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "DELETE",
        });

        if (!response.ok && response.status !== 404) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
    }
}
