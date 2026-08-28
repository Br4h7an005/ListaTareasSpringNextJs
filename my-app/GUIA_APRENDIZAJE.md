# 🎓 Guía de Estudio — La Fase 1 explicada con el Método Feynman

> **Método Feynman**: si no lo puedes explicar de forma simple, es que no lo has entendido bien.
> Esta guía está escrita para que **tú** puedas explicarle a otra persona lo que aprendimos,
> paso a paso, con el "porqué" de cada decisión.

---

## 0. ¿Qué hicimos y por qué?

Tu app de lista de tareas tenía dos "mitades":

- **Backend**: Spring Boot + Progress (en Docker, con `fetch` a `http://localhost:8080/api/v1/tasks`).
- **Frontend**: Next.js (App Router), con componentes, hooks, servicios y tipos.

El problema era que el frontend estaba escrito **como si fuera una SPA clásica**
(React puro): todo el estado y las llamadas a la API se hacían desde el navegador
(cliente), con `useState`, `useEffect` y `fetch` directo.

En la Fase 1 **migramos al estándar de Next.js**: mover la lectura de datos y las
mutaciones **al servidor**, usando **Server Components** y **Server Actions**.

**Beneficio en una frase**: el navegador recibe HTML ya renderizado con tus tareas,
sin CORS, sin "flash de carga", y con menos JavaScript que ejecutar.

---

## 1. El concepto clave: Server Components vs Client Components

En Next.js, cada componente se ejecuta en **uno de dos entornos**. Esto es lo primero
que hay que entender, porque todo lo demás depende de esto.

| | **Server Component** | **Client Component** |
|---|---|---|
| ¿Dónde corre? | En el **servidor** de Next.js | En el **navegador** |
| ¿Puede hacer `async`/`await` de datos? | ✅ Sí | ❌ No (se renderiza en el server y "hidrata") |
| ¿Puede usar `useState`, `onClick`, `useEffect`? | ❌ No | ✅ Sí |
| ¿Queda algo en el JS del navegador? | Solo el HTML renderizado | Sí, su código viaja al cliente |
| ¿Es el valor por defecto? | ✅ Sí (a menos que pongas `"use client"`) | Solo si le pones `"use client"` arriba |

**Regla de oro de Next.js**:
> *"Mueve todo el código posible al servidor; usa el cliente solo donde haga falta
> interactividad (estado, eventos del usuario)."*

### ¿Por qué conviene mover el código al servidor?

1. **Sin CORS** — CORS es una protección del *navegador*. Si el `fetch` lo hace el
   servidor de Next (no el navegador), no hay CORS.
2. **HTML listo al instante** — el usuario recibe la lista ya renderizada. Mejor para
   SEO y para la percepción de velocidad.
3. **Menos JavaScript** — el navegador recibe menos código que descargar y ejecutar.

### ¿Cómo saber qué necesita `"use client"`?

Solo agrega `"use client"` si el componente usa **interactividad**: botones con
`onClick`, `useState`, `useEffect`, formularios, etc. En nuestra app:

- `TaskForm` y `TaskItem` → `"use client"` (tienen botones e inputs).
- `page.tsx` → **sin** `"use client"` (renderiza datos del servidor).

---

## 2. Paso 1 — Convertir la página en un Server Component async

**Antes** (`app/page.tsx` era el template de create-next-app, estático).

**Después** — la página ahora es `async` y hace el `fetch` en el servidor:

```tsx
// app/page.tsx  (SERVER COMPONENT — sin "use client")
import { createTask, deleteTask, toggleTask } from "./actions";
import { taskService } from "@/services/api";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";

export default async function Home() {
  // ESTE fetch corre en el servidor de Next.js, no en el navegador
  const tasks = await taskService.getAll();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Lista de Tareas</h1>

      <TaskForm createTask={createTask} />

      <section aria-label="Tareas">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas. Crea la primera.</p>
        ) : (
          <ul className="flex flex-col">
            {tasks.map((task) => (
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
```

### ¿Qué está pasando aquí, línea por línea (en lenguaje simple)?

1. **`export default async function Home()`**
   Como es un Server Component, puede ser `async`. Esto es lo que le permite
   `await` el fetch de datos.

2. **`const tasks = await taskService.getAll();`**
   Next.js ejecuta esta línea **en el servidor**. Espera a que Spring responda y
   *entonces* renderiza la página. Por eso el navegador recibe el HTML con las
   tareas ya puestas. **Ya no hay `useEffect` ni `useState` para cargar datos.**

3. **`<TaskForm createTask={createTask} />`**
   El Server Component le pasa una **Server Action como prop** a un componente
   client. Esto es el "puente" estándar de Next.js: el código pesado (mutar datos)
   vive en el server, pero el componente interactivo lo invoca.

4. **`{tasks.map((task) => <TaskItem key={task.id} ... />)}`**
   Renderizamos una tarea por cada elemento. Fíjate que **`key={task.id}`** es
   obligatorio en listas (React lo usa para identificar cada elemento).

