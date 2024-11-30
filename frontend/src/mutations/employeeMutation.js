import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
    mutation addEmployee(
        $firstName: String!
        $lastName: String!
        $age: Int!
        $dateOfJoining: Date!
        $title: String!
        $department: String!
        $employeeType: String!
        $currentStatus:Boolean!

    ) {
        addEmployee(
            firstName: $firstName
            lastName: $lastName
            age: $age
            dateOfJoining: $dateOfJoining
            title: $title
            department: $department
            employeeType: $employeeType
            currentStatus: $currentStatus
        ) {
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

export const FILTER_EMPLOYEES = gql`
    mutation filterEmployees($employeeType: String, $firstName: String) {
        filterEmployees(employeeType: $employeeType, firstName: $firstName) {
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
`

export const UPDATE_EMPLOYEE = gql`
    mutation updateEmployee(
        $id: ID!
        $firstName: String!
        $lastName: String!
        $age: Int!
        $dateOfJoining: Date!
        $title: String!
        $department: String!
        $employeeType: String!
        $currentStatus: Boolean!
    ) {
        updateEmployee(
            id: $id
            firstName: $firstName
            lastName: $lastName
            age: $age
            dateOfJoining: $dateOfJoining
            title: $title
            department: $department
            employeeType: $employeeType
            currentStatus: $currentStatus
        ) {
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
export const DELETE_EMPLOYEE = gql`
    mutation deleteEmployee($id: ID!) {
        deleteEmployee(id: $id) {
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
