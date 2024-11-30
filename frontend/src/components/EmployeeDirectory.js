import React, { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import { gql, useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the GET_EMPLOYEES query to fetch employees from the GraphQL server
const GET_EMPLOYEES = gql`
    query getEmployees {
        employees {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
        }
    }
`;

const EmployeeDirectory = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch employees and update the state with the fetched data
    const { loading, error, data } = useQuery(GET_EMPLOYEES, {
        onCompleted: (data) => {
            setEmployees(data.employees);
        },
    });

    // Handle loading and error states
    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-danger">Error!!!</p>;

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4">
                {!loading && !error && employees.length !== 0 && (
                    <>
                        <EmployeeTable employees={employees} />
                        <br />
                        <EmployeeCreate employees={employees} setEmployees={setEmployees} />
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeDirectory;
