import { CREATE_TASK, DELETE_TASK, GET_ALL_TASKS, GET_TASK_BY_ID, GET_TASK_BY_TITLE, UPDATE_TASK } from "./constants.js";

class ControladorTareas {
  constructor({ taskDB }) {
    this.taskDB = taskDB;
  }

  obtenerTodasLasTareas = async (req, res) => {
    try {
      const result = await this.taskDB.query(GET_ALL_TASKS);
      const tasksResult = result?.rows || result
      
      if (tasksResult.length === 0) return res.status(404).json({ info: "No hay tareas en la DB" });
      
      res.status(200).json({ tareas: tasksResult });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message, info: "Compruebe si la DB está conectada" });
    }
  }

  obtenerTareaPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await this.taskDB.query(GET_TASK_BY_ID, [id]);
      const userResult = result?.rows?.[0] || result[0]

      if (!userResult) return res.status(404).json({ info: "No se encontró la tarea con el siguiente ID: " + id });

      res.status(200).json({ tarea: userResult });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message, info: "Compruebe si la DB está conectada" });
    }
  }

  async crearTarea(req, res) {
    try {
      const { titulo, descripcion } = req.body;

      if (!titulo || !descripcion) res.status(400).json({ message: "Campos vacíos" })

      const existTask = await this.taskDB.query(GET_TASK_BY_TITLE, [titulo])
      const existTaskResult = existTask?.rows?.[0] || existTask[0]
      
      if (existTaskResult.titulo) res.status(409).json({ message: "La tarea con ese título ya existe", title: titulo })

      const result = await this.taskDB.query(CREATE_TASK, [titulo, descripcion]);
      const tasksResult = result?.rows?.[0] || result[0]

      res.status(200).json({ success: "Tarea creada", tarea: tasksResult });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message, info: "Compruebe si la DB está conectada" });
    }
  }

  async actualizarTarea(req, res) {
    try {
      const task = {
        id: req.params.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
      };
      const result = await this.taskDB.query(UPDATE_TASK, [
        task.id,
        task.titulo,
        task.descripcion,
      ]);
      const userResult = result?.rows?.[0] || result[0]

      if (!userResult) {
        return res.status(404).json({ message: "No se encontró la tarea con ID: " + task.id });
      }

      res.status(200).json({
        success: "Se ha actualizado la tarea con éxito!",
        tarea: userResult,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar tarea: " + error.message,
      });
    }
  }

  async eliminarTarea(req, res) {
    try {
      const id = req.params.id;
      const result = await this.taskDB.query(DELETE_TASK, [id]);
      const taskResult = result?.rows?.[0] || result[0]

      if (!taskResult) return res.status(404).json({ message: "No se encontró la tarea con el ID: " + id });
      
      res.status(200).json({
        success: "Se ha eliminado la tarea con éxito!",
        tarea: taskResult,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al borrar tarea: " + error.message });
    }
  }
}

export { ControladorTareas };