> **💡 Ojo (importante para entender esta versión de Next)**
> En versiones anteriores de Next, `fetch` estaba *cacheado por defecto*. En esta
> versión ya **no** lo está: cada render pide datos frescos a Spring. Para una lista
> de tareas que cambia constantemente, es justo lo que queremos.

---

## 3. Paso 2 — Crear las Server Actions (`app/actions.ts`)

### ¿Qué es una Server Action?

Es una **función `async` marcada con `"use server"`** que se ejecuta **en el servidor**.

Dos características clave:

1. **Solo se invocan con POST** — por dentro, Next las expone como un endpoint POST.
   Por eso solo sirven para **mutar** (crear, actualizar, borrar), no para leer.
2. **Se llaman desde el cliente, pero corren en el servidor** — así no exponemos la
   lógica ni secretos al navegador, y tampoco hay CORS.

### ¿Qué es `refresh()`?

Cuando la Server Action termina, llamamos a `refresh()` (de `next/cache`). Esto le
dice al servidor: *"re-renderiza la página con datos frescos"*. El navegador **no
recarga**, pero la UI se actualiza sola.

> Esto es nuestro **Enfoque A**: el cliente *no* guarda la lista en memoria. Después
> de crear/toggle/borrar, el servidor re-fetcha de Spring, re-renderiza y envía el
> HTML actualizado.

```ts
// app/actions.ts  ("use server" → TODAS estas funciones corren en el servidor)
"use server";

import { refresh } from "next/cache";
import { taskService } from "@/services/api";

export async function createTask(formData: FormData): Promise<void> {
  // FormData llega automáticamente desde el formulario
  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim();

  if (!title) {
    throw new Error("El título es obligatorio");
  }

  await taskService.create({ title, description: description || undefined });

  refresh(); // "Dame la página de nuevo con los datos actualizados"
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
```

### ¿Qué es `FormData` y de dónde sale?

`FormData` es un objeto del navegador que agrupa los valores de un formulario.
Cuando un `<form action={createTask}>` se envía, Next le pasa a `createTask` un
`FormData` con todo lo que tenga un atributo `name`.

Por eso en `TaskForm` los inputs tendrán `name="title"` y `name="description"`, y en
`TaskItem` habrá un `<input type="hidden" name="id" value={task.id} />`.

---

## 4. Paso 3 — El formulario con Server Actions (`TaskForm.tsx`)

### El cambio de paradigma en formularios

**Antes (SPA clásica):**
- Cada input tenía `value` y `onChange` → *controlled inputs* con `useState`.
- En `onSubmit`, leías el estado, validabas con `alert()`, y hacías `fetch`.

**Después (estándar Next.js):**
- El `<form>` usa la **propiedad `action`** que apunta a la Server Action.
- Los inputs son **uncontrolled**: solo tienen `name`, sin `value`/`onChange`.
- La Server Action recibe el `FormData` y hace todo: validación + fetch + refresh.

```tsx
// components/TaskForm.tsx  ("use client" — tiene interactividad)
"use client";

interface TaskFormProps {
  createTask: (formData: FormData) => Promise<void>;
}

export default function TaskForm({ createTask }: TaskFormProps) {
  return (
    // El `action` apunta a la Server Action que se pasa como prop
    <form action={createTask} className="...">
      <h3 className="text-xl font-semibold">Crear Tarea</h3>

      <input
        id="title"
        name="title"        // ← clave: sirve para leerlo desde FormData
        type="text"
        placeholder="Sacar al perro"
        required             // validación básica del navegador
      />

      <textarea
        id="description"
        name="description"   // ← también lo lee FormData
        placeholder="Sacar al perro a pasear a las 6pm"
      />

      <button type="submit">Agregar Tarea</button>
    </form>
  );
}
```

### ¿Por qué los inputs ya no usan `useState`?

Porque ya no necesitamos "controlar" el valor en el navegador. La Server Action lee
los valores directamente del `FormData` que envía el formulario. Esto simplifica todo
y elimina el hook `useTaskForm.ts` que teníamos.

### ¿Por qué quitamos `alert()`?

`alert()` es un objeto del **navegador** y no existe en el **servidor**. La validación
(`título obligatorio`) ahora vive dentro de la Server Action, en el servidor. Por
ahora lanza un error; en fases siguientes lo haremos más elegante (con mensaje en
pantalla).

### ¿Por qué se mantiene `"use client"`?

Porque el formulario es **interactivo** (hay botones e inputs con eventos del
usuario). El `"use client"` **no** significa "todo corre en el cliente": solo hace que
el componente sea interactivo. La Server Action que recibe (`createTask`) sigue
corriendo en el servidor.

### 🎁 Bonus: Progressive Enhancement

Este formulario funcionaría **incluso si JavaScript estuviera deshabilitado**, porque
`<form action>` es una característica del HTML puro. En las SPA clásicas, sin JS el
formulario muere.

---

## 5. Paso 4 — `TaskItem.tsx` y cómo invocar acciones desde botones

