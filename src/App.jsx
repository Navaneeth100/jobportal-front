import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PermissionDenied from "../PermissionDenied"
import ProtectedRoute from "../ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const token = localStorage.getItem("token");

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/permission-denied" element={<PermissionDenied />} />

        {/* Role-based protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer"
          element={
            <ProtectedRoute allowedRole="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant"
          element={
            <ProtectedRoute allowedRole="applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
