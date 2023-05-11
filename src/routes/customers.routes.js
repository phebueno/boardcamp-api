import { Router } from "express";
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  updateCustomerById,
} from "../controllers/customers.controllers.js";
import schemaValidation from "../middlewares/validateSchema.middleware.js";
import { customerSchema } from "../schemas/customers.schemas.js";

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.post(
  "/customers",
  schemaValidation(customerSchema),
  postCustomer
);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.put(
  "/customers/:id",
  schemaValidation(customerSchema),
  updateCustomerById
);

export default customersRouter;