Igual que `TaskForm`, `TaskItem` es un **client component** que recibe las Server
Actions como **props** desde el Server Component (la página).

Los botones se invocan así:
- Con `formAction` en cada botón (o `onClick`).
- Un `<input type="hidden" name="id">` lleva el id al `FormData` de la acción.

```tsx
// components/TaskItem.tsx  ("use client")
"use client";

import type { Task } from "@/types/Task";

interface TaskItemProps {
  task: Task;
  toggleTask: (formData: FormData) => Promise<void>;
  deleteTask: (formData: FormData) => Promise<void>;
}

export default function TaskItem({ task, toggleTask, deleteTask }: TaskItemProps) {
  return (
    <article className="...">
      <div className="min-w-0">
        <h4 className={task.completed ? "...line-through" : "..."}>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>

      {/* Un pequeño formulario que agrupa los botones de acción */}
      <form className="ml-4 flex shrink-0 gap-2">
        {/* El id viaja en el FormData de cada acción */}
        <input type="hidden" name="id" value={task.id} />

        <button
          type="submit"
          formAction={toggleTask}   // ← invoca la Server Action
        >
          {task.completed ? "Desmarcar" : "Completar"}
        </button>

        <button
          type="submit"
          formAction={deleteTask}   // ← invoca la Server Action
        >
          Eliminar
        </button>
      </form>
    </article>
  );
}
```

### ¿Cómo fluye la información? (para que lo expliques bien)

1. El **Server Component** (`page.tsx`) pasa `toggleTask` y `deleteTask` como props.
2. En el **cliente** (`TaskItem`), el botón `formAction={toggleTask}` dispara.
3. Next.js envía el `FormData` (con el `id`) al **servidor**.
4. La **Server Action** corre en el servidor, llama a Spring (`PATCH`/`DELETE`).
5. `refresh()` re-renderiza la página con datos frescos.
6. El navegador muestra el resultado **sin recargar**.

---

## 6. Lo que dejamos de usar (limpieza)

- **`hooks/useTaskForm.ts`** → eliminado. Ya no hace falta un hook para controlar los
  inputs del formulario; la Server Action lee el `FormData`.
- **`useState`/`useEffect` para cargar tareas** → eliminados de la página. El Server
  Component `await` el fetch directamente.

### ¿Qué archivos quedaron?

```
my-app/
├── app/
│   ├── page.tsx          → SERVER COMPONENT (fetch en el servidor)
│   ├── actions.ts        → SERVER ACTIONS (mutar + refresh)
│   ├── layout.tsx        → layout raíz (sin cambios)
└── components/
    ├── TaskForm.tsx      → client, form uncontrolled con action
    ├── TaskItem.tsx      → client, recibir actions como props
└── services/
    └── api.ts            → capa de fetch (sin cambios en esta fase)
└── types/
    └── Task.ts           → tipos (sin cambios)
```

---

## 7. Cómo lo verificamos (y por qué cada paso)

1. **`npm run lint`** → revisa estilo y problemas de código. Pasó limpio.
2. **`npm run build`** → compila y valida tipos. Durante el build vimos el log
   `Buscando tareas en la API: ...` → prueba de que **el fetch corre en el servidor**.
3. **Prueba en vivo** (`next dev`) → pedimos `http://localhost:3000` y encontramos en
   el HTML la tarea "Avanzar Proyecto" que vino de Spring. Confirmamos que el servidor
   renderizó los datos reales.

---

## 8. Resumen en 10 frases (para memorizar y explicar)

1. En Next.js, los componentes corren en el **servidor** o en el **cliente**.
2. Por defecto son **Server Components**; usamos `"use client"` solo si hay interactividad.
3. El **fetch de datos inicial** se hace en un Server Component `async`, en el servidor → sin CORS y HTML listo.
4. Las **mutaciones** (crear/editar/borrar) se hacen con **Server Actions** (`"use server"`).
5. Las Server Actions **solo se invocan por POST** y corren en el servidor.
6. El `<form action={acction}>` usa **inputs uncontrolled** con `name` → la acción recibe `FormData`.
7. Después de mutar, `refresh()` (de `next/cache`) re-renderiza la página con datos frescos, sin recargar.
8. Un **Server Component puede pasar Server Actions como props** a componentes client.
9. Los `client components` siguen teniendo las acciones en el server: solo se vuelven interactivos.
10. Ya no necesitamos `useState`/`useEffect` para cargar datos ni `alert()` del navegador.

---

## 9. Experimento para interiorizar (hazlo tú)

1. Abre `http://localhost:3000`. Crea una tarea nueva.
   - ¿Qué pasa con la lista? → Debe aparecer **sin recargar la página** (gracias a `refresh()`).
2. Sin usar el navegador, observa la terminal de `next dev`.
   - Verás los `console.log` de `services/api.ts` imprimiendo **en el servidor**,
     no en la consola del navegador. Esa es la señal de que el fetch corre en el server.
3. Marca una tarea como completada y recarga la página.
   - Sigue marcada → porque el estado vive en la **base de datos** (Spring), no en el navegador.
