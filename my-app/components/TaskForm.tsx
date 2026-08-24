'use client';


import { useTaskForm } from '@/hooks/useTaskForm';
import type { TaskInput } from '@/types/Task';

interface TaskFormProps {
    onTaskCreated: (taskInput: TaskInput) => Promise<void>;
}

export default function TaskForm({
    onTaskCreated,
}: TaskFormProps) {
    const { 
        formData, 
        setFormData, 
        resetForm, 
        getFormData 
    } = useTaskForm();

    const handleSubmit = async (
        event: React.SubmitEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const { title, description } = getFormData();

        if (!title.trim()) {
            alert('El título es obligatorio');
            return;
        }

        await onTaskCreated(getFormData());

        resetForm();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-xl flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h3 className="text-xl font-semibold">
                Crear Tarea
            </h3>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                >
                    Título
                </label>

                <input
                    id="title"
                    type="text"
                    placeholder="Sacar al perro"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                >
                    Descripción
                </label>
                
                <textarea
                    id="description"
                    placeholder="Sacar al perro a pasear a las 6pm"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            
            <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Agregar Tarea
            </button>
        </form>
    )
}
