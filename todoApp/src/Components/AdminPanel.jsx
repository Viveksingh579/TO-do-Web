import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import TaskTable from "./TaskTable";
import { addTask, getTasks, updateTask, deleteTask } from "../api"; // Import the functions

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTask({
      title: "",
      category: "",
      description: "",
      date: "",
      time: "",
    }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (newTask.title && newTask.category && newTask.description && newTask.date && newTask.time) {
      try {
        const addedTask = await addTask(newTask);
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        handleDialogClose();
      } catch (error) {
        alert("Error adding task!");
      }
    } else {
      alert("Please fill all fields!");
    }
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
  
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert("Error deleting task!");
    }
  };
  
  
  
  

  return (
    <div>
      <h2>Admin Panel</h2>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        Add Task
      </Button>
      <TaskTable
        tasks={tasks}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            value={newTask.title}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={newTask.category}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={2}
            value={newTask.description}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            name="date"
             placeholder="Enter Date"
            type="date"
            fullWidth
            value={newTask.date}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            name="time"
            placeholder="Enter time"
            type="time"
            fullWidth
            value={newTask.time}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
