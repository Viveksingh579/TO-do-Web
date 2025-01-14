import React, { useState } from 'react';
import { CssBaseline, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import NewTaskToDo from './Components/NewTaskToDo';
import ToDoPage from './Components/ToDoPage';

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <CssBaseline />
      <ToDoPage
        tasks={tasks}
        onAddTask={handleOpenDialog}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>New Task ToDo</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <NewTaskToDo onBack={handleCloseDialog} addTask={addTask} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;


