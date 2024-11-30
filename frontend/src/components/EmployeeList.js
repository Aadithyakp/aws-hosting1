import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { gql, useMutation, useQuery } from "@apollo/client";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import { FILTER_EMPLOYEES } from "../mutations/employeeMutation";
import EmployeeDelete from "./EmployeeDelete";

export const GET_EMPLOYEES = gql`
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

const EmployeeList = () => {
    
    const [deleteEmployeeId, setDeleteEmployeeId] = useState("");
    const [filterData, setFilterData] = useState({
        employeeType: "",
        firstName: "",
    });

    const { loading, error, data } = useQuery(GET_EMPLOYEES);

    const [filterEmployees] = useMutation(FILTER_EMPLOYEES, {
        variables: {
            employeeType: filterData.employeeType,
            firstName: filterData.firstName,
        },
        update: (cache, { data: { filterEmployees } }) => {
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: { employees: filterEmployees },
            });
        },
    });

    const handleSearch = (text) => {
        console.log("This is the text", text);
        setFilterData((currFilterData) => ({
            ...currFilterData,
            firstName: text,
        }));
    };

    const handleFilter = (employeeType) => {
        console.log("employeeType", employeeType);
        setFilterData((currFilterData) => ({
            ...currFilterData,
            employeeType: employeeType,
        }));
    };

    useEffect(() => {
        filterEmployees();
    }, [filterData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!!!</p>;

    return (
        <>
                <EmployeeSearch handleSearch={handleSearch} />
                <EmployeeFilter handleFilter={handleFilter} />   
            {!loading && !error && data.employees.length !== 0 && (
                <>
                    <>
                    <EmployeeTable
                        employees={data.employees}
                        setDeleteEmployeeId={setDeleteEmployeeId}
                    />
                    {deleteEmployeeId !== "" && (
                        <EmployeeDelete
                            deleteEmployeeId={deleteEmployeeId}
                            setDeleteEmployeeId={setDeleteEmployeeId}
                        />
                    )}
                </>
                </>
                
            )}
        </>
    );
};

export default EmployeeList;
