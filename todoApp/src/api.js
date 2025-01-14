import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });
  

// Function to add a new task
export const addTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Function to get all tasks
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

