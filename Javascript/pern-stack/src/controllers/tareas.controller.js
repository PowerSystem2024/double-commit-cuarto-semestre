import { pool } from "../dbConfig.js";
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  UPDATE_TASK,
} from "./constants.js";

class TareasController {
  static async getAllTasks(req, res) {
    try {
      pool.query(GET_ALL_TASKS, (err, result) => {
        if (err) res.status(400).json(err.message);
        if (result.rows.length === 0)
          res.status(400).json({ info: "Base de datos vacía" });
        const allTasks = result.rows.map((row) => row);
        res.status(200).json({ tareas: allTasks });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los datos: " + error.message });
    } finally {
      pool.end();
    }
  }

  static async getTaskById(req, res) {
    const id = req.params.id;
    try {
      pool.query(GET_TASK_BY_ID, [id], (err, result) => {
        if (err) res.status(400).json(err.message);
        const task = result.rows[0];
        res.status(200).json({ tarea: task });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener tarea po ID: " + error.message });
    } finally {
      pool.end();
    }
  }

  static async createTask(req, res) {
    if (!task) {
      res
        .status(400)
        .json({ message: "Faltan datos en el cuerpo de la petición" });
    }

    try {
      pool.query(
        CREATE_TASK,
        [req.body.titulo, req.body.descripcion],
        (err, result) => {
          if (err) res.status(400).json(err.message);
          const created = result.rows[0];
          res.status(200).json({ success: "Tarea creada", created });
        }
      );
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear tarea: " + error.message });
    } finally {
      pool.end();
    }
  }

  static async updateTask(req, res) {
    const id = req.params.id;
    const titulo = req.body.titulo || "Actualizar";
    const descripcion = req.body.descripcion || "La ciencia de la paz";

    try {
      pool.query(
        UPDATE_TASK,
        [id, titulo, descripcion, true],
        (err, result) => {
          if (result.rows.length === 0) {
            return res.status(404).json({ message: "Tarea no encontrada" });
          }

          res.status(200).json({
            success: "Se ha actualizado la tarea con éxito!",
            task: result.rows[0],
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar tarea: " + error.message,
      });
    } finally {
      pool.end();
    }
  }

  static async deleteTask(req, res) {
    const id = req.params.id;

    try {
      pool.query(DELETE_TASK, [id], (err, result) => {
        if (err) res.status(400).json(err.message);
        const deleted = result.rows[0];
        res.status(200).json({ success: "Tarea eliminada", deleted });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al borrar tarea" + error.message });
    } finally {
      pool.end();
    }
  }
}

export { TareasController };
