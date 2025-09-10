import express from "express";
import { tareasRouter } from "./routes/tareas.route.js";
import { authRouter } from "./routes/auth.js";
import { homeRouter } from "./routes/home.route.js";

process.loadEnvFile(".env");

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.disable("x-powered-by");

  app.use(homeRouter);
  app.use("/api", tareasRouter);
  app.use("/api", authRouter);

  const PORT = process.env.PORT ?? 3000;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
  });
};

createApp();
