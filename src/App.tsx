import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import CreateForm from './pages/CreateForm';
import ManageTemplates from './pages/ManageTemplates';
import StudentForm from './pages/StudentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/manage-templates" element={<ManageTemplates />} />
        <Route path="/form/:id" element={<StudentForm />} /> {/* Student feedback form route */}
      </Routes>
    </Router>
  );
}

export default App;

