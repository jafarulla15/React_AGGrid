import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

import EmployeeList from "./pages/Employee/EmployeeList";
import EmployeeForm from "./pages/Employee/EmployeeForm";

import TopNav from "./components/TopNav/TopNav";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />

          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
