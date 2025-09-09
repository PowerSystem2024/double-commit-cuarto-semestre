import { Router } from "express";
import { AppController } from "../controller/AppController.js";

const appRouter = Router();

appRouter.get("/", AppController.home);
appRouter.post("/validate", AppController.validation);

export { appRouter };
