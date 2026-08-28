"use client";

import { useState } from "react";
import type { Task } from "@/types/Task";
import  Modal from "./Modal";

interface TaskItemProps {
  task: Task;
  toggleTask: (formData: FormData) => Promise<void>;
  deleteTask: (formData: FormData) => Promise<void>;
}

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
}: TaskItemProps) {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <article
      className={`mb-2 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="min-w-0">
        <h4
          className={`text-lg font-semibold ${
            task.completed ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {task.title}
        </h4>

        {task.description && (
          <p className="mt-1 text-sm text-gray-600">{task.description}</p>
        )}
      </div>

      <div className="ml-4 flex shrink-0 gap-2">
        <form>
          <input type="hidden" name="id" value={task.id} />

          <button
            type="submit"
            formAction={toggleTask}
            className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
          >
            {task.completed ? "Desmarcar" : "Completar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
        >
          Eliminar
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar Eliminación"
      >
        <form action={deleteTask} className="w-full">
          <input type="hidden" name="id" value={task.id} />

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
          >
            Sí, Eliminar
          </button>
        </form>
      </Modal>
    </article>
  );
}
