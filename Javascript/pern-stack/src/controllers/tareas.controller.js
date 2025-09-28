import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  UPDATE_TASK,
} from "./constants.js";

class TareasController {
  constructor({ taskDB }) {
    this.taskDB = taskDB;
  }
  async getAllTasks(req, res) {
    try {
      const result = this.taskDB.query(GET_ALL_TASKS);
      if (result.rows.length === 0) res.status(400).json({ info: "No hay tareas en la DB" });

      const allTasks = result.rows.map((row) => row);

      res.status(200).json({ tareas: allTasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los datos: " + error.message });
    }
  }

  async getTaskById(req, res) {
    const id = req.params.id;
    try {
      const result = this.taskDB.query(GET_TASK_BY_ID, [id])
      if (result.rows.length === 0) res.status(400).json({ info: "No se encontró la tarea" });

      const task = result.rows[0];

      res.status(200).json({ tarea: task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener tarea po ID: " + error.message });
    }
  }

  async createTask(req, res) {
    const task = { titulo: req.body.titulo, descripcion: req.body.descripcion };
    try {
      const result = this.taskDB.query(
        CREATE_TASK,
        [task.titulo, task.descripcion]
      );
      const created = result.rows.map((row) => row);

      res.status(200).json({ success: "Tarea creada", created });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear tarea: " + error.message });
    }
  }

  async updateTask(req, res) {
    const task = {
      id: req.params.id,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
    };
    try {
      const result = this.taskDB.query(
        UPDATE_TASK,
        [task.id, task.titulo, task.descripcion, true]
      );
      res.status(200).json({
        success: "Se ha actualizado la tarea con éxito!",
        task: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar tarea: " + error.message,
      });
    }
  }

  async deleteTask(req, res) {
    const id = req.params.id;

    try {
      const result = this.taskDB.query(DELETE_TASK, [id]);
      res.status(200).json({
        success: "Se ha eliminado la tarea con éxito!",
        task: result.rows[0],
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al borrar tarea" + error.message });
    }
  }
}

export { TareasController };
