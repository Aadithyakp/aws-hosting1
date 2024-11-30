import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_EMPLOYEE } from "./EmployeeDetails"; // Replace with your actual query
import { UPDATE_EMPLOYEE } from "../mutations/employeeMutation"; // Replace with your actual mutation

const EmployeeUpdate = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: true, // true = working, false = retired
    });

    const { employeeid } = useParams(); // Get employee id from the URL
    const navigate = useNavigate();

    const { error, loading, data } = useQuery(GET_EMPLOYEE, {
        variables: {
            id: employeeid,
        },
    });

    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        variables: {
            id: employeeid,
            firstName: employeeDetails.firstName,
            lastName: employeeDetails.lastName,
            age: employeeDetails.age,
            dateOfJoining: employeeDetails.dateOfJoining,
            title: employeeDetails.title,
            department: employeeDetails.department,
            employeeType: employeeDetails.employeeType,
            currentStatus: employeeDetails.currentStatus,
        },
        update: (cache, { data: updateEmployee }) => {
            const { employee } = cache.readQuery({
                query: GET_EMPLOYEE,
                variables: {
                    id: employeeid,
                },
            });
            cache.writeQuery({
                query: GET_EMPLOYEE,
                data: { employee },
            });
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateEmployee();
        navigate("/employeelist"); // Redirect to employee list after submission
    };

    useEffect(() => {
        if (data && "employee" in data) {
            setEmployeeDetails({
                firstName: data.employee.firstName,
                lastName: data.employee.lastName,
                age: data.employee.age,
                dateOfJoining: data.employee.dateOfJoining,
                title: data.employee.title,
                department: data.employee.department,
                employeeType: data.employee.employeeType,
                currentStatus: data.employee.currentStatus,
            });
        }
    }, [data]);

    if (error) {
        return <p>Error!!!</p>;
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {!loading && !error && data.employee !== undefined && (
                <div className="container mt-4">
                    <h4>Update Employee</h4>
                    <form onSubmit={(e) => handleSubmit(e)} className="my-4">
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control"
                                value={employeeDetails.firstName}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        firstName: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control"
                                value={employeeDetails.lastName}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        lastName: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                className="form-control"
                                value={employeeDetails.age}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        age: parseInt(e.target.value),
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateOfJoining" className="form-label">Date of Joining:</label>
                            <input
                                type="date"
                                id="dateOfJoining"
                                name="dateOfJoining"
                                className="form-control"
                                value={employeeDetails.dateOfJoining}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        dateOfJoining: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={employeeDetails.title}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">Department:</label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                className="form-control"
                                value={employeeDetails.department}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        department: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeType" className="form-label">Employee Type:</label>
                            <select
                        id="employeeType"
                        name="employeeType"
                        value={employeeDetails.employeeType}
                        onChange={(e) =>
                            setEmployeeDetails((currEmployeeDetails) => ({
                                ...currEmployeeDetails,
                                employeeType: e.target.value,
                            }))
                        }
                        className="form-select"
                        required
                    >
                        <option value="FullTime">Full-Time</option>
                        <option value="PartTime">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="currentStatus" className="form-label">Current Status:</label>
                            <select
                                id="currentStatus"
                                name="currentStatus"
                                className="form-select"
                                value={employeeDetails.currentStatus}
                                onChange={(e) =>
                                    setEmployeeDetails((currEmployeeDetails) => ({
                                        ...currEmployeeDetails,
                                        currentStatus: e.target.value === "true" ? true : false,
                                    }))
                                }
                            >
                                <option value={true}>Working</option>
                                <option value={false}>Retired</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EmployeeUpdate;
