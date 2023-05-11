import joi from "joi";

export const rentalSchema = joi.object({
    customerId: joi.number().strict().integer().required(),
    gameId: joi.number().strict().integer().required(),
    daysRented: joi.number().strict().integer().min(1).required()
});