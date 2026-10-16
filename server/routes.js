import express from "express";
import { getRecipe } from "./controllers.js";

const router = express.Router();

router.post("/recipe", getRecipe);

export default router;
