import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controllers.js";
import schemaValidation from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schemas.js";

const gamesRouter = Router();
gamesRouter.get("/games", getGames);
gamesRouter.post("/games", schemaValidation(gameSchema), postGame);

export default gamesRouter;