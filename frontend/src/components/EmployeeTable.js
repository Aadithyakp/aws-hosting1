import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, setDeleteEmployeeId }) => {
    
    const employeeRows = employees.map((employee) => (
        <EmployeeRow key={employee.id} employee={employee} setDeleteEmployeeId={setDeleteEmployeeId} />
    ));

    return (
        <div className="container my-4"> 
            <div className="table-responsive">
                <table className="table table-striped table-bordered mx-auto"> 
                    <thead className="table-dark">
                        <tr>
                            {Object.keys(employees[0]).map((key) => {
                                if (key !== "__typename" && key !== "id") {
                                    return (
                                        <th key={key}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </th>
                                    );
                                }
                                return null; 
                            })}
                        </tr>
                    </thead>
                    <tbody>{employeeRows}</tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
