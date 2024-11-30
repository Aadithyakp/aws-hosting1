import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_EMPLOYEE } from "../mutations/employeeMutation";

const EmployeeCreate = ({ employees, setEmployees }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(20);
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [title, setTitle] = useState("Employee");
    const [department, setDepartment] = useState("IT");
    const [employeeType, setEmployeeType] = useState("FullTime");
    const currentStatus = true;
    const [error, setError] = useState(null);

    const [addEmployee] = useMutation(ADD_EMPLOYEE, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            setEmployees([...employees, data.addEmployee]);
            resetForm();
        },
    });

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setAge(20);
        setDateOfJoining("");
        setTitle("Employee");
        setDepartment("IT");
        setEmployeeType("FullTime");
        setError(null);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        addEmployee({
            variables: {
                firstName,
                lastName,
                age: parseInt(age),
                dateOfJoining,
                title,
                department,
                employeeType,
                currentStatus,
            },
        });
    };

    return (
        <div className="card p-4 mt-4">
            <h4 className="text-center mb-3">Add New Employee</h4>
            {error && <p className="text-danger text-center">Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="form-control"
                            min="20"
                            max="70"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                    <label htmlFor="dateOfJoining">Date of Joining:</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        className="form-control"
                        value={dateOfJoining}
                        onChange={(e) => setDateOfJoining(e.target.value)}
                        required
                    />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <select
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="department" className="form-label">Department:</label>
                        <select
                            id="department"
                            name="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="employeeType" className="form-label">Employee Type:</label>
                    <select
                        id="employeeType"
                        name="employeeType"
                        value={employeeType}
                        onChange={(e) => setEmployeeType(e.target.value)}
                        className="form-select"
                        required
                    >
                        <option value="FullTime">Full-Time</option>
                        <option value="PartTime">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                </div>

                <input type="hidden" name="currentStatus" value={currentStatus ? "Working" : "Retired"} />

                <button type="submit" className="btn btn-dark w-100 mt-3">Save</button>
            </form>
        </div>
    );
};

export default EmployeeCreate;
