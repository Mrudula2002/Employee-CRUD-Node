
import type { Request, Response } from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from "../services/employee.service.js";

// Validate employee request body before any unauthenticated requests enter the service layer 
const isValidEmployee = (data: any): boolean => {
    return (
        typeof data.employeeName === "string" &&
        data.employeeName.trim() !== "" &&
        typeof data.email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) &&
        typeof data.department === "string" &&
        data.department.trim() !== ""
    );
};

// CREATE employee
export const addEmployee = (req: Request, res: Response): void => {
    try {
        // Validate request body
        if (!isValidEmployee(req.body)) {
            res.status(400).json({
                message: "Invalid employee data. Name, email and department are required."
            });
            return;
        }
        const newEmployee = createEmployee(req.body);

        res.status(201).json({
            message: "Employee created successfully",
            data: newEmployee
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

// READ all employees
export const fetchEmployees = (req: Request, res: Response): void => {
    try {
        const employees = getAllEmployees();

        res.status(200).json({
            message: "Employees retrieved successfully",
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

// READ employee by ID
export const fetchEmployeeById = (
    req: Request,
    res: Response
): void => {
    try {
        const employeeId = Number(req.params.id);

        // Check whether the ID is valid
        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            res.status(400).json({
                message: "Invalid employee ID"
            });
            return;
        }

        const employee = getEmployeeById(employeeId);

        // Check whether the employee exists
        if (!employee) {
            res.status(404).json({
                message: "Employee not found"
            });
            return;
        }

        res.status(200).json({
            message: "Employee retrieved successfully",
            data: employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

// UPDATE employee
export const editEmployee = (
    req: Request,
    res: Response
): void => {
    try {
        const employeeId = Number(req.params.id);

        // Validate employee ID
        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            res.status(400).json({
                message: "Invalid employee ID"
            });
            return;
        }

        if (!isValidEmployee(req.body)) {
            res.status(400).json({
                message: "Invalid employee data. Name, email and department are required."
            });
            return;
        }
        const updatedEmployee = updateEmployee(employeeId, req.body);

        // Check whether employee exists
        if (!updatedEmployee) {
            res.status(404).json({
                message: "Employee not found"
            });
            return;
        }

        res.status(200).json({
            message: "Employee updated successfully",
            data: updatedEmployee
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};


// DELETE employee
export const removeEmployee = (
    req: Request,
    res: Response
): void => {
    try {
        const employeeId = Number(req.params.id);

        // Validate employee ID
        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            res.status(400).json({
                message: "Invalid employee ID"
            });
            return;
        }

        const isDeleted = deleteEmployee(employeeId);

        if (!isDeleted) {
            res.status(404).json({
                message: "Employee not found"
            });
            return;
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

