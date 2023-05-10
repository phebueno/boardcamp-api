import { Router } from "express";
import { getCustomerById, getCustomers, postCustomer, updateCustomerById } from "../controllers/customers.controllers.js";

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.post("/customers", postCustomer);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.put("/customers/:id", updateCustomerById);

export default customersRouter;