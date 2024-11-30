import React from "react";
import { Link } from "react-router-dom";

const EmployeeRow = ({employee, setDeleteEmployeeId }) => {
    return (
        <tr>
            {Object.entries(employee).map((entry) => {
                if (entry[0] !== "__typename" && entry[0] !== "id") {
                    let value = entry[1];
                    
                    // For date fields, provide a fallback if not defined
                    if (entry[0] === "dateOfJoining") {
                        value = entry[1] ? entry[1] : "Not Defined";
                    }
                    
                    // For boolean field CurrentStatus, display "Working" or "Retired"
                    if (entry[0] === "currentStatus") {
                        value = entry[1] ? "Working" : "Retired";
                    }
                    
                    return (
                        <td key={entry[0]}>
                            {value}
                        </td>
                    );
                }
                return null; // To prevent undefined return
            })}
            <td >
                <Link to={`/employeelist/${employee.id}`}>
                    <button className="btn btn-dark text-white">
                        View Details
                    </button>
                </Link>
            </td>
            <td>
                    <Link to={`/employeelist/update/${employee.id}`}>
                    <button className="btn btn-dark text-white">Edit
                    </button></Link>
                
            </td>
            <td>
                    <Link>
                    <button onClick={() => setDeleteEmployeeId(employee.id)} className="btn btn-dark text-white">Delete
                    </button></Link>
                
            </td>
        </tr>
    );
};

export default EmployeeRow;
