import { Router } from "express";
import { ControladorUsuarios } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
import { pgLocalDB } from "../dbConfig.js";
import { isAuth } from "../middleware/isAuth.js";

export const authRouter = Router();
// Esto permite que si mañana cambias la DB, solo pases otra instancia sin tocar la lógica interna del controlador.
const controladorUsuarios = new ControladorUsuarios({ authDb: serverNeonDB }); // <- Inyectamos la dependencia de NeonDB server-less
// const controladorUsuarios = new ControladorUsuarios({ authDb: pgLocalDB }) <- si queremos usar la DB de pgAdmin

authRouter.get("/users", controladorUsuarios.obtenerTodosLosUsuarios)
authRouter.get("/user/:id", controladorUsuarios.obtenerUsuarioPorId)
authRouter.post("/signin", controladorUsuarios.ingresoUsuario);
authRouter.post("/signup", controladorUsuarios.crearUsuario);
authRouter.put("/update/user", isAuth, controladorUsuarios.actualizarUsuario)
authRouter.delete("/delete/user/:id", isAuth, controladorUsuarios.eliminarUsuario)
authRouter.get("/signout", isAuth, controladorUsuarios.salidaUsuario)
authRouter.get("/profile", isAuth, controladorUsuarios.perfilUsuario)