"use client";

interface TaskFormProps {
  createTask: (formData: FormData) => Promise<void>;
}

export default function TaskForm({ createTask }: TaskFormProps) {
  return (
    <form
      action={createTask}
      className="flex max-w-xl flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-900">Crear Tarea</h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-900">
          Título
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="Sacar al perro"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-900"
        >
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Sacar al perro a pasear a las 6pm"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
      >
        Agregar Tarea
      </button>
    </form>
  );
}
