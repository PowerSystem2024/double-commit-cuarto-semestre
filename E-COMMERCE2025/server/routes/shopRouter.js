import { Router } from "express";
import { ShopController } from "../controller/ShopController.js";

export const shopRouter = Router();

shopRouter.get("/", ShopController.homePage);
shopRouter.get("/success", ShopController.successAPI);
shopRouter.post("/create_preference", ShopController.createPreferenceAPI);
