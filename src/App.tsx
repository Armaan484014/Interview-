import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import FeedbackForm from "./student/FeedbackForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/form/:id" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
};

export default App;
