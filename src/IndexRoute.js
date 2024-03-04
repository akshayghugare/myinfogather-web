import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute"; // You'll create this component
import ViewUserInfo from "./pages/ViewUserInfo";
import MyProfilePage from "./pages/MyProfilePage";

function IndexRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userlist" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/adduser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        <Route path="/edituser/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
        <Route path="/viewuser/:id" element={<ProtectedRoute><ViewUserInfo /></ProtectedRoute>} />
        <Route path="/myprofile" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default IndexRoutes;
