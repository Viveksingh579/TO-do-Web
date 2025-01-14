import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  AppBar,
  Toolbar,
  Paper,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TaskTable from './TaskTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function ToDoPage({ tasks, onAddTask, handleUpdateTask, handleDeleteTask }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        width="100%"
        sx={{ backgroundColor: '#f0f0f0' }}
      >
        <AppBar position="static" sx={{ width: '100%' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>To-Do</Typography>
          </Toolbar>
        </AppBar>
        <Box flex={1} display="flex" flexDirection="column" alignItems="center" width="100%">
          <Paper elevation={6} sx={{ padding: 2, borderRadius: 2, backgroundColor: '#f5f5f5', width: '100%', flex: 1 }}>
            <TextField
              fullWidth
              placeholder="Search Tasks"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onAddTask}>
                      <AddTaskIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Divider sx={{ my: 2 }} />
            <TaskTable
              tasks={filteredTasks}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
            />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ToDoPage;




