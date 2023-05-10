import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controllers.js";

const gamesRouter = Router();
gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGame);

export default gamesRouter;