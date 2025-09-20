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
    }
  }

  static async getTaskById(req, res) {
    const id = req.params.id;
    try {
      pool.query(GET_TASK_BY_ID, [id], (err, result) => {
        if (err) res.status(400).json(err.message);
        if (result.rows.length === 0)
          res.status(400).json({ info: "No se encontró la tarea" });

        const task = result.rows[0];

        res.status(200).json({ tarea: task });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener tarea po ID: " + error.message });
    }
  }

  static async createTask(req, res) {
    const task = { titulo: req.body.titulo, descripcion: req.body.descripcion };
    try {
      pool.query(
        CREATE_TASK,
        [task.titulo, task.descripcion],
        (err, result) => {
          if (err) res.status(400).json(err.message);

          const created = result.rows.map((row) => row);

          res.status(200).json({ success: "Tarea creada", created });
        }
      );
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear tarea: " + error.message });
    }
  }

  static async updateTask(req, res) {
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    const id = req.params.id;
    const task = { titulo: req.body.titulo, descripcion: req.body.descripcion };
    try {
      pool.query(
        UPDATE_TASK,
        [id, task.titulo, task.descripcion, true],
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
    }
  }

  static async deleteTask(req, res) {
    const id = req.params.id;

    try {
      pool.query(DELETE_TASK, [id], (err, result) => {
        if (err) res.status(400).json(err.message);
        if (result.rows.length === 0)
          res.status(404).json("Tarea no encontrada");

        const deleted = result.rows[0];
        res.status(200).json({ success: "Tarea eliminada", deleted });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al borrar tarea" + error.message });
    }
  }
}

export { TareasController };
