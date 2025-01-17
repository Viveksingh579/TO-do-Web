import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Container, AppBar, Toolbar } from '@mui/material'; // Import required components from @mui/material
import { useTasks } from '../context/TaskContext';
import TaskTable from './TaskTable';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { updateTask } from '../api';

const UserTaskView = () => {
  const { tasks } = useTasks();
  const { logout } = useAuth(); // Access the logout function
  const navigate = useNavigate(); // Initialize the navigate function
  const [_tasks, setTasks] = useState(tasks);
  useEffect(() => {
    console.log('Tasks:', tasks); // Debug log to check tasks state
  }, [tasks]);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate to login page after logout
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
      try {
        const updated = await updateTask(taskId, updatedTask);
        setTasks(tasks.map((task) => (task._id === taskId ? updated : task)));
      } catch (error) {
        console.error('Error updating task:', error);
        alert("Error updating task!");
      }
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
          <TaskTable tasks={_tasks} handleUpdateTask={handleUpdateTask} />
        </Container>
      </Box>
    </Box>
  );
};

export default UserTaskView;
