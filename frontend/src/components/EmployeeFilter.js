import React from "react";

const EmployeeFilter = ({ handleFilter }) => {
    return (
        <div className="d-flex justify-content-center mb-3">
            <div className="col-4">
                <label htmlFor="employeeType" className="form-label">
                    Select Employee Type
                </label>
                <select
                    id="employeeType"
                    className="form-select"
                    onChange={(e) => handleFilter(e.target.value)}
                >
                    <option value="">Select Employee Type</option>
                    <option value="FullTime">Full-Time</option>
                    <option value="PartTime">Part-Time</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Contract">Contract</option>
                </select>
            </div>
        </div>
    );
};

export default EmployeeFilter;
    