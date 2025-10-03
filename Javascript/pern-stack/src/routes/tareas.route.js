import { Router } from "express";
import { ControladorTareas } from "../controllers/tareas.controller.js";
import { pgLocalDB } from "../dbConfig.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const tareasRouter = Router();
const contraladorTareas = new ControladorTareas({ taskDB: serverNeonDB });

tareasRouter.get("/tareas", contraladorTareas.obtenerTodasLasTareas);
tareasRouter.get("/tarea/:id", contraladorTareas.obtenerTareaPorId);
tareasRouter.post("/tarea", contraladorTareas.crearTarea);
tareasRouter.put("/tarea/:id", contraladorTareas.actualizarTarea);
tareasRouter.delete("/tarea/:id", contraladorTareas.eliminarTarea);
