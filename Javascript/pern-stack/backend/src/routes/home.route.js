import { Router } from "express";
import { homePage } from "../view/homePage.js";

export const homeRouter = Router();

homeRouter.get("/", homePage);
