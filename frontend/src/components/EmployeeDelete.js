import { useMutation } from "@apollo/client";
import React from "react";
import { DELETE_EMPLOYEE } from "../mutations/employeeMutation"; // Updated import for employee mutation
import { GET_EMPLOYEES } from "./EmployeeList"; // Updated import for employee list

const EmployeeDelete = ({ deleteEmployeeId, setDeleteEmployeeId }) => {
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        variables: {
            id: deleteEmployeeId,
        },
        update: (cache, { data: { deleteEmployee } }) => {
            const { employees } = cache.readQuery({
                query: GET_EMPLOYEES,
            });
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    employees: employees.filter(
                        (employee) => employee.id !== deleteEmployee.id
                    ),
                },
            });
        },
    });

    const handleYesClick = () => {
        deleteEmployee();
        setDeleteEmployeeId("");
    };

    return (
        <div className="delete-wrap">
            <div className="inner-wrap">
                <h4>Are you sure?</h4>
                <div className="btn-wrap">
                    <button onClick={handleYesClick}>Yes</button>
                    <button onClick={() => setDeleteEmployeeId("")}>No</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDelete;
