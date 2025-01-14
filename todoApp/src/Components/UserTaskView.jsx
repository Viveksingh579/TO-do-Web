import React, { useEffect } from 'react';
import { Button, Box, Typography, Container, AppBar, Toolbar } from '@mui/material'; // Import required components from @mui/material
import { useTasks } from '../context/TaskContext';
import TaskTable from './TaskTable';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserTaskView = () => {
  const { tasks } = useTasks();
  const { logout } = useAuth(); // Access the logout function
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    console.log('Tasks:', tasks); // Debug log to check tasks state
  }, [tasks]);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Tasks
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            My Tasks
          </Typography>
          <TaskTable tasks={tasks} />
        </Container>
      </Box>
    </Box>
  );
};

export default UserTaskView;
