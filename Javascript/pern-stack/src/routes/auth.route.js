import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
import { pgLocalDB } from "../dbConfig.js";

export const authRouter = Router();

const authController = new AuthController({ authDb: pgLocalDB }); // Inyectamos la dependencia podría ser pdAdmin en local o NeonDB server-less

authRouter.get("/users", authController.getAllUsers)
authRouter.get("/user/:id", authController.getUserById)
authRouter.post("/signin/:email", authController.loginUser);
authRouter.post("/signup", authController.createUser);
authRouter.delete("/delete", authController.deleteUser)