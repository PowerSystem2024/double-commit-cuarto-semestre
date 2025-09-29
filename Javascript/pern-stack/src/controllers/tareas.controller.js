class TareasController {
  constructor({ taskDB }) {
    this.taskDB = taskDB;
  }

  async getAllTasks(req, res) {
    try {
      const result = await this.taskDB.query(GET_ALL_TASKS);
      if (result.rows.length === 0) {
        return res.status(400).json({ info: "No hay tareas en la DB" });
      }
      res.status(200).json({ tareas: result.rows });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas: " + error.message });
    }
  }

  async getTaskById(req, res) {
    const id = req.params.id;
    try {
      const result = await this.taskDB.query(GET_TASK_BY_ID, [id]);
      if (result.rows.length === 0) {
        return res.status(400).json({ info: "No se encontró la tarea" });
      }
      res.status(200).json({ tarea: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener tarea por ID: " + error.message });
    }
  }

  async createTask(req, res) {
    const { titulo, descripcion } = req.body;
    try {
      const result = await this.taskDB.query(CREATE_TASK, [titulo, descripcion]);
      res.status(200).json({ success: "Tarea creada", tarea: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Error al crear tarea: " + error.message });
    }
  }

  async updateTask(req, res) {
    const task = {
      id: req.params.id,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
    };
    try {
      const result = await this.taskDB.query(UPDATE_TASK, [
        task.id,
        task.titulo,
        task.descripcion,
      ]);
      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Tarea no encontrada" });
      }
      res.status(200).json({
        success: "Se ha actualizado la tarea con éxito!",
        tarea: result.rows[0],
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
      const result = await this.taskDB.query(DELETE_TASK, [id]);
      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Tarea no encontrada" });
      }
      res.status(200).json({
        success: "Se ha eliminado la tarea con éxito!",
        tarea: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: "Error al borrar tarea: " + error.message });
    }
  }
}

export { TareasController };
