import Joi from "joi";
import JoiDate from "@joi/date";

const joi = Joi.extend(JoiDate);

export const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .min(10)
    .max(11)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 or 11 digits.`,
    })
    .required(),
  cpf: joi
    .string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .messages({ "string.pattern.base": `CPF number must have 11 digits.` })
    .required(),
  birthday: joi.date().format("YYYY-MM-DD").required(),
});
