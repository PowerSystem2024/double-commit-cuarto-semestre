# Proyecto PERN - Gestor de Tareas ✅

Aplicación sencilla con stack PERN que permite crear, leer, actualizar y eliminar (CRUD) tareas.

### 🚀 Tecnologías

- PostgreSQL – Base de datos relacional.

- Express.js – Framework backend en Node.js.

- React.js – Frontend con componentes reutilizables.

### 📌 Endpoints API

- GET /tasks → Obtener todas las tareas.

- GET /tasks/:id → Obtener una tarea por ID.

- POST /tasks → Crear una nueva tarea.

- PUT /tasks/:id → Actualizar una tarea existente.

- DELETE /tasks/:id → Eliminar una tarea.

🧪 Pruebas con Rest Client

Podés instalar la extensión en VSCode 👉 [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Archivo api_test.http:

```bash

### Recuperar todas las tareas

GET http://localhost:5000/api/tareas

### Recuperar tarea por id

GET http://localhost:5000/api/tarea/1

### Crear tarea

POST http://localhost:5000/api/tarea
Content-Type: application/json

{
"id": 1,
"date": "08 de Septiembre, 2025",
"title": "Crear aplicación",
"description": "Aplicación de E-Commerce para UTN",
}

```

```

```
