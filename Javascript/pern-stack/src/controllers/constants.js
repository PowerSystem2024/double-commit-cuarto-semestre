const GET_ALL_TASKS = "SELECT * FROM tareas;";
const GET_TASK_BY_ID = "SELECT * FROM tareas WHERE tarea_id = $1";
const CREATE_TASK =
  "INSERT INTO tareas(titulo, descripcion) VALUES($1, $2) RETURNING *";
const UPDATE_TASK =
  "UPDATE tareas SET titulo = $2, descripcion = $3, actualizado = $4 WHERE tarea_id = $1 RETURNING *";
const DELETE_TASK = "DELETE FROM tareas WHERE tarea_id = $1 RETURNING *";

export { GET_ALL_TASKS, GET_TASK_BY_ID, CREATE_TASK, UPDATE_TASK, DELETE_TASK };
