import { Router } from "express";
import { ControladorTareas } from "../controllers/tareas.controller.js";
// import { pgLocalDB } from "../dbConfig.js";
import { isAuth } from "../middleware/isAuth.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const tareasRouter = Router();
const contraladorTareas = new ControladorTareas({ taskDb: serverNeonDB });

tareasRouter.get("/tareas", isAuth, contraladorTareas.obtenerTodasLasTareas);
tareasRouter.get("/tarea/:id", isAuth, contraladorTareas.obtenerTareaPorId);
tareasRouter.post("/tarea", isAuth, contraladorTareas.crearTarea);
tareasRouter.put("/actualizar/tarea/:id", isAuth, contraladorTareas.actualizarTarea);
tareasRouter.delete("/eliminar/tarea/:id", isAuth, contraladorTareas.eliminarTarea);
