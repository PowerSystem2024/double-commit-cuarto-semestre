import { Router } from "express";
import { ControladorTareas } from "../controllers/tareas.controller.js";
import { pgLocalDB } from "../dbConfig.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
import { isAuth } from "../middleware/isAuth.js";

export const tareasRouter = Router();
const contraladorTareas = new ControladorTareas({ taskDB: serverNeonDB });

tareasRouter.get("/tareas", isAuth, contraladorTareas.obtenerTodasLasTareas);
tareasRouter.get("/tarea/:id", isAuth, contraladorTareas.obtenerTareaPorId);
tareasRouter.post("/tarea", isAuth, contraladorTareas.crearTarea);
tareasRouter.put("/tarea/:id", isAuth, contraladorTareas.actualizarTarea);
tareasRouter.delete("/tarea/:id", isAuth, contraladorTareas.eliminarTarea);
