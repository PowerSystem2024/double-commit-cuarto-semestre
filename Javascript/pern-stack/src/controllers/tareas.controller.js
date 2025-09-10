class TareasController {
  static async getAllTasks(req, res) {
    const allTasks = [];
    try {
      res.status(200).json({ message: "Tareas obtenidas", allTasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear tarea: " + error.message });
    }
  }

  static async getTaskById(req, res) {
    const id = req.query;
    const tasks = [
      {
        id: 1,
        date: "10 de Septiembre de 2025",
        title: "Crear una app",
        description: "En serio dale!",
      },
      {
        id: 2,
        date: "10 de Septiembre de 2025",
        title: "Crear otra cosa",
        description: "En serio dale!",
      },
    ];
    try {
      tasks.forEach((task) => {
        if (task.id === id) {
          res
            .status(200)
            .json({ message: "Se ha obtenido la tarea con ID: " + id });
        }
      });
      res.status(400).json({ message: "No se encontró la tarea" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener tarea: " + error.message });
    }
  }

  static async createTask(req, res) {
    const task = {
      id: req.body.id || 1,
      date: req.body.date || "09 de Septiembre, 2025",
      title: req.body.title || "Crear",
      description: req.body.description || "La ciencia de la paz.",
    };
    const allTasks = [];

    if (!task) {
      res
        .status(400)
        .json({ message: "Faltan datos en el cuerpo de la petición" });
    }

    try {
      allTasks.push(task);
      res
        .status(200)
        .json({ message: "Se ha creado la trea con éxito.", allTasks });
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
