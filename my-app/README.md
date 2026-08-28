# 📝 Todo List — Frontend

Aplicación web de una **lista de tareas** desarrollada con **Next.js**, como parte de un proyecto de aprendizaje orientado a comprender cómo se integran un frontend, un backend y una base de datos.

El proyecto busca practicar conceptos fundamentales del stack:

* ⚛️ **Next.js / React**
* 🔷 **TypeScript**
* 🎨 **Tailwind CSS**

---

## 🚀 Tecnologías utilizadas

| Tecnología       | Uso                                       |
| ---------------- | ----------------------------------------- |
| **Next.js**      | Framework para el desarrollo del frontend |
| **React**        | Construcción de componentes e interfaz    |
| **TypeScript**   | Tipado estático                           |
| **Tailwind CSS** | Estilos y diseño de la interfaz           |


---

## 📌 Funcionalidades

Actualmente, el proyecto está orientado a implementar las operaciones básicas de una lista de tareas:

* ➕ Crear tareas
* 📋 Consultar tareas
* ✏️ Actualizar tareas
* ✅ Marcar tareas como completadas
* 🗑️ Eliminar tareas

La comunicación entre el frontend y el backend se realiza mediante una **API REST**.

---

## 🏗️ Arquitectura del proyecto

La aplicación está dividida en diferentes servicios:

```text
                 ┌──────────────────┐
                 │    Next.js       │
                 │    Frontend      │
                 │    :3000         │
                 └────────┬─────────┘
                          │
                          │ HTTP / REST
                          ▼
                 ┌──────────────────┐
                 │   Spring Boot   │
                 │    Backend      │
                 │      :8080      │
                 └────────┬─────────┘
                          │
                          │ JDBC
                          ▼
                 ┌──────────────────┐
                 │   PostgreSQL     │
                 │      :5432       │
                 └──────────────────┘
```

Docker Compose se utiliza para facilitar la ejecución de los diferentes servicios.

---

## 📂 Estructura general

```text
TodoList/
│
├── my-app/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── TodoList/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── ...
│
├── compose.yaml
└── README.md
```

> La estructura puede cambiar a medida que el proyecto evolucione.

---

## ⚙️ Requisitos

Antes de ejecutar el proyecto necesitas tener instalado:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

---

## 💻 Ejecutar el frontend en desarrollo

Primero, entra en la carpeta del frontend:

```bash
cd frontend
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Después abre:

```text
http://localhost:3000
```

La aplicación se actualizará automáticamente cuando realices cambios en el código.

---

## 🐳 Ejecutar con Docker

El backend del proyecto está configurado para ejecutarse mediante Docker Compose:

```bash
docker compose up -d --build
```

Este comando construye las imágenes necesarias y levanta los servicios definidos en `compose.yaml`.

Para comprobar los contenedores:

```bash
docker compose ps
```

Para visualizar los logs:

```bash
docker compose logs -f
```

Para detener los servicios:

```bash
docker compose down
```

---

## 🔌 Comunicación con el Backend

El frontend se comunica con el backend mediante solicitudes HTTP a la API REST de Spring Boot.

Durante el desarrollo, el backend estará disponible normalmente en:

```text
http://localhost:8080
```

El frontend utiliza los endpoints proporcionados por Spring Boot para crear, consultar, actualizar y eliminar tareas.

---

## 📚 Objetivo del proyecto

Este proyecto fue creado principalmente con fines de **aprendizaje y práctica**.

El objetivo es comprender de manera práctica cómo trabajar con un stack moderno compuesto por:

```text
Next.js
   ↓
Spring Boot
   ↓
PostgreSQL
   ↓
Docker
```

Además, permite practicar conceptos como:

* Arquitectura cliente-servidor
* API REST
* Componentes de React
* TypeScript
* Consumo de APIs
* Persistencia de datos
* JPA / Hibernate
* Maven
* Docker y Docker Compose
* Comunicación entre contenedores

---

## 🧠 Aprendizajes

Durante el desarrollo del proyecto se busca reforzar principalmente:

### Frontend

* Componentes reutilizables
* Props y estado
* Hooks de React
* Formularios
* Peticiones HTTP
* Tipado con TypeScript
* Organización del código

### Backend

* Spring Boot
* Controladores REST
* Servicios
* Repositorios
* Entidades JPA
* DTOs
* Manejo de excepciones
* Conexión con PostgreSQL

### DevOps

* Dockerfile
* Imágenes y contenedores
* Docker Compose
* Variables de entorno
* Redes entre contenedores
* Persistencia mediante volúmenes

---

## 📖 Recursos

* [Documentación de Next.js](https://nextjs.org/docs?utm_source=chatgpt.com)
* [Documentación de React](https://react.dev/?utm_source=chatgpt.com)
* [Documentación de Spring Boot](https://spring.io/projects/spring-boot?utm_source=chatgpt.com)
* [Documentación de PostgreSQL](https://www.postgresql.org/docs/?utm_source=chatgpt.com)
* [Documentación de Docker](https://docs.docker.com/?utm_source=chatgpt.com)

---

## 👨‍💻 Estado del proyecto

🚧 **En desarrollo**

El proyecto se encuentra en construcción y se irán incorporando nuevas funcionalidades y mejoras a medida que avance el aprendizaje del stack.

---

⭐ Proyecto desarrollado con fines educativos para aprender y practicar **Next.js + Spring Boot + PostgreSQL + Docker**.
