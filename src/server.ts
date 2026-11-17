import express from "express";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();

app.use(express.json());

// Basic test endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Employee CRUD API is running!"
    });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
