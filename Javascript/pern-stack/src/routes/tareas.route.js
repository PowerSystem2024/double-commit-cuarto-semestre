import { Router } from "express";
import { TareasController } from "../controllers/tareas.controller.js";

export const tareasRouter = Router();

tareasRouter.get("/tareas", TareasController.getAllTasks);
tareasRouter.post("/tarea", TareasController.createTask);
tareasRouter.put("/tarea:id", TareasController.updateTask);
tareasRouter.delete("/tarea:id", TareasController.deleteTask);
