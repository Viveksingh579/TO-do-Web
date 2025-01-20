import React, { useEffect } from 'react';
import { Button, Box, Typography, Container, AppBar, Toolbar } from '@mui/material';
import { useTasks } from '../context/TaskContext';
import TaskTable from './TaskTable';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateTask as updateTaskAPI } from '../api';

const UserTaskView = () => {
  const { tasks, updateTask } = useTasks(); // Access tasks and updateTask from the context
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Tasks:', tasks); // Debug log to monitor tasks state
  }, [tasks]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const updated = await updateTaskAPI(taskId, updatedTask);
      updateTask(taskId, updated); // Use the context to update tasks
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task!');
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
          <TaskTable tasks={tasks} handleUpdateTask={handleUpdateTask} />
        </Container>
      </Box>
    </Box>
  );
};

export default UserTaskView;
