import { Router } from "express";

export const authRouter = Router();

authRouter.post("/signin", (req, res) => res.send("Ingresando"));
authRouter.post("/signup", (req, res) => res.send("Registrando"));
authRouter.post("/signout", (req, res) => res.send("Cerrando sesión"));
authRouter.get("/profile", (req, res) => res.send("Perfil del usuario"));
