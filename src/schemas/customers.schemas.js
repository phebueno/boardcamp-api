import Joi from "joi";
import JoiDate from '@joi/date';

const joi = Joi.extend(JoiDate);

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.date().format('YYYY-MM-DD').required(),
});