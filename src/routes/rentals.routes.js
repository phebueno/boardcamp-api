import { Router } from "express";
import { deleteRentalById, finishRental, getRentals, postRental } from "../controllers/rentals.controllers.js";
import schemaValidation from "../middlewares/validateSchema.middleware.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", schemaValidation(rentalSchema), postRental);
rentalsRouter.post("/rentals/:id/return", finishRental);
rentalsRouter.delete("/rentals/:id", deleteRentalById);

export default rentalsRouter;
