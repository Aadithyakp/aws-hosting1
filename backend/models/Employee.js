const mongoose = require("mongoose");


const titles = ["Employee", "Manager", "Director", "VP"];
const departments = ["IT", "Marketing", "HR", "Engineering"];
const employeeTypes = ["FullTime", "PartTime", "Contract", "Seasonal"];

const EmployeeModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, min: 20, max: 70, required: true },
    dateOfJoining: { type: Date, required: true },
    title: { type: String, enum: titles, required: true },
    department: { type: String, enum: departments, required: true },
    employeeType: { type: String, enum: employeeTypes, required: true },
    currentStatus: { type: Boolean, default: true }, // true = working, false = retired
});

module.exports = mongoose.model("Employee", EmployeeModel);
