class TareasController {
  static async getAllTasks(req, res) {
    const allTasks = [
      {
        id: 1,
        date: "08 de Septiembre, 2025",
        title: "Crear aplicación",
        description:
          "Debo crear la aplicación para facturación y control de stock que vengo posponiendo ultimamente.",
      },
      {
        id: 2,
        date: "06 de Septiembre, 2025",
        title: "Crear la web (Agencia)",
        description: "Debo crear la web para poder venderme profesionalmente.",
      },
    ];
    try {
      res.status(200).json({ message: "Tareas obtenidas", allTasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear tarea: " + error.message });
    }
  }

  static async getTaskById(req, res) {
    const id = req.body.taskId;
    try {
      res.status(200).json({ message: "Se ha creado la trea con éxito." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener tarea: " + error.message });
    }
  }

  static async createTask(req, res) {
    const task = {
      id: req.body.id,
      date: req.body.date,
      title: req.body.title,
      description: req.body.description,
    };
    if (!task)
      return res
        .status(400)
        .json({ message: "Faltan datos en el cuerpo de la petición" });

    try {
      res
        .status(200)
        .json({ message: "Se ha creado la trea con éxito.", task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear tarea: " + error.message });
    }
  }

  static async updateTask(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar tarea" });
    }
  }

  static async deleteTask(req, res) {
    const id = req.body.id;

    try {
      res.status(200).json({ message: "Se ha borrado la tarea con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al borrar tarea" + error.message });
    }
  }
}

export { TareasController };
