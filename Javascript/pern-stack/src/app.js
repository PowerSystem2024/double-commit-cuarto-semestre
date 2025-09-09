import express from "express";
import { appRouter } from "./routes/router.js";
import { corsMiddleware } from "./middleware/cors.js";

process.loadEnvFile(".env");

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.disable("x-powered-by");

  app.use("/", appRouter);

  const PORT = process.env.PORT ?? 3000;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
  });
};

createApp();
