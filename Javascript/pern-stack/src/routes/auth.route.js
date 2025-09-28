import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
// import { pgLocalDB } from "../dbConfig";

export const authRouter = Router();
const authController = new AuthController({ authDb: serverNeonDB }); // Inyectamos la dependencia podría ser pdAdmin en local o NeonDB server-less

authRouter.post("/signin/:id", authController.loginUser);
authRouter.post("/signup", authController.createUser);
authRouter.delete("/delete", authController.deleteUser)
authRouter.post("/signout", (req, res) => res.send("Cerrando sesión"));
authRouter.get("/profile", (req, res) => res.send("Perfil del usuario"));
