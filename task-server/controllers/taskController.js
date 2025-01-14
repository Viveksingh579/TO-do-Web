const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Sorted by newest first
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error. Unable to fetch tasks.' });
  }
};

// Add a new task
const addTask = async (req, res) => {
  const { title, category, description, date, time } = req.body;

  if (!title || !category || !description || !date || !time) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newTask = new Task({ title, category, description, date, time });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add task.' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, category, description, date, time } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Task ID format.' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, category, description, date, time },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task.' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Task ID format.' });
  }

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task.' });
  }
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };

