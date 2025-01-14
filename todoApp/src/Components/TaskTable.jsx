import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  TablePagination,
  Checkbox,
  Tooltip, // Import Tooltip from @mui/material
  IconButton // Import IconButton from @mui/material
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'; // Import icons for edit and delete

function TaskTable({ tasks, handleUpdateTask, handleDeleteTask }) {
  const [editId, setEditId] = useState(null); // Use task's unique _id for edit tracking
  const [editTask, setEditTask] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEditClick = (id) => {
    setEditId(id); // Store the task's unique _id
    const taskToEdit = tasks.find((task) => task._id === id); // Find the task by its _id
    setEditTask(taskToEdit);
  };

  const handleSaveClick = () => {
    if (editId !== null) {
      handleUpdateTask(editId, editTask); // Pass the task _id and updated task
      setEditId(null); // Reset edit mode
      setEditTask({});
    }
  };

  const handleCheckboxChange = (taskId, checked) => {
    const updatedTask = tasks.find(task => task._id === taskId);
    if (updatedTask) {
      updatedTask.completed = checked;
      handleUpdateTask(taskId, updatedTask);
    }
  };

  const handleDeleteTaskClick = (taskId) => {
    handleDeleteTask(taskId); // Parent will handle task removal from state
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Task List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Completed</TableCell> {/* Add a column for completed checkmarks */}
              {handleUpdateTask && handleDeleteTask && <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
              <TableRow key={task._id} hover>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  {editId === task._id ? (
                    <TextField
                      value={editTask.title || ''}
                      onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    task.title
                  )}
                </TableCell>
                <TableCell>
                  {editId === task._id ? (
                    <TextField
                      value={editTask.category || ''}
                      onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    task.category
                  )}
                </TableCell>
                <TableCell>
                  {editId === task._id ? (
                    <TextField
                      value={editTask.description || ''}
                      onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                      variant="outlined"
                      size="small"
                      multiline
                      rows={2}
                    />
                  ) : (
                    task.description
                  )}
                </TableCell>
                <TableCell>
                  {editId === task._id ? (
                    <TextField
                      type="date"
                      value={editTask.date || ''}
                      onChange={(e) => setEditTask({ ...editTask, date: e.target.value })}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    task.date
                  )}
                </TableCell>
                <TableCell>
                  {editId === task._id ? (
                    <TextField
                      type="time"
                      value={editTask.time || ''}
                      onChange={(e) => setEditTask({ ...editTask, time: e.target.value })}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    task.time
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={task.completed || false}
                    onChange={(e) => handleCheckboxChange(task._id, e.target.checked)}
                    color="primary"
                  />
                </TableCell> {/* Add Checkbox to each row */}
                {handleUpdateTask && handleDeleteTask && (
                  <TableCell>
                    {editId === task._id ? (
                      <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(task._id)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteTaskClick(task._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default TaskTable;
