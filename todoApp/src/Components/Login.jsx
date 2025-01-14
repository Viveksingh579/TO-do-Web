import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
});

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAuthenticated = login(username, password);
    if (isAuthenticated) {
      if (username === 'admin') {
        navigate('/admin');
      } else {
        navigate('/tasks');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2, padding: 1.5 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
