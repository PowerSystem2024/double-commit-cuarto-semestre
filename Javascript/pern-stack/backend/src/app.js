import express from "express";
import { tareasRouter } from "./routes/tareas.route.js";
import { authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser"
import cors from "cors"

process.loadEnvFile(".env");

export const createApp = () => {
  try {
    const app = express();
    
    app.use(cors({ origin: true, credentials: true }))
    app.use(cookieParser())
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: false, limit: "10mb" }));
    app.disable("x-powered-by");

    app.use("/api", tareasRouter);
    app.use("/api", authRouter);

    const PORT = process.env.PORT ?? 3000;

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
