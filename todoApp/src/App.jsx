import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './Components/Login';
import AdminPanel from './Components/AdminPanel';
import UserTaskView from './Components/UserTaskView';
import ProtectedRoute from './Components/ProtectedRoute';

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
