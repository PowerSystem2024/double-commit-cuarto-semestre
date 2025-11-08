import { CREATE_TASK, DELETE_TASK, GET_ALL_TASKS, GET_TASK_BY_ID, GET_TASK_BY_TITLE, UPDATE_TASK } from "./constants.js";

class ControladorTareas {
  constructor({ taskDb }) {
    this.taskDb = taskDb;
  }

  obtenerLaPrimeraFila = (result) => result?.rows?.[0] || result[0]

  obtenerTodasLasTareas = async (req, res) => {
    try {
      const id = req.userId
      const result = await this.taskDb.query(GET_ALL_TASKS, [id]);
      const tasksResult = result?.rows || result
      
      if (tasksResult.length === 0) return res.status(200).json({ message: "No hay tareas en la DB", tareas: [] });
      
      res.status(200).json({ tareas: tasksResult });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message, info: "Compruebe si la DB está conectada" });
    }
  }

  obtenerTareaPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await this.taskDb.query(GET_TASK_BY_ID, [id]);
      const task = this.obtenerLaPrimeraFila(result)

      if (!task) return res.status(404).json({ info: "No se encontró la tarea con el siguiente ID: " + id });

      res.status(200).json({ tarea: task });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message, info: "Compruebe si la DB está conectada" });
    }
  }

   crearTarea = async (req, res) => {
    try {
      const { titulo, descripcion } = req.body;

      if (!titulo || !descripcion) return res.status(400).json({ message: "Campos vacíos" })

      const id = req.userId
      const tareaExistente = await this.taskDb.query(GET_TASK_BY_TITLE, [titulo, id])
      
      if (tareaExistente.length !== 0) return res.status(409).json({ message: "La tarea con ese título ya existe" })

      const result = await this.taskDb.query(CREATE_TASK, [titulo, descripcion, id]);
      const tareaCreada = this.obtenerLaPrimeraFila(result)

      res.status(200).json({ success: "Tarea creada", tarea: tareaCreada });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message, info: "Compruebe si la DB está conectada" });
    }
  }

   actualizarTarea = async (req, res) => {
    try {
      const tarea = {
        id: req.params.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
      };
      const result = await this.taskDb.query(UPDATE_TASK, [
        tarea.id,
        tarea.titulo,
        tarea.descripcion,
        true,
        new Date().toISOString()
      ]);
      const tareaActualizada = this.obtenerLaPrimeraFila(result)

      if (!tareaActualizada) {
        return res.status(404).json({ message: "No se encontró la tarea con ID: " + tarea.id });
      }

      res.status(200).json({
        success: "Se ha actualizado la tarea con éxito!",
        tarea: tareaActualizada,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar tarea: " + error.message,
      });
    }
  }

  eliminarTarea = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.userId
      const result = await this.taskDb.query(DELETE_TASK, [taskId, userId]);
      const tareaEliminada = this.obtenerLaPrimeraFila(result)

      if (!tareaEliminada) return res.status(404).json({ message: "No se encontró la tarea con el ID: " + id });
      
      res.status(200).json({
        success: "Se ha eliminado la tarea con éxito!",
        tarea: tareaEliminada,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al borrar tarea: " + error.message });
    }
  }
}

export { ControladorTareas };
