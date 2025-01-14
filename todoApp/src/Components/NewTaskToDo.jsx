import React, { useState } from 'react';
import { Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography } from '@mui/material';

function NewTaskToDo({ onBack, addTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    const newTask = {
      title,
      category,
      description,
      date,
      time,
    };
    console.log('Submitting new task:', newTask); // Debugging line
    addTask(newTask);
    onBack();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        borderRadius: 2,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        New Task ToDo
      </Typography>
      <TextField
        fullWidth
        label="Title Task"
        variant="outlined"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Category</FormLabel>
        <RadioGroup
          row
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel value="personal" control={<Radio />} label="Personal" />
          <FormControlLabel value="teams" control={<Radio />} label="Teams" />
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        type="date"
        label="Date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        type="time"
        label="Time"
        InputLabelProps={{ shrink: true }}
        value={time}
        onChange={(e) => setTime(e.target.value)}
        margin="normal"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 2,
        }}
      >
        <Button variant="contained" color="error" onClick={onBack}>
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default NewTaskToDo;



