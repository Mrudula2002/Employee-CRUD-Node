
import { Router } from "express";
import {
    addEmployee,
    fetchEmployees,
    fetchEmployeeById,
    editEmployee,
    removeEmployee
} from "../controllers/employee.controller.js";

const router = Router();

// CREATE employee
router.post("/add", addEmployee);

// READ all employees
router.get("/", fetchEmployees);

// READ employee by ID
router.get("/:id", fetchEmployeeById);

// UPDATE employee by ID
router.put("/:id", editEmployee);

// DELETE employee by ID
router.delete("/:id",removeEmployee);

export default router;
