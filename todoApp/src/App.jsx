import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext'; // Adjust the import path as necessary
import { TaskProvider } from './context/TaskContext'; // Adjust the import path as necessary
import Login from './Components/Login'; // Ensure the casing matches the actual directory name
import AdminPanel from './Components/AdminPanel'; // Ensure the casing matches the actual directory name
import UserTaskView from './Components/UserTaskView'; // Ensure the casing matches the actual directory name
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <UserTaskView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
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
