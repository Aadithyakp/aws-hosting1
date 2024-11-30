import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeDirectory from './components/EmployeeDirectory';
import Body from "./components/Body";
import Homepage from "./components/Homepage";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeList from "./components/EmployeeList";
import EmployeeUpdate from "./components/EmployeeUpdate"

const cache = new InMemoryCache({
  typePolicies: {
      Query: {
          fields: {
              employees: {
                  merge: (existing, incoming) => incoming,
              },
          },
      },
  },
});

const client = new ApolloClient({
  uri: "/graphql",
  cache,
});

const router = createBrowserRouter([
  {
      path: "/",
      element: <Body />,
      children: [
          {
              path: "/",
              element: <Homepage />,
          },
          {
              path: "/employeelist", // Adjusted path for Employee list
              element: <EmployeeList />, // Adjusted component for Employee list
          },
          {
              path: "/employeelist/:employeeid", // Adjusted path for Employee details
              element: <EmployeeDetails />, // Adjusted component for Employee details
          },
          {
              path: "/employeelist/employeecreate", // Adjusted path for Employee add
              element: <EmployeeCreate />, // Adjusted component for Employee add
          },
          {
            path: "/employeelist/update/:employeeid",
            element: <EmployeeUpdate />,
        },
      ],
  },
]);

function App() {
  return (
      <ApolloProvider client={client}>
          <RouterProvider router={router} />
      </ApolloProvider>
  );
}

export default App;
