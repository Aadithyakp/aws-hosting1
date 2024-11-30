const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = require("graphql");

const dateScalar = require("../scalars/date");
const Employee = require("../models/Employee");

const EmployeeType = new GraphQLObjectType({
    name: "Employee",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        dateOfJoining: { type: GraphQLNonNull(dateScalar) },
        title: { type: GraphQLNonNull(GraphQLString) },
        department: { type: GraphQLNonNull(GraphQLString) },
        employeeType: { type: GraphQLNonNull(GraphQLString) },
        currentStatus: { type: GraphQLNonNull(GraphQLBoolean) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return Employee.findById(args.id);
            },
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve: () => {
                return Employee.find();
            },
        },
    },
});

const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
                dateOfJoining: { type: GraphQLNonNull(dateScalar) },
                title: { type: GraphQLNonNull(GraphQLString) },
                department: { type: GraphQLNonNull(GraphQLString) },
                employeeType: { type: GraphQLNonNull(GraphQLString) },
                currentStatus: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: (parent, args) => {
                const newEmployee = new Employee({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    age: args.age,
                    dateOfJoining: args.dateOfJoining,
                    title: args.title,
                    department: args.department,
                    employeeType: args.employeeType,
                    currentStatus: args.currentStatus,
                });
                return newEmployee.save();
            },
        },
        filterEmployees: {
            type: new GraphQLList(EmployeeType),
            args: {
                employeeType: { type: GraphQLString },
                firstName: { type: GraphQLString }, 
            },
            resolve: (parent, args) => {
                const filter = {};
                if (args.employeeType) {
                    filter.employeeType = args.employeeType;
                }
                if (args.firstName) {
                    filter.firstName = { $regex: args.firstName, $options: "i" };  
                }
                return Employee.find(filter);
            },
        },
        updateEmployee: {
            type: EmployeeType, // Assuming EmployeeType is the GraphQL type for Employee
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
                dateOfJoining: { type: GraphQLNonNull(dateScalar) }, 
                title: { type: GraphQLNonNull(GraphQLString) },
                department: { type: GraphQLNonNull(GraphQLString) },
                employeeType: { type: GraphQLNonNull(GraphQLString) },
                currentStatus: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: (parent, args) => {
                return Employee.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            age: args.age,
                            dateOfJoining: args.dateOfJoining,
                            title: args.title,
                            department: args.department,
                            employeeType: args.employeeType,
                            currentStatus: args.currentStatus,
                        },
                    },
                    {
                        new: true, 
                    }
                );
            },
        },
        deleteEmployee: {
            type: EmployeeType,  
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },  
            },
            resolve: async (parent, args) => {
                
                const deletedEmployee = await Employee.findByIdAndDelete(args.id);
                return deletedEmployee;  
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutations,
});
