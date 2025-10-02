import { Router } from "express";
import { ControladorUsuarios } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
import { pgLocalDB } from "../dbConfig.js";

export const authRouter = Router();

const controladorUsuarios = new ControladorUsuarios({ authDb: serverNeonDB }); // Inyectamos la dependencia podría ser pdAdmin en local o NeonDB server-less

authRouter.get("/users", controladorUsuarios.obtenerTodosLosUsuarios)
authRouter.get("/user/:id", controladorUsuarios.obtenerUsuarioPorId)
authRouter.post("/signin", controladorUsuarios.ingresoUsuario);
authRouter.post("/signup", controladorUsuarios.crearUsuario);
authRouter.delete("/delete", controladorUsuarios.eliminarUsuario)