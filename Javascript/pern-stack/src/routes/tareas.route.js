import { Router } from "express";
import { TareasController } from "../controllers/tareas.controller.js";
import { pgLocalDB } from "../dbConfig.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const tareasRouter = Router();
const tareasController = new TareasController({ taskDB: serverNeonDB })

tareasRouter.get("/tareas", tareasController.getAllTasks);
tareasRouter.get("/tarea/:id", tareasController.getTaskById);
tareasRouter.post("/tarea", tareasController.createTask);
tareasRouter.put("/tarea/:id", tareasController.updateTask);
tareasRouter.delete("/tarea/:id", tareasController.deleteTask);
