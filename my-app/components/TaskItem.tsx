'use client';

import type { Task } from '@/types/Task';


interface TaskItemProps {
    task: Task;
    onToggle: (taskId: number) => Promise<void>;
    onDelete: (taskId: number) => Promise<void>;
}

export default function TaskItem(
    { 
        task, 
        onToggle, 
        onDelete 
    }: TaskItemProps) {
    
    return (
        <article
            className={`mb-2 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${
                task.completed ? 'opacity-60' : ''
            }`}
        >
            <div className="min-w-0">
                <h4
                    className={`text-lg font-semibold ${
                        task.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-800'
                    }`}
                >
                    {task.title}
                </h4>

                {task.description && (
                    <p className={`mt-1 text-sm text-gray-600`}>
                        {task.description}
                    </p>
                )}
            </div>

            <div className="ml-4 flex shrink-0 gap-2">
                <button
                    type="button"
                    onClick={() => onToggle(task.id)}
                    className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                    {task.completed ? 'Desmarcar' : 'Completar'}
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(task.id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Eliminar
                </button>
            </div>
        </article>
    )
}