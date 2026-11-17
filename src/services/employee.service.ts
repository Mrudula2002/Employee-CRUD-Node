
import type { Employee } from "../models/employee.model.js";

// Temporary in-memory employee storage
let employees: Employee[] = [];

let nextId = 1;

// CREATE: Add a new employee
export const createEmployee = (
    employeeData: Omit<Employee, "id">
): Employee => {

    const newEmployee: Employee = {
        id: nextId++,
        ...employeeData
    };

    employees.push(newEmployee);

    return newEmployee;
};

// READ: Retrieve all employees
export const getAllEmployees = (): Employee[] => {
    return employees;
};

// READ: Retrieve an employee by ID
export const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find(employee => employee.id === id);
};


// UPDATE: Update an existing employee
export const updateEmployee = (
    id: number,
    employeeData: Omit<Employee, "id">
): Employee | undefined => {

    const employee = employees.find(employee => employee.id === id);

    if (!employee) {
        return undefined;
    }

    employee.employeeName = employeeData.employeeName;
    employee.email = employeeData.email;
    employee.department = employeeData.department;

    return employee;
};

// DELETE: Remove an employee
export const deleteEmployee = (id: number): boolean => {

    // . findIndex() - Finds the position of the employee in our array.
    // If we search for ID 2, findIndex() returns 1 because array indexing starts at zero.
    const employeeIndex = employees.findIndex(
        employee => employee.id === id
    );

    if (employeeIndex === -1) {
        return false;
    }
// splice()- Removes the employee at the specified array position.
// array.splice(startIndex, deleteCount);
    employees.splice(employeeIndex, 1);

    return true;
};