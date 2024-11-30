import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const GET_EMPLOYEE = gql`
    query getEmployee($id: ID!) {
        employee(id: $id) {
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

const EmployeeDetails = () => {
    const { employeeid } = useParams();

    const { error, loading, data } = useQuery(GET_EMPLOYEE, {
        variables: { id: employeeid },
    });

    if (error) return <p className="text-danger">Error loading employee details!</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            {!error && !loading && data.employee && (
                <div className="container my-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h3 className="mb-0">Employee Details</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>
                                    {Object.entries(data.employee).map(([key, value]) => {
                                        if (key !== "__typename" && key !== "id") {
                                            return (
                                                <tr key={key}>
                                                    <th scope="row" className="text-capitalize">{key}</th>
                                                    <td>{value}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployeeDetails;
