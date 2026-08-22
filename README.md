# 📝 Todo List — Full Stack

Aplicación web de lista de tareas desarrollada como un proyecto de aprendizaje para comprender los fundamentos de un **stack Full Stack moderno**, integrando backend, frontend, base de datos y contenedores.

El objetivo principal del proyecto es aprender cómo se comunican las diferentes tecnologías que forman parte de una aplicación web completa.

---

## 🚀 Tecnologías utilizadas

| Tecnología        | Uso                                            |
| ----------------- | ---------------------------------------------- |
| ☕ **Spring Boot** | Desarrollo de la API REST y lógica del backend |
| ⚛️ **Next.js**    | Desarrollo de la interfaz web                  |
| 🐘 **PostgreSQL** | Base de datos                                  |
| 🐳 **Docker**     | Contenerización de servicios                   |
| 🔗 **REST API**   | Comunicación entre frontend y backend          |

---

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura sencilla donde cada tecnología tiene una responsabilidad específica:

```text
┌─────────────────────┐
│      Next.js        │
│      Frontend       │
└──────────┬──────────┘
           │
           │ HTTP / REST
           ▼
┌─────────────────────┐
│     Spring Boot     │
│       Backend       │
└──────────┬──────────┘
           │
           │ JDBC / JPA
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│      Database       │
└─────────────────────┘

        🐳 Docker
   Contenedores / Servicios
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue creado principalmente para practicar y comprender:

* Fundamentos de **Spring Boot**.
* Creación de APIs REST.
* Comunicación entre frontend y backend.
* Uso de **Next.js** para construir interfaces web.
* Conexión de Spring Boot con PostgreSQL.
* Conceptos básicos de persistencia de datos.
* Uso de **Docker** para ejecutar servicios.
* Configuración de variables de entorno.
* Comunicación entre diferentes servicios de una aplicación.

---

## ✨ Funcionalidades

Actualmente, la aplicación está enfocada en las operaciones básicas de una lista de tareas:

* ➕ Crear tareas.
* 📋 Consultar tareas.
* ✏️ Actualizar tareas.
* 🗑️ Eliminar tareas.
* ✅ Marcar tareas como completadas.

> El proyecto se encuentra en desarrollo y puede incorporar nuevas funcionalidades durante el proceso de aprendizaje.

---

## 📂 Estructura del proyecto

```text
todo-list/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   ├── public/
│   └── package.json
│
├── compose.yaml
│
└── README.md
```

La estructura puede cambiar a medida que el proyecto evolucione.

---

## 🐳 Docker

Docker se utiliza para facilitar la ejecución de los servicios necesarios para el proyecto.

Actualmente se utiliza PostgreSQL mediante una imagen de Docker y se integra con el backend desarrollado en Spring Boot.

Ejemplo de los servicios:

```text
Docker
│
├── PostgreSQL
│
└── Spring Boot
```

El objetivo es posteriormente poder levantar el entorno completo mediante:

```bash
docker compose up
```

---

## ⚙️ Requisitos

Para ejecutar el proyecto necesitas tener instalado:

* [Java](https://www.oracle.com/java/)
* [Maven](https://maven.apache.org/)
* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* Git

---

## ▶️ Ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd todo-list
```

### 2. Levantar los servicios

```bash
docker compose up -d
```

### 3. Ejecutar el Backend

Desde la carpeta del backend:

```bash
./mvnw spring-boot:run
```

En Windows:

```bash
mvnw.cmd spring-boot:run
```

### 4. Ejecutar el Frontend

Desde la carpeta del frontend:

```bash
npm install
npm run dev
```

Después puedes acceder al frontend desde:

```text
http://localhost:3000
```

Y al backend desde:

```text
http://localhost:8080
```

---

## 📚 Lo aprendido

Este proyecto forma parte de mi proceso de aprendizaje de desarrollo **Full Stack**.

A través de él estoy aprendiendo a pasar de trabajar principalmente con aplicaciones individuales a construir sistemas donde diferentes tecnologías trabajan conjuntamente:

```text
Frontend
   ↓
API REST
   ↓
Backend
   ↓
Base de datos
```

Además, Docker permite tener los diferentes servicios aislados y facilita la configuración del entorno de desarrollo.

---

## 🔮 Próximos pasos

Algunas mejoras que pueden incorporarse al proyecto:

* [ ] Autenticación de usuarios.
* [ ] Registro e inicio de sesión.
* [ ] Tareas asociadas a usuarios.
* [ ] Categorías de tareas.
* [ ] Fechas límite.
* [ ] Filtros y búsqueda.
* [ ] Mejoras en la interfaz.
* [ ] Dockerización completa del proyecto.
* [ ] Variables de entorno para producción.
* [ ] Despliegue de la aplicación.

---

## 👨‍💻 Autor

**Brahian Cortés**

Proyecto desarrollado con fines educativos y de aprendizaje práctico sobre desarrollo Full Stack con Java, Spring Boot, Next.js, PostgreSQL y Docker.

---

⭐ Si este proyecto te resulta interesante, puedes darle una estrella al repositorio.
