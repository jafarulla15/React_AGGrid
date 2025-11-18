import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import EmployeeList from "./pages/Employee/EmployeeList";
import EmployeeForm from "./pages/Employee/EmployeeForm";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/users", element: <UserList /> },
    { path: "/add", element: <UserForm /> },
    { path: "/edit/:id", element: <UserForm /> },
    { path: "/employees", element: <EmployeeList /> },
    { path: "/employees/add", element: <EmployeeForm /> },
    { path: "/employees/edit/:id", element: <EmployeeForm /> },
  ]);
  return routes;
};

export default AppRoutes;
