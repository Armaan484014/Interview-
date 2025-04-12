import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentForm from './pages/StudentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/form/:id' element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
