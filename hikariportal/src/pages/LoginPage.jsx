import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ColorModeSelect from '../components/Login/ColorModeSelect';
import { login } from '../api/auth';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(240, 100.00%, 99.60%, 0.05) 0px 5px 15px 0px, hsl(0, 0.00%, 100.00%) 0px 15px 35px -5px',
  borderRadius: '16px', 
  color: theme.palette.text.primary,
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.1) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.1) 0px 15px 35px -5px',
    backgroundColor: 'hsla(220, 25%, 10%, 0.1)', 
  }),
}));

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at center, hsla(220, 25%, 10%, 0.1))'
    : '#f0f0f0', 
}));

export default function HomePage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setCredentials((prevCredentials) => ({ ...prevCredentials, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await login(credentials);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token); 
      if (rememberMe) {
        localStorage.setItem('username', credentials.username);
      } else {
        localStorage.removeItem('username');
      }
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Card>
        <Typography variant="h1" color="primary">
          Bienvenido
        </Typography>
        <Typography variant="body1">
          Por favor, inicia sesión para continuar.
        </Typography>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Recuérdame"
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Iniciar sesión
        </Button>
        <Divider />
        <Button variant="outlined" color="primary" fullWidth onClick={() => navigate('/sign-up')}>
          Registrarse
        </Button>
        <ColorModeSelect />
      </Card>
    </Container>
  );
}