import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext'; // Adjust the import path as necessary
import { TaskProvider } from './context/TaskContext'; // Adjust the import path as necessary
import Login from './Components/Login'; // Ensure the casing matches the actual directory name
import AdminPanel from './Components/AdminPanel'; // Ensure the casing matches the actual directory name
import UserTaskView from './Components/UserTaskView';// Ensure the casing matches the actual directory name

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Navigate to="/tasks" />} />
          <Route path="/tasks" element={user?.role !== 'admin' ? <UserTaskView /> : <Navigate to="/admin" />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default function MainApp() {
  return (
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  );
}
