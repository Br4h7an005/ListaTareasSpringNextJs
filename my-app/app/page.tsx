import { createTask, deleteTask, toggleTask } from "./actions";
import { taskService } from "@/services/api";
import { Task } from "@/types/Task";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";

export default async function Home() {
  const tasks: Task[] = await taskService.getAll();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10 bg-white">
      <h1 className="text-3xl font-bold text-gray-900">Lista de Tareas</h1>

      <TaskForm createTask={createTask} />

      <section aria-label="Tareas">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas. Crea la primera.</p>
        ) : (
          <ul className="flex flex-col">
            {tasks.map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
